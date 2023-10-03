import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Produto } from './models/Produtos';
import { BaseFormComponent } from '../base-form.component';
import { ProdutosService } from './produtos.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-produtos-edit',
  templateUrl: './produtos-edit.component.html',
  styleUrls: ['./produtos-edit.component.scss']
})
export class ProdutosEditComponent
  extends BaseFormComponent implements OnInit {
    

isCadastro() {
  if (this.id){
    return false;
  }
  return true;
}

  title?: string;
  produtos?: Produto;
  id?: number;

  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutosService) {
    super();
  }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      nome: new UntypedFormControl('', Validators.required),
      dataInclusao: new UntypedFormControl('', Validators.required),
      usuarioInclusao: new UntypedFormControl('', Validators.required)
    }, null);

    this.loadData();
}

  loadData() {
    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      // EDIT MODE
      this.produtoService.get(this.id).subscribe(result => {
        this.produtos = result;
        this.title = "Editar o Produto - " + this.produtos.nome;
        // update the form with the city value
        this.form.patchValue(this.produtos);

      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Criar um novo Produto";
    }
  }

  onSubmit() {
    setTimeout(() => {
      this.spinner.show();
      // Resto do código do onSubmit()
    }, 0);    
    var produto = (this.id) ? this.produtos : <Produto>{};
    if (produto) {
      produto.nome = this.form.controls['nome'].value;
      produto.dataInclusao = this.form.controls['dataInclusao'].value;
      produto.usuarioInclusao = this.form.controls['usuarioInclusao'].value;

      if (this.id) {
        this.produtoService
          .put(produto)
          .subscribe(result => {
            console.log("Produto " + produto!.id + " Atualizado com Sucesso.");
            this.spinner.hide();
            this.router.navigate(['/produtos']);
          }, error => console.error(error));
      }
      else {
        this.produtoService
          .post(produto)
          .subscribe(result => {
            console.log("Produto " + result.id + " foi criado com sucesso.");
            this.spinner.hide();
            this.router.navigate(['/produtos']);
          }, error => console.error(error));
      }
      this.spinner.hide(); // Oculta o indicador de carregamento
    }

  }

  onDelete(){
    var produto = (this.id) ? this.produtos : <Produto>{};
    if (this.id) {
      this.produtoService
        .delete(this.id)
        .subscribe(result => {
          console.log("Produto " + produto!.id + " Excluido com Sucesso.");
          this.router.navigate(['/produtos']);
        }, error => console.error(error));
    }
  }

}
