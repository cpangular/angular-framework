import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'cp-tray-section',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss']
})
export class TrayComponent implements OnInit {

  public opened:boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
