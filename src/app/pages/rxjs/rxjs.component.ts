import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    /*this.regresaObservable().pipe(
      //retry()//reintentar de forma infinita
      retry(2) //reintentar 2 veces
    )*/

    this.subscription = this.regresaObservable()
    .subscribe( //para poder escuchar todo lo que hace es necesario suscribirse
      numero => console.log( 'Subs ', numero),
      error => console.log( 'Error en el obs ', error ),
      () => console.log( 'El observador termino' )
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){//funcion que se ejeecuta cada vez que se va de la pagina
    //console.log('la pagina se va a cerar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval( () => {
        contador ++;

        let salida = {
          valor: contador
        };

        //observer.next(contador);//next() notifica cada vez que la información llegue
        observer.next(salida);

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();//informa que el observador terminó
        // }

        //if ( contador === 2 ) {
          //clearInterval( intervalo );
        //  observer.error( 'Auxilio! ');
        //}

      }, 500 );

    })
    .retry(2)
  .map( (resp: any) => {

    return resp.valor;
  })
  .filter( (valor, index) => {

    if ( (valor % 2) === 1 ) {
      // impar
      return true;
    }else {
      // par
      return false;
    }

  });


  }

}
