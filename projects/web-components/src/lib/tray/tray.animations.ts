import { animate, query, state, style, transition, trigger } from "@angular/animations";

export const openVerticalAnimation = trigger('openClose', [
  state('openV', style({
    height: '*',
  })),
  state('closeV', style({
    height: '0px',
  })),
  state('openH', style({
    width: '*',
  })),
  state('closeH', style({
    width: '0px',
  })),
  transition('openV <=> closeV', [
    query(':scope > div', style({ position: 'absolute' })),
    animate('250ms')
  ]),
  transition('openH <=> closeH', [
    query(':scope > div', style({ position: 'absolute' })),
    animate('250ms')
  ])
]);
