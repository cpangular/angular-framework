import * as color from '../palettes/color';

export function propertyName(name: string): string {
  return `--foreround-${name}`;
}

export function propertyValue(palette: string, variant: string): string {
  return `var(${color.propertyName(palette, variant)})`;
}
