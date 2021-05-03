import { CheckArguments } from './CheckArguments';



export interface BreakpointCheckArguments extends CheckArguments {
  min?: number;
  max?: number;
}
