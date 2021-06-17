import { from, IEnumerable } from 'linq';
import {
  ThemeBackgroundRefChange,
  ThemeCssChange,
  ThemeForegroundRefChange,
  ThemePaletteRefChange,
} from '../events/ThemeEvents';
import {
  ThemingChangeEvent,
  ThemingPropertyChangeEvent,
} from '../events/ThemingChangeEvent';
import * as themeBg from '../properties/themes/background';
import * as themeColor from '../properties/themes/color';
import * as themeFg from '../properties/themes/foreground';
import { ThemeDefinitionBase } from '../ThemeDefinitionBase';
import { IThemePaletteRef } from './IThemePaletteRef';

export class Theme extends ThemeDefinitionBase {
  private static _instances: Map<string, Theme> = new Map();

  public static get(name: string): Theme {
    if (!this._instances.has(name)) {
      this._instances.set(name, new Theme(name));
    }
    return this._instances.get(name)!;
  }

  private constructor(name: string) {
    super('theme', name);
  }

  protected createPropertyChangeEvent(
    propertyName: string,
    newValue: string,
    oldvalue: string
  ): ThemingPropertyChangeEvent<Theme, string> {
    throw new Error('Method not implemented.');
  }

  protected createCssChangeEvent(
    newValue: string,
    oldvalue: string
  ): ThemingChangeEvent<Theme, string> {
    return new ThemeCssChange(this, oldvalue, newValue);
  }

  public get themeStyles(): IEnumerable<string> {
    return from(this.rule.style).where((_) =>
      _.startsWith(`--theme-${this.name}-`)
    );
  }

  public get paletteKeys(): string[] {
    return this.themeStyles
      .select((_) => _.split(themeColor.propertyPrefix(this.name))[1])
      .where((_) => !!_)
      .select((_) => _.split(`-`)[0])
      .distinct()
      .toArray();
  }

  public get paletteRefs(): IThemePaletteRef[] {
    const props = from(this.paletteKeys)
      .selectMany((palette) =>
        this.themeStyles
          .where((s) =>
            s.startsWith(themeColor.propertyName(this.name, palette, ''))
          )
          .select((property) => ({
            property: property.split(
              themeColor.propertyName(this.name, palette, '')
            )[1],
            palette,
          }))
      )
      .groupBy(
        (_) => _.palette,
        (_) => _,
        (k, g) => ({
          name: k,
          variants: g.toObject(
            (_) => _.property,
            (_) =>
              this.rule.style
                .getPropertyValue(
                  themeColor.propertyName(this.name, _.palette, _.property)
                )
                ?.trim()
          ),
        })
      )
      .select((_) => {
        const vars = { ..._.variants } as { name?: string };
        const palette = vars.name;
        delete vars.name;
        return {
          name: _.name,
          palette,
          variants: vars,
        } as IThemePaletteRef;
      });
    return props.toArray();
  }

  public getPaletteRef(name: string): IThemePaletteRef | undefined {
    return this.paletteRefs.find((_) => _.name === name);
  }

  public setPaletteRef(ref: IThemePaletteRef): void {
    const old = this.getPaletteRef(ref.name);
    const olddCss = this.toString();
    this.rule.style.setProperty(
      themeColor.propertyName(this.name, ref.name, 'name'),
      ref.palette
    );
    for (const key in ref.variants) {
      if (Object.prototype.hasOwnProperty.call(ref.variants, key)) {
        const value = ref.variants[key];
        this.rule.style.setProperty(
          themeColor.propertyName(this.name, ref.name, key),
          value
        );
      }
    }
    this.emitChange(
      new ThemePaletteRefChange(this, old, this.getPaletteRef(ref.name))
    );
    this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
  }

  public removePaletteRef(name: string): void {
    const old = this.getPaletteRef(name);
    if (old) {
      const olddCss = this.toString();
      this.themeStyles
        .where((_) =>
          _.startsWith(themeColor.propertyName(this.name, name, ''))
        )
        .forEach((_) => {
          this.rule.style.removeProperty(_);
        });
      this.emitChange(new ThemePaletteRefChange(this, old, undefined));
      this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
    }
  }

  public getBackgroundRef(): IThemePaletteRef {
    const bgProperty = themeBg.propertyName(this.name, '');
    return {
      name: 'background',
      palette: this.rule.style
        .getPropertyValue(themeBg.propertyName(this.name, 'name'))
        .trim(),
      variants: this.themeStyles
        .where((_) => _.startsWith(bgProperty) && !_.endsWith('-name'))
        .select((_) => _.split(bgProperty)[1])
        .toObject(
          (_) => _,
          (_) =>
            this.rule.style
              .getPropertyValue(themeBg.propertyName(this.name, _))
              .trim()
        ) as any,
    };
  }

  public setBackgroundRef(ref: IThemePaletteRef): void {
    const old = this.getBackgroundRef();
    const olddCss = this.toString();
    this.rule.style.setProperty(
      themeBg.propertyName(this.name, 'name'),
      ref.palette
    );
    for (const key in ref.variants) {
      if (Object.prototype.hasOwnProperty.call(ref.variants, key)) {
        const value = ref.variants[key];
        this.rule.style.setProperty(
          themeBg.propertyName(this.name, key),
          value
        );
      }
    }
    this.emitChange(
      new ThemeBackgroundRefChange(this, old, this.getBackgroundRef())
    );
    this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
  }

  public removeBackgroundRef(): void {
    const old = this.getBackgroundRef();
    if (old) {
      const olddCss = this.toString();
      this.themeStyles
        .where((_) => _.startsWith(themeBg.propertyName(this.name, '')))
        .forEach((_) => {
          this.rule.style.removeProperty(_);
        });
      this.emitChange(new ThemeBackgroundRefChange(this, old, undefined));
      this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
    }
  }

  public getForegroundRef(): IThemePaletteRef {
    const bgProperty = themeFg.propertyName(this.name, '');
    return {
      name: 'foreground',
      palette: this.rule.style
        .getPropertyValue(themeFg.propertyName(this.name, 'name'))
        .trim(),
      variants: this.themeStyles
        .where((_) => _.startsWith(bgProperty) && !_.endsWith('-name'))
        .select((_) => _.split(bgProperty)[1])
        .toObject(
          (_) => _,
          (_) =>
            this.rule.style
              .getPropertyValue(themeFg.propertyName(this.name, _))
              .trim()
        ) as any,
    };
  }

  public setForegroundRef(ref: IThemePaletteRef): void {
    const old = this.getForegroundRef();
    const olddCss = this.toString();
    this.rule.style.setProperty(
      themeFg.propertyName(this.name, 'name'),
      ref.palette
    );
    for (const key in ref.variants) {
      if (Object.prototype.hasOwnProperty.call(ref.variants, key)) {
        const value = ref.variants[key];
        this.rule.style.setProperty(
          themeFg.propertyName(this.name, key),
          value
        );
      }
    }
    this.emitChange(
      new ThemeForegroundRefChange(this, old, this.getForegroundRef())
    );
    this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
  }

  public removeForegroundRef(): void {
    const old = this.getForegroundRef();
    if (old) {
      const olddCss = this.toString();
      this.themeStyles
        .where((_) => _.startsWith(themeFg.propertyName(this.name, '')))
        .forEach((_) => {
          this.rule.style.removeProperty(_);
        });
      this.emitChange(new ThemeForegroundRefChange(this, old, undefined));
      this.emitChange(new ThemeCssChange(this, olddCss, this.toString()));
    }
  }
}
