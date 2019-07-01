import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }



  cargarHospitales( desde: number = 0 ) {

    let url =URL_SERVICIOS + '/hospital?desde=' + desde;
    
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalHospitales=resp.total;
          return resp.hospitales;
        });
  }


  obtenerHospital(	id:	string	) {
    let url =URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
        .map( (resp: any) => resp.hospital );
  }


  borrarHospital(	id:	string	) {
    
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    
    return this.http.delete( url )
        .map( resp => {
          swal('Hospital Borrado', 'Eliminado Correctamente', 'success');
        });
    
  }


  crearHospital(	nombre:	string	) {
    let url = URL_SERVICIOS + '/hospital'+'?token='+this._usuarioService.token;

    return this.http.post( url, {nombre})
        .map( (resp: any) => {
          resp.hospital
        });
  }


  buscarHospital(	termino:	string	) {
    let url = URL_SERVICIOS +'/busqueda/coleccion/hospitales/'+ termino;
    return this.http.get( url )
        .map( (resp:any) => resp.hospitales );
  }


  actualizarHospital(	hospital:	Hospital	) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
        .map( (resp: any) => {
          swal('Hospital Actualizado', hospital.nombre, 'success');
          return resp.hospital;
        });
  }
}


