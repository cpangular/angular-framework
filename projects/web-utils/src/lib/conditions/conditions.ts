

export type ConditionResult<TResult> = TResult | Promise<TResult>;


export abstract class ConditionBase<TContext, TResult>{
  public abstract evaluate(context: TContext): ConditionResult<boolean>;
  public abstract value(context: TContext): ConditionResult<TResult | undefined>;
}



export class ConditionFn<TContext, TResult> extends ConditionBase<TContext, TResult>{

  constructor(
    private readonly evalFn: (context: TContext) => ConditionResult<TResult | undefined>
  ) {
    super();
  }

  public async evaluate(context: TContext): Promise<boolean> {
    return (await this.value(context)) !== undefined;
  }

  public value(context: TContext): ConditionResult<TResult | undefined> {
    return this.evalFn(context);
  }

}

export class Condition<TContext, TResult> extends ConditionBase<TContext, TResult>{

  constructor(
    private readonly evalFn: (context: TContext) => ConditionResult<boolean>,
    private readonly valueFn: (context: TContext) => ConditionResult<TResult | undefined>
  ) {
    super();
  }

  public async evaluate(context: TContext): Promise<boolean> {
    return await this.evalFn(context);
  }

  public value(context: TContext): ConditionResult<TResult | undefined> {
    return this.valueFn(context);
  }

}



export class ConditionResolver<TContext, TResult> {

  constructor(
    private readonly conditions: ConditionBase<TContext, TResult>[]
  ) { }


  public async resolve(context: TContext): Promise<TResult | undefined> {
    for (const condition of this.conditions) {
      if (await condition.evaluate(context)) {
        return await condition.value(context);
      }
    }
    return undefined;
  }

}
