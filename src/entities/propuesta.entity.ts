import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Profesor } from './profesor.entity';
import { Proyecto } from './proyecto.entity';

@Entity()
export class Propuesta {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 50 })
  palabraClave: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.propuestas, { nullable: false })
  profesor: Profesor;

  @OneToOne(() => Proyecto, (proyecto) => proyecto.propuesta, { nullable: true, cascade: true })
  @JoinColumn()
  proyecto: Proyecto;
}
