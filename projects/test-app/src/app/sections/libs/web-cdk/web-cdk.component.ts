import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cp-web-cdk',
  templateUrl: './web-cdk.component.html',
  styleUrls: ['./web-cdk.component.css']
})
export class WebCdkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ne(evt:any) {
    console.log('++++', evt)
  }
}
