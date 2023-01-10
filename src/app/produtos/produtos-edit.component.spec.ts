import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosEditComponent } from './produtos-edit.component';

describe('ProdutosEditComponent', () => {
  let component: ProdutosEditComponent;
  let fixture: ComponentFixture<ProdutosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
