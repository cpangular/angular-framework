import { PortraitBreakpointCompare } from "./PortraitBreakpointCompare";
import { ConditionResult } from '../conditions/conditions';
import { ViewSize } from './ViewSize';
import { CheckArguments } from './CheckArguments';
import { BreakpointConditionBase } from './BreakpointConditionBase';



export class PortraitCondition<TResult> extends BreakpointConditionBase<TResult> {
  constructor(
    breakpoint: CheckArguments,
    valueFn: (context: ViewSize) => ConditionResult<TResult | undefined>
  ) {
    super(
      new PortraitBreakpointCompare(),
      breakpoint,
      valueFn
    );
  }
}
