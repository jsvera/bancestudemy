import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


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
    console.log('la pagina se va a cerar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {
        contador ++;

        const salida = {
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

      }, 1000 );

    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        //console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
        //return true;//debe retornar True o False
      })
    );

    //return obs;
  }

}
