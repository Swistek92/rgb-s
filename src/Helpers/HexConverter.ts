export class HexConverter {
  constructor(public hex: string) {}

  rgb() {
    if (this.hex.length === 4) {
      const r = [this.hex[1], this.hex[1]].join();
      const g = [this.hex[2], this.hex[2]].join();
      const b = [this.hex[3], this.hex[3]].join();

      return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
      };
    } else {
      return {
        r: parseInt(this.hex.slice(1, 3), 16),
        g: parseInt(this.hex.slice(3, 5), 16),
        b: parseInt(this.hex.slice(5, 7), 16),
      };
    }
  }

  hsl() {
    const rgb = this.rgb();
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return (1 / 2) * (max + min);
  }
}
