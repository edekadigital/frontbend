export function roundToDivisor(value: number, divisor: number): number {
  return divisor * Math.ceil(value / divisor);
}
