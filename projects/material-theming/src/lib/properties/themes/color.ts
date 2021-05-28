export function propertyPrefix(theme: string): string {
  return `--theme-${theme}-palette-`;
}

export function propertyName(
  theme: string,
  palette: string,
  name: string
): string {
  return `${propertyPrefix(theme)}${palette}-${name}`;
}

export function propertyValue(value: string): string {
  return `${value}`;
}
