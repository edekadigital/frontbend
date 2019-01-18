import { roundToDivisor } from './roundToDivisor';

export function getRoundedImageWidth(value: number): number {
  const divisor = value > 1000 ? 200 : 100;
  return roundToDivisor(value, divisor);
}
