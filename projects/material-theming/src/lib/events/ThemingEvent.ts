import { ThemeDefinitionBase } from '../ThemeDefinitionBase';

export abstract class ThemingEvent<TTarget extends ThemeDefinitionBase> {
  public constructor(public readonly target: TTarget) {}
}
