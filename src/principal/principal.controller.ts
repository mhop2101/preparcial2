import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PrincipalService } from './principal.service';
import { Profesor } from '../entities/profesor.entity';
import { Propuesta } from '../entities/propuesta.entity';
import { Estudiante } from '../entities/estudiante.entity';
import { Proyecto } from '../entities/proyecto.entity';

@Controller('principal')
export class PrincipalController {
  constructor(private readonly appService: PrincipalService) {}

  // -------------------------- Profesor Endpoints --------------------------
  @Post('profesores')
  async crearProfesor(@Body() profesorData: Partial<Profesor>) {
    return this.appService.crearProfesor(profesorData);
  }

  @Get('profesores/:id')
  async findProfesorById(@Param('id') id: number) {
    return this.appService.findProfesorById(id);
  }

  @Delete('profesores/:id')
  async eliminarProfesorById(@Param('id') id: number) {
    return this.appService.eliminarProfesor(id, false);
  }

  @Delete('profesores/cedula/:cedula')
  async eliminarProfesorByCedula(@Param('cedula') cedula: number) {
    return this.appService.eliminarProfesor(cedula, true);
  }

  // -------------------------- Propuesta Endpoints --------------------------
  @Post('propuestas')
  async crearPropuesta(@Body() propuestaData: Partial<Propuesta>) {
    return this.appService.crearPropuesta(propuestaData);
  }

  @Get('propuestas/:id')
  async findPropuestaById(@Param('id') id: number) {
    return this.appService.findPropuestaById(id);
  }

  @Get('propuestas')
  async findAllPropuestasWithRelations() {
    return this.appService.findAllPropuestasWithRelations();
  }

  @Delete('propuestas/:id')
  async deletePropuesta(@Param('id') id: number) {
    return this.appService.deletePropuesta(id);
  }

  // -------------------------- Estudiante Endpoints --------------------------
  @Post('estudiantes')
  async crearEstudiante(@Body() estudianteData: Partial<Estudiante>) {
    return this.appService.crearEstudiante(estudianteData);
  }

  @Get('estudiantes/:id')
  async findEstudianteById(@Param('id') id: number) {
    return this.appService.findEstudianteById(id);
  }

  // -------------------------- Proyecto Endpoints --------------------------
  @Post('proyectos')
  async crearProyecto(@Body() proyectoData: Partial<Proyecto>) {
    return this.appService.crearProyecto(proyectoData);
  }
}
