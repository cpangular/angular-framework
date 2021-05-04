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
  breakpoint: Observable<string>;

  constructor(
    public readonly app: ApplicationService,
    public readonly bs: BreakpointService
  ) {

    this.breakpoint = bs.createResolver([
      ['md', 'medium'],
      [vs => vs.width > 1900, '>1900']
    ]);
    this.breakpoint.subscribe(v =>{
      console.log(v)
    })

    /*
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

        const bpo = new BreakpointObservable(Breakpoints.or(
          Breakpoints.custom(0, 800).gt,
          Breakpoints.landscape.eq
        ));
        bpo.eq.subscribe(v => {
          console.log('bpo:', v);
        })
        /*  const t = new ResizeObservable();
          t.add(elmRef.nativeElement);
          t.subscribe(v => { });
          t.subscribe(v => {
            console.log(v)
          });*/
  }
}
