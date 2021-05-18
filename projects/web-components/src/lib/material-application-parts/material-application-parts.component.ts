import { UiOutletService } from '@cpangular/web-cdk';
import { Component, OnInit } from '@angular/core';
import { ApplicationLayoutOutlets } from '../application/application-layout/ApplicationLayoutOutlets';

@Component({
  selector: 'cp-material-application-parts',
  templateUrl: './material-application-parts.component.html',
  styleUrls: ['./material-application-parts.component.scss']
})
export class MaterialApplicationPartsComponent implements OnInit {
  public LayoutOutlet = ApplicationLayoutOutlets;
  constructor(
    public readonly outlets: UiOutletService
  ) { }

  ngOnInit() {
  }
}
