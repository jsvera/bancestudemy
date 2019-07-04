import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';


import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor( 
    public http: HttpClient,
    public router: Router,
    public _subirArhivoService: SubirArchivoService 
  ) {
    this.cargarStorage();
  }
  

  renuevaToken() {
    
    let url = URL_SERVICIOS +'/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
        .map( (resp: any) => {
            
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('token renovado');

          return true;
        })
        .catch( err => {
          this.router.navigate(['/login']);
          swal('No se pudo renovar el token', 'No fue posible renovar el token', 'error');
          return throwError( err );
        });
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

    //grabar en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  loginGoogle( token: string )  {
      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token } )
          .map( (resp: any) => {

            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
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
            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
            //console.log( resp );
              return true;
          })
          .catch( err => {
            //console.log(err.error.mensaje);
            swal('Error al Iniciar Sesión', err.error.mensaje, 'error');
            return throwError( err );
            
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
              })
              .catch( err => {
                //console.log(err.error.mensaje);
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError( err );
              });
  }

  actualizarUsuario ( usuario: Usuario ) {
    let url = URL_SERVICIOS + "/usuario/" +usuario._id + '?token='+this.token;
    
    //console.log(url);

    return this.http.put( url, usuario )
        .map( (resp : any) => {
          
          if( usuario._id === this.usuario._id) {
            let usuarioDB: Usuario = resp.usuario;
            this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu); 
          }

          swal('Usuario actuaizado', usuario.nombres + ' ' + usuario.apellidos, 'success');

          return true;
        })
        .catch( err => {
          //console.log(err.error.mensaje);
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError( err );
        });
  }

  cambiarImagen( file: File, id: string ) {

    this._subirArhivoService.subirArchivo( file, 'usuarios', id )
        .then( (resp:any) => {
          //console.log( resp );
          this.usuario.img=resp.usuario.img;
          swal( 'Imagen Actualizada ', this.usuario.nombres, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch( resp => {
          console.log( resp );
        });
  }
  
  cargarUsuarios( desde: number = 0 ) {
  
    let url =URL_SERVICIOS + '/usuario?desde=' + desde;
    
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS +'/busqueda/coleccion/usuarios/'+ termino;
    return this.http.get( url )
        .map( (resp:any) => resp.usuarios );
  }

  borrarUsuario( id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' +this.token;

    return this.http.delete( url )
        .map( resp => {
          swal('Usuario borrado','El usuario ha sido eliminado correctamente', 'success');
          return true;
        });
  }
  

}
