import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosEditComponent } from './produtos/produtos-edit.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
  { path: 'produto', component: ProdutosEditComponent, canActivate: [AuthGuard] },
  { path: 'produto/:id', component: ProdutosEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
