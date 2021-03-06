import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxMaskModule, IConfig} from 'ngx-mask'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastrarParecerComponent } from './cadastrar-parecer/cadastrar-parecer.component';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ParecerClienteComponent } from './parecer-cliente/parecer-cliente.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/error-interceptor';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';
import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    LoginComponent,
    HomeComponent,
    CadastrarParecerComponent,
    CadastrarClienteComponent,
    ClienteComponent,
    ParecerClienteComponent,
    CadastrarUsuarioComponent,
    EsqueciSenhaComponent,
    UpdateUsuarioComponent,
    CadastrarAtendimentoComponent,
    AtendimentoComponent,
    ListarClientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
