import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { BibliotecaLibroModule } from './biblioteca-libro/biblioteca-libro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'biblioteca_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BibliotecaModule,
    LibroModule,
    BibliotecaLibroModule,
  ],
})
export class AppModule {}
