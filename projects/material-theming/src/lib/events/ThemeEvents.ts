import { IThemePaletteRef } from '../themes/IThemePaletteRef';
import { Theme } from '../themes/Theme';
import {
  ThemingChangeEvent,
  ThemingPropertyChangeEvent,
} from './ThemingChangeEvent';

export abstract class ThemeChange<T> extends ThemingChangeEvent<Theme, T> {}
export abstract class ThemePropertyChange<T> extends ThemingPropertyChangeEvent<
  Theme,
  T
> {}
export class ThemePaletteRefChange extends ThemeChange<IThemePaletteRef<any>> {}
export class ThemeBackgroundRefChange extends ThemeChange<
  IThemePaletteRef<any>
> {}
export class ThemeForegroundRefChange extends ThemeChange<
  IThemePaletteRef<any>
> {}
export class ThemeCssChange extends ThemeChange<string> {}

export class ThemeColorChange extends ThemePropertyChange<string> {}
export class ThemeContrastChange extends ThemePropertyChange<string> {}

export type ThemeChanges = ThemeCssChange; // | PaletteColorChange | PaletteContrastChange;
