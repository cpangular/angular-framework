import { IBreakpointCompare } from './IBreakpointCompare';




export class LandscapeBreakpointCompare implements IBreakpointCompare {
  constructor() { }

  compare(value: { width: number; height: number; }): number {
    if (value.width >= value.height) {
      return 0;
    }
    return -1;
  }

}
