import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaLibroController } from './biblioteca-libro.controller';

describe('BibliotecaLibroController', () => {
  let controller: BibliotecaLibroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecaLibroController],
    }).compile();

    controller = module.get<BibliotecaLibroController>(BibliotecaLibroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
