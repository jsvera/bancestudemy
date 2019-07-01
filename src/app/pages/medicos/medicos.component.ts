import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;
  desde: number = 0;

  constructor(
    public _serviceMedicos: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  

  cargarMedicos() {
    this._serviceMedicos.cargarMedicos(this.desde )
        .subscribe( (medicos: any) => {
          this.medicos = medicos;
          this.cargando = false;
        });
  } 

  buscarMedico( termino: string ){
    
    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._serviceMedicos.buscarMedicos( termino)
        .subscribe( medicos => {
          this.medicos = medicos;
          this.cargando = false;
        });
  }


  borrarMedico( medico: Medico ) {
    
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a '+ medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      
      if( borrar ) {
        this._serviceMedicos.borrarMedico(medico._id )
            .subscribe( borrado => {
                console.log( borrado );
                this.cargarMedicos();
            });
      }
    });

  }


  cambiarDesde( valor: number ){
    let desde = this.desde + valor;
    console.log(this.desde);

    if( (desde >= this._serviceMedicos.totalMedicos) || (desde<0) ){
      return;
    }
    
    this.desde += valor;
    this.cargarMedicos();

  }


}
