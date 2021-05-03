import { BreakpointCompare } from "./BreakpointCompare";
import { ConditionResult } from '../conditions/conditions';
import { ViewSize } from './ViewSize';
import { BreakpointCheckArguments } from './BreakpointCheckArguments';
import { BreakpointConditionBase } from './BreakpointConditionBase';



export class BreakpointCondition<TResult> extends BreakpointConditionBase<TResult> {
  constructor(
    breakpoint: BreakpointCheckArguments,
    valueFn: (context: ViewSize) => ConditionResult<TResult | undefined>
  ) {
    super(
      new BreakpointCompare(breakpoint.min ?? 0, breakpoint.max ?? 0),
      breakpoint,
      valueFn
    );
  }
}
