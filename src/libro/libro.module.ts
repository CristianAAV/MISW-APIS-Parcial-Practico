import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Libro } from './libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}
