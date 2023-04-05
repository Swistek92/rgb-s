import { ListOfColors, filterPossibilites } from "../App";

type FilterColors = {
  filter: string;
  setFilteredColors: React.Dispatch<React.SetStateAction<ListOfColors>>;
  colors: ListOfColors;
};

export const filterColors = ({
  filter,
  setFilteredColors,
  colors,
}: FilterColors): void => {
  if (filter === filterPossibilites.none) {
    setFilteredColors(colors);
  } else if (filter === filterPossibilites.red) {
    const filtered = colors.filter((color) => color.rgb.r > 127);
    setFilteredColors(filtered);
  } else if (filter === filterPossibilites.green) {
    const filtered = colors.filter((color) => color.rgb.g > 127);
    setFilteredColors(filtered);
  } else if (filter === filterPossibilites.blue) {
    const filtered = colors.filter((color) => color.rgb.b > 127);
    setFilteredColors(filtered);
  } else if (filter === filterPossibilites.saturation) {
    const filtered = colors.filter((color) => color.hsl > 0.5);
    setFilteredColors(filtered);
  }
};
