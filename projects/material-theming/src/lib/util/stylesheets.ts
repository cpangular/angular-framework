import { from, IEnumerable } from 'linq';
import * as define from '../properties/define';


export const accessibleStyleSheets = from(document.styleSheets)
  .where(ss => { try { return !!ss.cssRules; } catch { return false; } });

export const definitionRules = accessibleStyleSheets
  .selectMany(_ => _.cssRules)
  .where(_ => _ instanceof CSSStyleRule
    && _.selectorText === ':root'
    && _.style.item(0).startsWith(define.propertyName(''))
  ) as IEnumerable<CSSStyleRule>;

export function findThemeDefinitionRule(type: string, name: string): CSSStyleRule | undefined {
  return definitionRules
    .firstOrDefault(_ => _.style.getPropertyValue(define.propertyName(type)).trim() === name.trim());
}
