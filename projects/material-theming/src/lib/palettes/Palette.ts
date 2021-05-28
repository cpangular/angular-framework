import {
  PaletteColorChange,
  PaletteContrastColorChange,
  PaletteCssChange,
} from '../events/PaletteEvents';
import { ThemeDefinitionBase } from '../ThemeDefinitionBase';
import * as color from '../properties/palettes/color';

import { from } from 'linq';
import { IPaletteColors } from './IPaletteColors';

export class Palette extends ThemeDefinitionBase {
  private static _instances: Map<string, Palette> = new Map();

  public static get(name: string): Palette {
    if (!this._instances.has(name)) {
      this._instances.set(name, new Palette(name));
    }
    return this._instances.get(name)!;
  }

  private constructor(name: string) {
    super('palette', name);
  }

  public color(variant: string): string;
  public color(variant: string, value: string, emit?: boolean): this;
  public color(variant: string, ...rest: [string?, boolean?]): string | this {
    if (!rest.length) {
      return this.get(color.propertyName(this.name, variant))!;
    }
    this.set(
      color.propertyName(this.name, variant),
      color.propertyValue(rest[0]!),
      rest[1]!
    );
    return this;
  }

  public contrast(variant: string): string;
  public contrast(variant: string, value: string, emit?: boolean): this;
  public contrast(
    variant: string,
    ...rest: [string?, boolean?]
  ): string | this {
    return this.color(
      variant + '-contrast',
      ...(rest as [string, boolean?])
    ) as string | this;
  }

  public get variants(): string[] {
    return from(this.rule.style)
      .select((_) => _.split(color.propertyName(this.name, ''))[1])
      .where((_) => !!_)
      .select((_) => _.split(`-`)[0])
      .distinct()
      .toArray();
  }

  protected createPropertyChangeEvent(
    propertyName: string,
    newValue: string,
    oldvalue: string
  ): PaletteContrastColorChange | PaletteColorChange {
    if (propertyName.endsWith('-contrast')) {
      return new PaletteContrastColorChange(
        this,
        propertyName.split('-contrast')[0],
        oldvalue,
        newValue
      );
    }
    return new PaletteColorChange(this, propertyName, oldvalue, newValue);
  }

  protected createCssChangeEvent(
    newValue: string,
    oldValue: string
  ): PaletteCssChange {
    return new PaletteCssChange(this, oldValue, newValue);
  }

  public applyColors(colors: IPaletteColors): void {
    // todo: remove exisiting
    for (const key in colors.contrast) {
      if (Object.prototype.hasOwnProperty.call(colors.contrast, key)) {
        this.color(key, colors[key]).contrast(key, colors.contrast[key]);
      }
    }
  }

  public toString(): string {
    return this.rule.cssText;
  }
}
