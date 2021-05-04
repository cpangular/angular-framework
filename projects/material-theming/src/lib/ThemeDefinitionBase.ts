import { Observable, Subject } from 'rxjs';
import { findThemeDefinitionRule } from './util/stylesheets';
import { ThemingChangeEvent, ThemingPropertyChangeEvent } from './events/ThemingChangeEvent';
import { ThemingEvent } from './events/ThemingEvent';
import * as define from './properties/define';

export abstract class ThemeDefinitionBase {
  private static _defSheet: CSSStyleSheet | null = null;
  private _changes: Subject<ThemingEvent<ThemeDefinitionBase>> = new Subject();

  private readonly _name: string;
  private readonly _rule: CSSStyleRule;

  private static getDefinitionSheet(): CSSStyleSheet {
    if (!this._defSheet) {
      const sheetElm = document.createElement('style');
      document.head.appendChild(sheetElm);
      this._defSheet = sheetElm.sheet;
    }
    return this._defSheet!;
  }

  private static createDefinitionRule(type: string, name: string): CSSStyleRule {
    const sheet = this.getDefinitionSheet();
    const idx = sheet.insertRule(`:root { ${define.propertyName(type)}:${define.propertyValue(name)}; }`, sheet.cssRules.length);
    const rule = sheet.cssRules.item(idx) as CSSStyleRule;
    return rule as CSSStyleRule;
  }

  protected constructor(type: string, name: string);
  protected constructor(
    private readonly _type: string,
    name: string
  ) {
    this._name = name.trim();
    let rule = findThemeDefinitionRule(_type, this._name);
    if (!rule) {
      rule = ThemeDefinitionBase.createDefinitionRule(_type, this._name);
    }
    this._rule = rule;
  }

  public get changes(): Observable<ThemingEvent<ThemeDefinitionBase>> {
    return this._changes.asObservable();
  }

  protected emitChange(change: ThemingEvent<ThemeDefinitionBase>): void {
    this._changes.next(change);
  }

  protected get(prop: string): string {
    return this.rule.style.getPropertyValue(prop)?.trim();
  }

  protected set(prop: string, value: string | null, emit: boolean = true): void {
    value ??= null;
    value = value !== null ? value.trim() : null;
    const oldProp = this.get(prop);
    if (oldProp !== value) {
      const olddCss = this.toString();
      this.rule.style.setProperty(prop, value);
      if (emit) {
        this.emitChange(this.createPropertyChangeEvent(prop, value, oldProp));
        this.emitChange(this.createCssChangeEvent(this.toString(), olddCss));
      }
    }
  }

  protected abstract createPropertyChangeEvent(
    propertyName: string,
    newValue: string | null,
    oldvalue: string | null
  ): ThemingPropertyChangeEvent<ThemeDefinitionBase, string>;

  protected abstract createCssChangeEvent(
    newValue: string  | null,
    oldvalue: string | null
  ): ThemingChangeEvent<ThemeDefinitionBase, string>;

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }

  protected get rule(): CSSStyleRule {
    return this._rule;
  }
}
