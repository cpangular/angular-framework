import { ThemeDefinitionBase } from '../ThemeDefinitionBase';
import { ThemingEvent } from './ThemingEvent';

export abstract class ThemingChangeEvent<TTarget extends ThemeDefinitionBase, TValue> extends ThemingEvent<TTarget> {
  public constructor(
    target: TTarget,
    public readonly oldValue: TValue | undefined,
    public readonly newValue: TValue | undefined
  ) {
    super(target);
  }
}


export abstract class ThemingPropertyChangeEvent<TTarget extends ThemeDefinitionBase, TValue> extends ThemingChangeEvent<TTarget, TValue> {
  public constructor(
    target: TTarget,
    public readonly propertyName: string,
    oldValue: TValue | undefined,
    newValue: TValue | undefined
  ) {
    super(target, oldValue, newValue);
  }
}
