import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Biblioteca } from '../biblioteca/biblioteca.entity';
import { Libro } from '../libro/libro.entity';

@Injectable()
export class BibliotecaLibroService {
  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepo: Repository<Biblioteca>,
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async addBookToLibrary(libraryId: number, bookId: number) {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: libraryId }, relations: ['libros'] });
    const libro = await this.libroRepo.findOneBy({ id: bookId });

    if (!biblioteca || !libro) throw new NotFoundException('Biblioteca o libro no encontrado');

    biblioteca.libros.push(libro);
    return this.bibliotecaRepo.save(biblioteca);
  }

  async findBooksFromLibrary(libraryId: number) {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: libraryId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException('Biblioteca no encontrada');
    return biblioteca.libros;
  }

  async findBookFromLibrary(libraryId: number, bookId: number) {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: libraryId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException('Biblioteca no encontrada');

    const libro = biblioteca.libros.find(l => l.id === bookId);
    if (!libro) throw new NotFoundException('Libro no asociado a esta biblioteca');

    return libro;
  }

  async updateBooksFromLibrary(libraryId: number, bookIds: number[]) {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: libraryId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException('Biblioteca no encontrada');

    const libros = await this.libroRepo.findByIds(bookIds);
    biblioteca.libros = libros;
    return this.bibliotecaRepo.save(biblioteca);
  }

  async deleteBookFromLibrary(libraryId: number, bookId: number) {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: libraryId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException('Biblioteca no encontrada');

    biblioteca.libros = biblioteca.libros.filter(libro => libro.id !== bookId);
    return this.bibliotecaRepo.save(biblioteca);
  }
}
