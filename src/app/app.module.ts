import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosEditComponent } from './produtos/produtos-edit.component';
import { ProdutosService } from './produtos/produtos.service';

import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './auth/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutosEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    OverlayModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProdutosService, 
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
