import { ResizeObservable } from 'web-utils';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';

  constructor(
    elmRef: ElementRef<Element>
  ) {
    const t = new ResizeObservable();
    t.add(elmRef.nativeElement);
    t.subscribe(v => { });
    t.subscribe(v => {
      console.log(v)
    });
  }
}
