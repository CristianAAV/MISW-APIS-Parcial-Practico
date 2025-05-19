import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Biblioteca } from '../biblioteca/biblioteca.entity';
import { Libro } from '../libro/libro.entity';@Injectable()
export class BibliotecaLibroService {
  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepo: Repository<Biblioteca>,
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async addBookToLibrary(libraryId: number, bookId: number) {
    const biblioteca = await this.bibliotecaRepo.findOne({
      where: { id: libraryId },
      relations: ['libros'],
    });
    const libro = await this.libroRepo.findOneBy({ id: bookId });

    if (!biblioteca || !libro) {
      throw new NotFoundException('Biblioteca o libro no encontrado');
    }

    // Evitar duplicados
    const yaAsociado = biblioteca.libros.some(l => l.id === libro.id);
    if (!yaAsociado) {
      const librosActualizados = [...biblioteca.libros, libro];
      await this.bibliotecaRepo.save({ ...biblioteca, libros: librosActualizados });
    }

    return await this.bibliotecaRepo.findOne({
      where: { id: libraryId },
      relations: ['libros'],
    });
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

    const libros = await this.libroRepo.findBy({ id: In(bookIds) });

    const librosFaltantes = bookIds.filter(id => !libros.some(l => l.id === id));
    if (librosFaltantes.length > 0) {
      throw new NotFoundException(`Libros no encontrados: ${librosFaltantes.join(', ')}`);
    }

    biblioteca.libros = libros;
    return this.bibliotecaRepo.save(biblioteca);
  }


  async deleteBookFromLibrary(libraryId: number, bookId: number) {
    const libIdNum = Number(libraryId);
    const bookIdNum = Number(bookId);
    
    const biblioteca = await this.bibliotecaRepo.findOne({ 
      where: { id: libIdNum }, 
      relations: ['libros'] 
    });
    
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca con ID ${libIdNum} no encontrada`);
    }

    const libroAsociado = biblioteca.libros.find(libro => libro.id === bookIdNum);
    
    if (!libroAsociado) {
      throw new NotFoundException(`El libro con ID ${bookIdNum} no está asociado a esta biblioteca`);
    }

    const librosActualizados = biblioteca.libros.filter(libro => libro.id !== bookIdNum);
    
    await this.bibliotecaRepo.save({ 
      ...biblioteca, 
      libros: librosActualizados 
    });
  }

}
