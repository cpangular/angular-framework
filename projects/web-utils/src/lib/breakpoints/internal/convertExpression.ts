import { Breakpoints } from '../Breakpoints';
import {
  BreakpointCheckFn,
  BreakpointEvaluator,
  BreakpointValueFn,
} from '../BreakpointEvaluator';
import { BreakpointExpression } from '../BreakpointExpression';

export function convertExpression<T>(
  exp: BreakpointExpression<T>,
  dict: Record<string, BreakpointCheckFn> = {}
): BreakpointEvaluator<T> {
  const check = Array.isArray(exp[0]) ? exp[0] : [exp[0]];
  for (let i = 0; i < check.length; i++) {
    const c = check[i];
    const cFn = typeof c === 'string' ? dict[c] : c;
    check[i] = cFn;
  }
  return [
    Breakpoints.and(...(check as BreakpointCheckFn[])),
    (typeof exp[1] === 'function'
      ? exp[1]
      : () => exp[1]) as BreakpointValueFn<T>,
  ];
}

export function convertExpressions<T>(
  exps: BreakpointExpression<T>[],
  dict: Record<string, BreakpointCheckFn> = {}
): BreakpointEvaluator<T>[] {
  return exps.map((e) => convertExpression(e, dict));
}
