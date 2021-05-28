import { ViewSize } from './ViewSize';

export type BreakpointCompareFn = (viewSize: ViewSize) => number;
export type BreakpointCheckFn = (viewSize: ViewSize) => boolean;
export type BreakpointValueFn<T = any> = () => T;

export type BreakpointCompare = BreakpointCompareFn & {
  readonly eq: BreakpointCheckFn;
  readonly not: BreakpointCheckFn;
  readonly lt: BreakpointCheckFn;
  readonly ltEq: BreakpointCheckFn;
  readonly gt: BreakpointCheckFn;
  readonly gtEq: BreakpointCheckFn;
};

export type BreakpointEvaluator<T = any> = [
  BreakpointCheckFn,
  BreakpointValueFn<T>
];
