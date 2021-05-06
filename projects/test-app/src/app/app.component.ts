import { Component } from '@angular/core';
import { BreakpointService } from '@cpangular/web-cdk';
import { ApplicationService } from '@cpangular/web-components';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';
  showR = false;

  public allowToggleLeft = this.bs.createResolver([
    ['gt-md', false],
    ['', true],
  ])

  public lockOpenLeft = this.bs.createResolver([
    ['gt-md', true],
    ['', false],
  ])

  public hideHeaderOnScroll = this.bs.createResolver([
    ['lt-md', true],
    ['', false],
  ])

  constructor(
    public readonly app: ApplicationService,
    public readonly bs: BreakpointService
  ) {
    app.leftPanel.allowToggle = this.allowToggleLeft;
    app.leftPanel.lockOpen = this.lockOpenLeft;
    app.header.hideOnScroll = this.hideHeaderOnScroll;
  }
}
