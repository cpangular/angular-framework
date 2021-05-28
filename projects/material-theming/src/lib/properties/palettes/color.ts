export function propertyName(palette: string, variant: string): string {
  return `--palette-${palette}-${variant}`;
}

export function propertyValue(value: string): string {
  return `${value}`;
}
