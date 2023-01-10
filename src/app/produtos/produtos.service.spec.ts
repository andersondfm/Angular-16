/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProdutosService } from './produtos.service';

describe('Service: Produtos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdutosService]
    });
  });

  it('should ...', inject([ProdutosService], (service: ProdutosService) => {
    expect(service).toBeTruthy();
  }));
});
