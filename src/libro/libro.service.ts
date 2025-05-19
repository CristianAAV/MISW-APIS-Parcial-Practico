import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async findAll(): Promise<Libro[]> {
    return this.libroRepo.find({ relations: ['bibliotecas'] });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepo.findOne({ where: { id }, relations: ['bibliotecas'] });
    if (!libro) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    return libro;
  }

  async create(libro: Libro): Promise<Libro> {
    if (new Date(libro.fechaPublicacion) > new Date()) {
      throw new BadRequestException('La fecha de publicación no puede ser futura');
    }
    return this.libroRepo.save(libro);
  }

  async update(id: number, libro: Libro): Promise<Libro> {
    const existente = await this.libroRepo.findOneBy({ id });
    if (!existente) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    if (new Date(libro.fechaPublicacion) > new Date()) {
      throw new BadRequestException('La fecha de publicación no puede ser futura');
    }
    return this.libroRepo.save({ ...existente, ...libro });
  }

  async delete(id: number): Promise<void> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    await this.libroRepo.remove(libro);
  }
}
