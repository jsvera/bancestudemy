import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {
    //let url =URL_SERVICIOS + '/medico';
    let url =URL_SERVICIOS + '/medico?desde=' + desde;
    
    return this.http.get( url )
        .map ((resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        });
  }
  
  cargarMedico ( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get ( url )
      .map( (resp: any) => resp.medico );
  }

  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS +'/busqueda/coleccion/medicos/'+ termino;
    return this.http.get( url )
        .map( (resp:any) => resp.medicos );
  }


  borrarMedico( id: string) {
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' +this._usuarioService.token;

    return this.http.delete( url )
        .map( resp => {

          swal('Médico Borrado','El médico ha sido eliminado correctamente', 'success');
          return resp;
        
        });
  }

  guardarMedico( medico: Medico ) {
    
    let url = URL_SERVICIOS + '/medico';
    
    if ( medico._id ) {//actualiza
      
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
          .map( (resp: any) => {
            swal('Médico Actualizado', 'El médico: '+ medico.nombre + ' se actualizo correctamente', 'success');
            return resp.medico;
          });

    } else {//crea nuevo
      
      url+= '?token=' + this._usuarioService.token;
      return this.http.post( url, medico )
          .map( (resp: any) => {
            swal('Médico Creado', 'El médico: '+ medico.nombre + ' se guardo correctamente', 'success');
            return resp.medico;
          });

    }


  }

}
