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
  transition('openV => closeV', [
    query(':scope > div', style({ position: 'absolute', height: '{{ size }}' })),

    animate('250ms ease-in')
  ], { params: { size: '40vh' } }),
  transition('closeV => openV', [
    query(':scope > div', style({ position: 'absolute', height: '{{ size }}' })),
    animate('250ms ease-out')
  ], { params: { size: '40vh' } }),
  transition('openH => closeH', [
    query(':scope > div', style({ position: 'absolute', width: '{{ size }}' })),
    query(':scope > div > div', style({ position: 'absolute' })),
    animate('250ms ease-in')
  ], { params: { size: '40vw' } }),
  transition('closeH => openH', [
    query(':scope > div', style({ position: 'absolute', width: '{{ size }}' })),
    query(':scope > div > div', style({ position: 'absolute' })),
    animate('250ms ease-out')
  ], { params: { size: '40vw' } })
]);
