import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { Biblioteca } from './biblioteca.entity';

@Controller('libraries')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bibliotecaService.findOne(id);
  }

  @Post()
  create(@Body() biblioteca: Biblioteca) {
    return this.bibliotecaService.create(biblioteca);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() biblioteca: Biblioteca) {
    return this.bibliotecaService.update(id, biblioteca);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bibliotecaService.delete(id);
  }
}
