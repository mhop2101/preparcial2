import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from '../entities/profesor.entity';
import { Propuesta } from '../entities/propuesta.entity';
import { Estudiante } from '../entities/estudiante.entity';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class PrincipalService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  // -------------------------------- Profesor --------------------------------
  async crearProfesor(profesorData: Partial<Profesor>): Promise<Profesor> {
    const { grupoInvestigacion } = profesorData;
    if (!['TICSW', 'IMAGINE', 'COMIT'].includes(grupoInvestigacion)) {
      throw new BadRequestException(
        'El grupo de investigación debe ser uno de los siguientes: TICSW, IMAGINE, COMIT',
      );
    }
    return this.profesorRepository.save(profesorData);
  }

  async findProfesorById(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id }, relations: ['propuestas'] });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  async eliminarProfesor(idOrCedula: number, isCedula = false): Promise<void> {
    const profesor = await this.profesorRepository.findOne({
      where: isCedula ? { cedula: idOrCedula } : { id: idOrCedula },
      relations: ['propuestas'],
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor no encontrado`);
    }

    const hasProyecto = await this.propuestaRepository
      .createQueryBuilder('propuesta')
      .leftJoinAndSelect('propuesta.proyecto', 'proyecto')
      .where('propuesta.profesorId = :profesorId', { profesorId: profesor.id })
      .andWhere('propuesta.proyecto IS NOT NULL')
      .getCount();

    if (hasProyecto > 0) {
      throw new BadRequestException(
        'No se puede eliminar un profesor que tiene propuestas con proyectos asociados',
      );
    }

    await this.profesorRepository.remove(profesor);
  }

  // -------------------------------- Propuesta --------------------------------
  async crearPropuesta(propuestaData: Partial<Propuesta>): Promise<Propuesta> {
    if (!propuestaData.titulo || propuestaData.titulo.trim() === '') {
      throw new BadRequestException('El título de la propuesta no puede estar vacío');
    }
    return this.propuestaRepository.save(propuestaData);
  }

  async findPropuestaById(id: number): Promise<Propuesta> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }
    return propuesta;
  }

  async findAllPropuesta(): Promise<Propuesta[]> {
    return this.propuestaRepository.find();
  }

  async findAllPropuestasWithRelations(): Promise<Propuesta[]> {
    return this.propuestaRepository.find({
      relations: ['profesor', 'proyecto'], // Load the related entities
    });
  }

  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id }, relations: ['proyecto'] });

    if (!propuesta) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }

    if (propuesta.proyecto) {
      throw new BadRequestException('No se puede eliminar una propuesta que tiene un proyecto asociado');
    }

    await this.propuestaRepository.remove(propuesta);
  }

  // -------------------------------- Estudiante --------------------------------
  async crearEstudiante(estudianteData: Partial<Estudiante>): Promise<Estudiante> {
    if (!estudianteData.codigoEstudiante || estudianteData.codigoEstudiante.length !== 10) {
      throw new BadRequestException('El código de estudiante debe tener exactamente 10 caracteres');
    }
    return this.estudianteRepository.save(estudianteData);
  }

  async findEstudianteById(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  // -------------------------------- Proyecto --------------------------------
  async crearProyecto(proyectoData: Partial<Proyecto>): Promise<Proyecto> {
    const { fechaInicio, fechaFin } = proyectoData;
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }
    return this.proyectoRepository.save(proyectoData);
  }
}
