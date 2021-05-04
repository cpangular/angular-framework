import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cp-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss']
})
export class ApplicationPanelComponent implements OnInit {

  @Input()
  public anchor: 'top' | 'left' | 'bottom' | 'right' = 'top';

  public get anchorOpposite(): 'top' | 'left' | 'bottom' | 'right' {
    switch (this.anchor) {
      case 'bottom':
        return 'top';
      case 'top':
        return 'bottom';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  }
  @Input()
  @HostBinding('class.inline')
  public inline: boolean = true;

  @Input()
  public opened: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
