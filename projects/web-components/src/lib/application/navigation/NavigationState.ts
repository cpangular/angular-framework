import { RouterEvent } from '@angular/router';

export enum NavigationState {
  None,
  Navigation,
  GuardCheck,
  Resolve,
  Error,
}

export interface NavigateStateInfo {
  state: NavigationState;
  url: string;
  label?: string;
  event: RouterEvent;
}
