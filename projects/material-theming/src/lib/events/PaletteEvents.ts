import { Palette } from '../palettes/Palette';
import {
  ThemingChangeEvent,
  ThemingPropertyChangeEvent,
} from './ThemingChangeEvent';

export abstract class PaletteChange<T> extends ThemingChangeEvent<Palette, T> {}
export abstract class PalettePropertyChange<
  T
> extends ThemingPropertyChangeEvent<Palette, T> {}
export class PaletteCssChange extends PaletteChange<string> {}
export class PaletteColorChange extends PalettePropertyChange<string> {}
export class PaletteContrastColorChange extends PalettePropertyChange<string> {}

export type PaletteChanges =
  | PaletteCssChange
  | PaletteColorChange
  | PaletteContrastColorChange;
