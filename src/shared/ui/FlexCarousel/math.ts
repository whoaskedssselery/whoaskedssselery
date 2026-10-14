export const hexToRgb = (hex: string): [number, number, number] => {
  const value = parseInt(hex.replace('#', ''), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
};

export const wrap = (value: number, size: number) => ((((value + size / 2) % size) + size) % size) - size / 2;
export const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
export const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3);
export const easeOutQuint = (value: number) => 1 - Math.pow(1 - clamp01(value), 5);
export const easeInOut = (value: number) => {
  const t = clamp01(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
