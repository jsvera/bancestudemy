import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( 
    public http: HttpClient,
    public router: Router,
    public _subirArhivoService: SubirArchivoService 
  ) {
    this.cargarStorage();
  }
  
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    //grabar en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  loginGoogle( token: string )  {
      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token } )
          .map( (resp: any) => {

            this.guardarStorage( resp.id, resp.token, resp.usuario);
            return true;

          });
  }


  login( usuario: Usuario, recordar: boolean=false ){

      if( recordar ) {
        localStorage.setItem('user', usuario.usuario);
      } else {
        localStorage.removeItem('user');
      }

      let url = URL_SERVICIOS + '/login';
      return this.http.post( url, usuario )
          .map( (resp: any) => {

            //grabar en el localStorage
            this.guardarStorage( resp.id, resp.token, resp.usuario);

              return true;
          });
  }


  // crearUsuario(usuario: Usuario) {

  //   let url = URL_SERVICIOS + '/usuario';

  //   return this.http.post( url, usuario).map ( (resp: any) => {
  //           swal('Usuario creado', usuario.email, 'succes');
  //           return resp.usuario;
  //       });
  // }
  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              });
  }

  actualizarUsuario ( usuario: Usuario ) {
    let url = URL_SERVICIOS + "/usuario/" +usuario._id + '?token='+this.token;
    
    //console.log(url);

    return this.http.put( url, usuario )
        .map( (resp : any) => {
          
          this.guardarStorage(resp.usuario._id, this.token, usuario ); 
          swal('Usuario actuaizado', usuario.nombres + ' ' + usuario.apellidos, 'success');
          
          return true;
        });
  }

  cambiarImagen( file: File, id: string ) {

    this._subirArhivoService.subirArchivo( file, 'usuarios', id )
        .then( (resp:any) => {
          //console.log( resp );
          this.usuario.img=resp.usuario.img;
          swal( 'Imagen Actualizada ', this.usuario.nombres, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch( resp => {
          console.log( resp );
        });
  }
  
  

}
