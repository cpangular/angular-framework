import * as color from '../palettes/color';


export function propertyName(palette: string, variant: string): string {
  return `--color-${palette}-${variant}`;
}

export function propertyValue(palette: string, variant: string): string {
  return `var(${color.propertyName(palette, variant)})`;
}
