import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationLayoutCopyComponent, ApplicationService } from '@cpangular/web-components';

@Component({
  selector: 'cp-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.scss']
})
export class BComponent implements OnInit, OnDestroy {

  constructor(
    private readonly app: ApplicationService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('22222222222222222222222222');
    this.app.layout.set(this.route, ApplicationLayoutCopyComponent);
  }
  ngOnDestroy() {
    this.app.layout.delete(this.route);
  }
}
