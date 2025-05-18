import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './biblioteca.entity';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca])],
  providers: [BibliotecaService],
  controllers: [BibliotecaController],
})
export class BibliotecaModule {}
