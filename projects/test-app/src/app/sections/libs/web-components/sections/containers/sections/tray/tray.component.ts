import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tray-section',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss'],
})
export class TrayComponent {
  public opened: boolean = false;

  constructor() {}
}
