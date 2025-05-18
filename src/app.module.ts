import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { BibliotecaLibroModule } from './biblioteca-libro/biblioteca-libro.module';

@Module({
  imports: [BibliotecaModule, LibroModule, BibliotecaLibroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
