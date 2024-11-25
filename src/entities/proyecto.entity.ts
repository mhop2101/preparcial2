import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @OneToOne(() => Propuesta, (propuesta) => propuesta.proyecto)
  propuesta: Propuesta;
}
