import { from, IEnumerable } from 'linq';
import { Subscription } from 'rxjs';
import { ThemeCssChange } from '../events/ThemeEvents';
import { Palette } from '../palettes/Palette';
import * as applyBackground from '../properties/applied/background';
import * as applyColor from '../properties/applied/color';
import * as applyForeground from '../properties/applied/foreground';
import * as define from '../properties/define';
import { accessibleStyleSheets } from '../util/stylesheets';
import { IThemePaletteRef } from './IThemePaletteRef';
import { Theme } from './Theme';


const THEME_ID_ATTR = '_theme' + Math.round((Math.random() * 89) + 10);
const ROOT = ':root';
const TYPE = 'theme-applied';

export const appliedThemeRules = accessibleStyleSheets
  .selectMany(_ => _.cssRules)
  .where(_ => _ instanceof CSSStyleRule
    && _.selectorText.startsWith(`${ROOT}`)
    && _.style.item(0).startsWith(define.propertyName(TYPE))
  ) as IEnumerable<CSSStyleRule>;


export class AppliedTheme {
  private static _idCount = 0;
  private static _instances: Map<string, AppliedTheme> = new Map();

  private readonly _rule?: CSSStyleRule;
  private _enabled = false;
  private _themeSub?: Subscription;

  public static forSelector(selector: string): AppliedTheme {
    if (!AppliedTheme._instances.has(selector)) {
      AppliedTheme._instances.set(selector, new AppliedTheme(selector));
    }
    return AppliedTheme._instances.get(selector)!;
  }

  public static forElement(element: HTMLElement): AppliedTheme {
    let themeId = element.getAttribute(THEME_ID_ATTR);
    const hasId = !!themeId;
    if (!hasId) {
      themeId = AppliedTheme._idCount.toString();
      AppliedTheme._idCount++;
      element.setAttribute(THEME_ID_ATTR, themeId);

    }
    const selector = `[${THEME_ID_ATTR}=${themeId}]`;
    return AppliedTheme.forSelector(selector);
  }

  public static forRoot(): AppliedTheme {
    return AppliedTheme.forSelector('');
  }

  private constructor(
    private readonly selector: string
  ) {

    this._rule = appliedThemeRules.firstOrDefault(_ => selector === '' ? _.selectorText === `${ROOT}` : _.selectorText === `${ROOT} ${selector}`);
    if (this._rule) {
      this._enabled = true;
    } else {
      const sheetElm = document.createElement('style');
      document.head.appendChild(sheetElm);
      const sheet = sheetElm.sheet!;
      const idx = sheet.insertRule(
        `${ROOT} ${selector} { ${define.propertyName(TYPE)}:${define.propertyValue('')}; }`,
        sheet.cssRules.length
      );
      this._rule = sheet.cssRules.item(idx) as CSSStyleRule;
    }
    this.addThemeListener();
  }

  public get isApplied(): boolean {
    return !!this.themeName && (this._rule?.style?.length || 0) > 1;
  }

  public get themeName(): string | undefined {
    return this._rule?.style.getPropertyValue(define.propertyName(TYPE))?.trim();
  }

  public setTheme(themeName: string): void {
    if (this.themeName! === themeName) {
      this.disableTheme();
      this._rule?.style.setProperty(define.propertyName(TYPE), themeName);
      if (this.enabled) {
        this.applyTheme();
      }
      this.addThemeListener();
    }

  }

  private addThemeListener() {
    this._themeSub?.unsubscribe();
    this._themeSub = this.theme!.changes.subscribe(evt => {
      if (evt instanceof ThemeCssChange) {
        this.disableTheme();
        if (this.enabled) {
          this.applyTheme();
        }
      }
    });
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    if (this._enabled !== value) {
      this._enabled = value;
      this.disableTheme();
      if (value) {
        this.applyTheme();
      }
    }
  }

  private disableTheme(): void {
    if (this._rule) {
      const styles = from(this._rule.style).where(_ => _.startsWith('--') && _ !== define.propertyName(TYPE)).toArray();
      styles.forEach(_ => {
        this._rule!.style.removeProperty(_);
      });
    }
  }

  public get theme(): Theme | undefined {
    if (this.themeName) {
      return Theme.get(this.themeName);
    }
    return undefined;
  }

  private applyTheme(): void {
    const theme = this.theme;
    if(theme){
      this.applyTo(theme, this._rule!.style);
    }
  }


  private applyTo(theme: Theme, style: CSSStyleDeclaration): void {
    this.applyPalettesTo(theme, style);
    this.applyBackgroundTo(theme, style);
    this.applyForegroundTo(theme, style);
  }

  private applyPalettesTo(theme: Theme, style: CSSStyleDeclaration): void {

    for (const ref of theme.paletteRefs) {
      const palette = Palette.get(ref.palette);
      for (const variant of palette.variants) {
        style.setProperty(applyColor.propertyName(ref.name, variant), applyColor.propertyValue(ref.palette, variant));
        style.setProperty(applyColor.propertyName(ref.name, `${variant}-contrast`), applyColor.propertyValue(ref.palette, `${variant}-contrast`));
      }

      for (const variantName in ref.variants) {
        if (Object.prototype.hasOwnProperty.call(ref.variants, variantName)) {
          const variant = ref.variants[variantName];
          style.setProperty(applyColor.propertyName(ref.name, variantName), applyColor.propertyValue(ref.palette, variant));
          style.setProperty(applyColor.propertyName(ref.name, `${variantName}-contrast`), applyColor.propertyValue(ref.palette, `${variant}-contrast`));
        }
      }
    }
  }

  private applyBackgroundTo(theme: Theme, style: CSSStyleDeclaration): void {
    this.applyPlaneVariants(theme.getBackgroundRef(), style, applyBackground);
  }
  private applyForegroundTo(theme: Theme, style: CSSStyleDeclaration): void {
    this.applyPlaneVariants(theme.getForegroundRef(), style, applyForeground);
  }

  private applyPlaneVariants(ref: IThemePaletteRef, style: CSSStyleDeclaration, apply: typeof applyBackground | typeof applyForeground) {
    for (const variantName in ref.variants) {
      if (Object.prototype.hasOwnProperty.call(ref.variants, variantName)) {
        const variant = ref.variants[variantName];
        style.setProperty(apply.propertyName(variantName), apply.propertyValue(ref.palette, variant));
        style.setProperty(apply.propertyName(`${variantName}-contrast`), apply.propertyValue(ref.palette, `${variant}-contrast`));
      }
    }
  }


}
