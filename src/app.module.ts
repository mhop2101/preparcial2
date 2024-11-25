import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profesor } from './entities/profesor.entity';
import { Propuesta } from './entities/propuesta.entity';
import { Estudiante } from './entities/estudiante.entity';
import { Proyecto } from './entities/proyecto.entity';
import { PrincipalModule } from './principal/principal.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: '34.66.204.134',
        port: 5432,
        username: 'tecweb',
        password: 'tecwebtecweb',
        database: 'preparcial2',
        entities: [Estudiante, Proyecto, Profesor, Propuesta],
        synchronize: true,
        droopSchema: true,
        keepConnectionAlive: true,
      }),
    }),
    TypeOrmModule.forFeature([Estudiante, Proyecto, Profesor, Propuesta]),
    PrincipalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
