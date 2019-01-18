import { roundToDivisor } from './roundToDivisor';

const DEFAULT_DIVISOR = 5;

export function getVW(
  imageWidth: number,
  viewportWidth: number,
  divisor: number = DEFAULT_DIVISOR
): string {
  const value: number = roundToDivisor(
    (imageWidth / viewportWidth) * 100,
    divisor
  );
  return `${value}vw`;
}
