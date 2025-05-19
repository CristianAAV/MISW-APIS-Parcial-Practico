import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Biblioteca } from './biblioteca.entity';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
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

  async create(dto: CreateBibliotecaDto) {
    if (dto.horaApertura >= dto.horaCierre) {
      throw new BadRequestException('Hora de apertura debe ser menor que la de cierre');
    }
    return this.bibliotecaRepo.save(dto);
  }

  async update(id: number, dto: UpdateBibliotecaDto) {
    const existente = await this.bibliotecaRepo.findOneBy({ id });
    if (!existente) throw new NotFoundException('No encontrada');
    if (dto.horaApertura >= dto.horaCierre) {
      throw new BadRequestException('Hora de apertura debe ser menor que la de cierre');
    }
    return this.bibliotecaRepo.save({ ...existente, ...dto });
  }

  async delete(id: number): Promise<void> {
    const biblioteca = await this.bibliotecaRepo.findOneBy({ id });
    if (!biblioteca) throw new NotFoundException(`Biblioteca con id ${id} no encontrada`);
    await this.bibliotecaRepo.remove(biblioteca);
  }
}
