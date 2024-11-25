import { Module } from '@nestjs/common';
import { PrincipalService } from './principal.service';
import { PrincipalController } from './principal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from '../entities/profesor.entity';
import { Propuesta } from '../entities/propuesta.entity';
import { Estudiante } from '../entities/estudiante.entity';
import { Proyecto } from '../entities/proyecto.entity';
@Module({
   imports: [
    TypeOrmModule.forFeature([Profesor, Propuesta, Estudiante, Proyecto]),
  ],
  controllers: [PrincipalController],
  providers: [PrincipalService],
})
export class PrincipalModule {}
