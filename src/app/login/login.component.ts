import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.user = localStorage.getItem('user') || '';
    if( this.user.length > 1 ){
      this.recuerdame = true;
    }
  }

  googleInit(){//inicializacion del plugin
      gapi.load('auth2', () => {
          
        this.auth2 = gapi.auth2.init({
            client_id: '802431868994-6kc0j7jfhr63ut8omqf8hhe0cumtadef.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
        });

        this.attachSignin( document.getElementById('btnGoogle'));
      
      });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard' );

    });
  }

  ingresar( forma: NgForm) {

    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario(null, null, null, null, forma.value.usuario, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( correcto => this.router.navigate(['/dashboard']));

    //console.log(forma.valid);
    //console.log(forma.value);
    //this.router.navigate([ '/dashboard' ]);
  }

}
