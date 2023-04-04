export const HexToRgb = (hex: string) => {
  if (hex.length === 4) {
    const r = [hex[1], hex[1]].join();
    const g = [hex[2], hex[2]].join();
    const b = [hex[3], hex[3]].join();

    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
    };
  } else {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
  }
};
