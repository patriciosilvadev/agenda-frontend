import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente.model';
import { UsuarioService } from '../service/usuario.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../model/usuario.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
  providers:[ClienteService, UsuarioService]
})
export class CadastrarClienteComponent implements OnInit {
  public jwtHelperService : JwtHelperService = new JwtHelperService();
  public usuario : Usuario;
  public error : any;
  public response : HttpResponse<any>;
  private monthVariableToJava : number = -1;
public form : FormGroup = new FormGroup({
  'nome' : new FormControl(null,[Validators.required]),
  'nascimento' : new FormControl(null,[Validators.required, Validators.minLength(8)]),
  'telefone' : new FormControl(null,[Validators.required]),
  'endereco' : new FormControl(null,[Validators.required]),
})
  constructor(private router : Router, private clienteService : ClienteService, private usuarioService : UsuarioService) { }

  ngOnInit() {
    if(localStorage.getItem('user')== null){
      this.router.navigate(['/login'])
    }else
    if(localStorage.getItem('user')!= null){
      if(this.jwtHelperService.isTokenExpired(localStorage.getItem('user').substr(7))){
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
      }
      else{
       let email = this.jwtHelperService.decodeToken(localStorage.getItem('user').substr(7)).sub
        this.usuarioService.getUsuarioByEmail(email).subscribe((response:any)=>{
          this.usuario = response;
     
        })
      }
   
  }
}
  cadastrarCliente(){
    this.response = undefined;
    this.error=undefined;
    this.form.get('nome').markAsTouched();
    this.form.get('nascimento').markAsTouched();
    this.form.get('telefone').markAsTouched();
    this.form.get('endereco').markAsTouched();
    if(this.form.valid){
      let usuario : Usuario = new Usuario (this.usuario.id,null,null,null,null,null)
      let data_string : string
      let data_nascimento : Date = new Date() 
      data_string = this.form.get('nascimento').value
      data_nascimento.setFullYear(+data_string.substr(4,4), +data_string.substr(2,2)+this.monthVariableToJava,+data_string.substr(0,2));
      let cliente : Cliente = new Cliente(
        null,
        this.form.get('nome').value,
        this.form.get('telefone').value,
        this.form.get('endereco').value,
        null,
        data_nascimento,
        null,
        usuario,
        null,
        0)
        this.clienteService.findClienteByNome(this.form.get('nome').value, this.usuario.id).subscribe((response:any)=>{
          if(response.nome != null){
            this.form.get('nome').markAsPending();
          }else{
            this.clienteService.cadastrarCliente(cliente).subscribe((response:any)=>{
              this.response=response;
            },(error:any)=>{
              this.error=error;
            })
          }
        })
        
      }
  }
      
  }