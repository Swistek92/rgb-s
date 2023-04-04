import React from "react";

// donatbalipapp.medium.com/colours-maths-90346fb5abda
type rgb = {
  r: number;
  g: number;
  b: number;
};

export const RgbToHsl = (rgb: rgb) => {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const l = (1 / 2) * (max + min);

  return l;
};
