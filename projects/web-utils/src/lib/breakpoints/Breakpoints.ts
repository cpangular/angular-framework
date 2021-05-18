import { BreakpointCompareFn, BreakpointCheckFn, BreakpointCompare } from './BreakpointEvaluator';
import { BreakpointUtil } from './internal/BreakpointUtil';
import { Mutable } from './internal/Mutable';

function customBreakpoint(min: number, max: number, property: 'width' | 'height' = 'width'): BreakpointCompare {
  min = Math.max(0, min ?? 0);
  max = (max ?? 0) <= 0 ? Number.MAX_SAFE_INTEGER : max;

  return makeBreakpointFn(vs => {
    if (vs[property] < min) {
      return -1;
    } else if (vs[property] > max) {
      return 1;
    }
    return 0;
  });
}

function landscape(): BreakpointCompare {
  return makeBreakpointFn(vs => {
    if (vs.width >= vs.height) {
      return 0;
    }
    return -1;
  });
}

function portrait(): BreakpointCompare {
  return makeBreakpointFn(vs => {
    if (vs.width < vs.height) {
      return 0;
    }
    return 1;
  });
}

function makeBreakpointFn(compare: BreakpointCompareFn): BreakpointCompare {
  const cmp: Mutable<BreakpointCompare> = compare as BreakpointCompare as Mutable<BreakpointCompare>;
  cmp.eq = vs => BreakpointUtil.eq(compare(vs));
  cmp.not = vs => BreakpointUtil.not(compare(vs));
  cmp.lt = vs => BreakpointUtil.lt(compare(vs));
  cmp.ltEq = vs => BreakpointUtil.ltEq(compare(vs));
  cmp.gt = vs => BreakpointUtil.gt(compare(vs));
  cmp.gtEq = vs => BreakpointUtil.gtEq(compare(vs));
  return cmp as BreakpointCompare;
}

// @dynamic
export class Breakpoints {
  public static readonly custom = customBreakpoint;
  public static readonly landscape = landscape();
  public static readonly portrait = portrait();

  public static always(): BreakpointCheckFn {
    return vs => true;
  }

  public static and(...conditions: BreakpointCheckFn[]): BreakpointCheckFn {
    return vs => {
      for (const condition of conditions) {
        if (!condition(vs)) {
          return false;
        }
      }
      return true;
    };
  }

  public static or(...conditions: BreakpointCheckFn[]): BreakpointCheckFn {
    return vs => {
      for (const condition of conditions) {
        if (condition(vs)) {
          return true;
        }
      }
      return false;
    };
  }
}
