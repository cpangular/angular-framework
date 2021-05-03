import { LandscapeBreakpointCompare } from './LandscapeBreakpointCompare';




export class PortraitBreakpointCompare extends LandscapeBreakpointCompare {
  compare(value: { width: number; height: number; }): number {
    return super.compare(value) === 0 ? 1 : 0;
  }
}
