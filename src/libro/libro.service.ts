import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
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

  async create(dto: CreateLibroDto) {
    if (new Date(dto.fechaPublicacion) > new Date()) {
      throw new BadRequestException('Fecha de publicación no puede ser futura');
    }
    return this.libroRepo.save(dto);
  }

  async update(id: number, dto: UpdateLibroDto) {
    const existente = await this.libroRepo.findOneBy({ id });
    if (!existente) throw new NotFoundException('No encontrado');
    if (new Date(dto.fechaPublicacion) > new Date()) {
      throw new BadRequestException('Fecha de publicación no puede ser futura');
    }
    return this.libroRepo.save({ ...existente, ...dto });
  }

  async delete(id: number): Promise<void> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    await this.libroRepo.remove(libro);
  }
}
