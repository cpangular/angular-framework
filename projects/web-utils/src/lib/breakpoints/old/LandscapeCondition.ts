import { LandscapeBreakpointCompare } from "./LandscapeBreakpointCompare";
import { ConditionResult } from '../conditions/conditions';
import { ViewSize } from './ViewSize';
import { CheckArguments } from './CheckArguments';
import { BreakpointConditionBase } from './BreakpointConditionBase';



export class LandscapeCondition<TResult> extends BreakpointConditionBase<TResult> {
  constructor(
    breakpoint: CheckArguments,
    valueFn: (context: ViewSize) => ConditionResult<TResult | undefined>
  ) {
    super(
      new LandscapeBreakpointCompare(),
      breakpoint,
      valueFn
    );
  }
}
