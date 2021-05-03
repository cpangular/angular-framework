import { IBreakpointCompare } from "./IBreakpointCompare";
import { ConditionFn, ConditionResult } from '../conditions/conditions';
import { ViewSize } from './ViewSize';
import { BreakpointConditionCheck } from './BreakpointConditionCheck';
import { CheckArguments } from './CheckArguments';



export abstract class BreakpointConditionBase<TResult> extends ConditionFn<ViewSize, TResult> {
  private _comps = {
    'eq': this.eq,
    '=': this.eq,
    '==': this.eq,
    '===': this.eq,
    'not': this.not,
    '!': this.not,
    '!=': this.not,
    '!==': this.not,
    '<>': this.not,
    'gt': this.gt,
    '>': this.gt,
    'lt': this.lt,
    '<': this.lt,
    'gteq': this.gtEq,
    '>=': this.gtEq,
    'lteq': this.ltEq,
    '<=': this.lt,
  };

  constructor(
    private comparer: IBreakpointCompare,
    private readonly breakpoint: CheckArguments,
    valueFn: (context: ViewSize) => ConditionResult<TResult | undefined>
  ) {
    super(valueFn);
  }

  public eq(val: number): boolean {
    return val === 0;
  }

  public lt(val: number): boolean {
    return val === -1;
  }

  public gt(val: number): boolean {
    return val === 1;
  }

  public ltEq(val: number): boolean {
    return val !== 1;
  }

  public gtEq(val: number): boolean {
    return val !== -1;
  }

  public not(val: number): boolean {
    return val !== 0;
  }

  public async evaluate(context: ViewSize): Promise<boolean> {
    return this._comps[this.breakpoint.check.toLowerCase() as BreakpointConditionCheck](
      this.comparer.compare(context)
    );
  }
}
