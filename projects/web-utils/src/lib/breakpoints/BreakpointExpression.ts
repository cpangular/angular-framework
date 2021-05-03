import { BreakpointCheckFn, BreakpointValueFn } from "./BreakpointEvaluator";




export type BreakpointExpression<T = any> = [
  BreakpointCheckFn | string | Array<BreakpointCheckFn | string>,
  BreakpointValueFn<T> | T
];



