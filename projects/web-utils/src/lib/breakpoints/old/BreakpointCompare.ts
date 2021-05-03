import { IBreakpointCompare } from './IBreakpointCompare';




export class BreakpointCompare implements IBreakpointCompare {
  constructor(
    public readonly min: number,
    public readonly max: number
  ) {
    if (max <= 0) {
      this.max = Number.MAX_SAFE_INTEGER;
    }
  }

  compare(value: { width: number; height: number; }): number {
    if (value.width < this.min) {
      return -1;
    }
    if (value.width > this.max) {
      return 1;
    }
    return 0;
  }

}
