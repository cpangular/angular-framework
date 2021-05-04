
export function propertyName(type: string): string {
  return `--define-${type}`;
}

export function propertyValue(value: string): string {
  return `${value}`;
}
