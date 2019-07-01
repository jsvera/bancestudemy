import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
        .subscribe( (resp : any) => {
          console.log( resp );
          this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;
          this.cargando = false;
        });
  }

  buscarHospital( termino: string ){

    //console.log ( termino );

    if ( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }
    
    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
        .subscribe ( (hospitales: Hospital[]) => {
          //console.log( usuarios );
          
          this.hospitales = hospitales;
          this.cargando = false;

        });

  }

  borrarHospital( hospital: Hospital ) {
    this._hospitalService.borrarHospital( hospital._id )
        .subscribe(() => this.cargarHospitales() );
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }
  
  
  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true

    }).then( (valor: string) => {
      if (!valor || (valor.length ===0) ) {
        return;
      }
      this._hospitalService.crearHospital(valor)
          .subscribe( () => this.cargarHospitales());
    })
  }

  actualizarImagen( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }

}
