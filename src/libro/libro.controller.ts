import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';

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
  create(@Body() libro: Libro) {
    return this.libroService.create(libro);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() libro: Libro) {
    return this.libroService.update(id, libro);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.libroService.delete(id);
  }
}
