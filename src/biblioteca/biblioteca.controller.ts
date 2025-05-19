import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { Biblioteca } from './biblioteca.entity';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';

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
  create(@Body() dto: CreateBibliotecaDto) {
    return this.bibliotecaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBibliotecaDto) {
    return this.bibliotecaService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) 
  delete(@Param('id') id: number) {
    return this.bibliotecaService.delete(id);
  }
}
