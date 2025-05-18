import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';

@Module({
  providers: [BibliotecaService],
  controllers: [BibliotecaController]
})
export class BibliotecaModule {}
