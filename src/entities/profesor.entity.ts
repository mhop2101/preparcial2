import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  cedula: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  grupoInvestigacion: string;

  @Column({ type: 'int' })
  numeroExtension: number;

  @OneToMany(() => Propuesta, (propuesta) => propuesta.profesor)
  propuestas: Propuesta[];
}
