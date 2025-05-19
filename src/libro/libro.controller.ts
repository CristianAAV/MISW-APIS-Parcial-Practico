import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('books')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  findAll() {
    return this.libroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.libroService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLibroDto) {
    return this.libroService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateLibroDto) {
    return this.libroService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) 
  delete(@Param('id') id: number) {
    return this.libroService.delete(id);
  }
}
