import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-web-module-federation',
  template: ` <p>web-module-federation works!</p> `,
  styles: [],
})
export class WebModuleFederationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('hi');
  }
}
