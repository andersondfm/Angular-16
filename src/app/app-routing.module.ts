import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import {ProdutosEditComponent } from './produtos/produtos-edit.component';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent},
  { path: 'produto', component: ProdutosEditComponent},
  { path: 'produto/:id', component: ProdutosEditComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
