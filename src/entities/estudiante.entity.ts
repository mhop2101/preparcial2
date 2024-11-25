import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  codigoEstudiante: string;

  @Column({ type: 'int' })
  creditosAprobados: number;

  @OneToOne(() => Proyecto, { cascade: true })
  @JoinColumn()
  proyecto: Proyecto;
}
