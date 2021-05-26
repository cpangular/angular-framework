import { Component } from '@angular/core';
import { UiOutletService } from '@cpangular/web-cdk';
import { ApplicationLayoutOutlets } from '../application/application-layout/ApplicationLayoutOutlets';

@Component({
  selector: 'cp-material-application-parts',
  templateUrl: './material-application-parts.component.html',
  styleUrls: ['./material-application-parts.component.scss']
})
export class MaterialApplicationPartsComponent {
  public LayoutOutlet = ApplicationLayoutOutlets;
  constructor(
    public readonly outlets: UiOutletService
  ) { }
}
