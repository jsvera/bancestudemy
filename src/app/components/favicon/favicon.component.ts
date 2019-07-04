import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favicon',
  //templateUrl: './favicon.component.html',
  templateUrl: '../../../assets/images/logo-text.svg',
  styles: [ `
    svg{
      height: 40px;
      width: 40px;
    }
  `]
})
export class FaviconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
