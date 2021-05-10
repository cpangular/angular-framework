import { animate } from '@angular/animations';
import { style } from '@angular/animations';
import { transition } from '@angular/animations';
import { trigger } from '@angular/animations';

export const LoadingInOutAnimation = trigger('loadingInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(
      '200ms ease-out',
      style({ opacity: 1 })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(
      '200ms ease-in',
      style({ opacity: 0 })
    )
  ])
]);


