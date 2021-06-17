export function propertyName(theme: string, name: string): string {
  return `--theme-${theme}-foreground-${name}`;
}

export function propertyValue(value: string): string {
  return `${value}`;
}
