import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Biblioteca } from './biblioteca.entity';

@Injectable()
export class BibliotecaService {
  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepo: Repository<Biblioteca>,
  ) {}

  async findAll(): Promise<Biblioteca[]> {
    return this.bibliotecaRepo.find({ relations: ['libros'] });
  }

  async findOne(id: number): Promise<Biblioteca> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException(`Biblioteca con id ${id} no encontrada`);
    return biblioteca;
  }

  async create(biblioteca: Biblioteca): Promise<Biblioteca> {
    if (biblioteca.horaApertura >= biblioteca.horaCierre) {
      throw new BadRequestException('La hora de apertura debe ser menor que la hora de cierre');
    }
    return this.bibliotecaRepo.save(biblioteca);
  }

  async update(id: number, biblioteca: Biblioteca): Promise<Biblioteca> {
    const existente = await this.bibliotecaRepo.findOneBy({ id });
    if (!existente) throw new NotFoundException(`Biblioteca con id ${id} no encontrada`);
    if (biblioteca.horaApertura >= biblioteca.horaCierre) {
      throw new BadRequestException('La hora de apertura debe ser menor que la hora de cierre');
    }
    return this.bibliotecaRepo.save({ ...existente, ...biblioteca });
  }

  async delete(id: number): Promise<void> {
    const biblioteca = await this.bibliotecaRepo.findOneBy({ id });
    if (!biblioteca) throw new NotFoundException(`Biblioteca con id ${id} no encontrada`);
    await this.bibliotecaRepo.remove(biblioteca);
  }
}
