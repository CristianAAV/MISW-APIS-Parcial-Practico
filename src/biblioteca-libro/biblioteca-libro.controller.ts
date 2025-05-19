import { Controller, Param, Post, Get, Delete, Put, Body, HttpCode } from '@nestjs/common';
import { BibliotecaLibroService } from './biblioteca-libro.service';

@Controller('libraries/:libraryId/books')
export class BibliotecaLibroController {
  constructor(private readonly service: BibliotecaLibroService) {}

  @Post(':bookId')
  addBookToLibrary(
    @Param('libraryId') libraryId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.service.addBookToLibrary(libraryId, bookId);
  }

  @Get()
  findBooksFromLibrary(@Param('libraryId') libraryId: number) {
    return this.service.findBooksFromLibrary(libraryId);
  }

  @Get(':bookId')
  findBookFromLibrary(
    @Param('libraryId') libraryId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.service.findBookFromLibrary(libraryId, bookId);
  }

  @Put()
  updateBooksFromLibrary(
    @Param('libraryId') libraryId: number,
    @Body() bookIds: number[],
  ) {
    return this.service.updateBooksFromLibrary(libraryId, bookIds);
  }

  @Delete(':bookId')
  @HttpCode(204) 
  deleteBookFromLibrary(
    @Param('libraryId') libraryId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.service.deleteBookFromLibrary(libraryId, bookId);
  }
}
