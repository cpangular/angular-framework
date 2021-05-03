
import { BreakpointResolver, Breakpoints } from 'web-utils';
import { Component } from '@angular/core';
import { ApplicationService } from 'web-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';

  constructor(
    public readonly app: ApplicationService
  ) {

    const bpr = new BreakpointResolver<string>([
      [
        'landscape',
        'landscape'
      ],
      [
        Breakpoints.and(
          Breakpoints.custom(0, 800).gt,
          Breakpoints.landscape.eq
        ),
        () => 'landscape with width greater than 800'
      ],
      [
        Breakpoints.custom(0, 800).gt,
        'width greater than 800'
      ]
    ], {
      landscape: Breakpoints.landscape.eq
    })
    bpr.subscribe(v => {
      console.log('current value:', v);
    })
    /*  const t = new ResizeObservable();
      t.add(elmRef.nativeElement);
      t.subscribe(v => { });
      t.subscribe(v => {
        console.log(v)
      });*/
  }
}
