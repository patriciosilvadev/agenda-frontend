import { Parecer } from './parecer.model';
import { Usuario } from './usuario.model';
import { Atendimento } from './atendimento.model';

export class Cliente {
    constructor(
        public id : number, 
        public nome : string, 
        public telefone : string, 
        public endereco : string, 
        public descricao : string,
        public dataNascimento : Date, 
        public pareceres : Array<Parecer>,
        public usuario : Usuario,
        public atendimentos : Array<Atendimento>,
        public status : number){

    }
}