import React, { useEffect, useState } from "react";
import "./Styles/app/styles.css";
import { useLocalStorage, HexConverter } from "./Helpers";
import { AddColorForm, FilterForm } from "./Components/Forms";
import Boxs from "./Components/Boxs/Boxs";

type rgb = {
  r: number;
  g: number;
  b: number;
};

export type Color = {
  id: number;
  name?: string;
  color: string;
  rgb: rgb;
  hsl: number;
  removeable: boolean;
};

export type ListOfColors = Color[];

const initalStatel: ListOfColors = [
  {
    id: 0,
    color: "#ff0000",
    rgb: { r: 255, g: 0, b: 0 },
    name: "RED",
    hsl: 0.5,
    removeable: false,
  },
  {
    id: 1,
    color: "#00FF00",
    rgb: { r: 0, g: 255, b: 0 },
    name: "GREEN",
    hsl: 0.5,
    removeable: false,
  },
  {
    id: 2,
    color: "#0000FF",
    rgb: { r: 0, g: 0, b: 255 },
    name: "BLUE",
    hsl: 0.5,
    removeable: false,
  },
];

export enum filterPossibilites {
  none = "none",
  red = "red",
  green = "green",
  blue = "blue",
  saturation = "saturation",
}

const App: React.FC = () => {
  const [colors, setColors] = useLocalStorage("colors", initalStatel);
  const [filteredColors, setFilteredColors] = useState<ListOfColors>(colors);
  const [color, setColor] = useState("#");
  const [blur, setBlur] = useState(false);
  const [filter, setFilter] = useState("none");
  const RegExpIsHex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

  useEffect(() => {
    filterColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, colors]);

  const filterColors = () => {
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
      console.log(filtered);
    } else if (filter === filterPossibilites.saturation) {
      const filtered = colors.filter((color) => color.hsl > 0.5);
      setFilteredColors(filtered);
    }
  };

  const addColorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const converter = new HexConverter(color);
    const rgb = converter.rgb();
    const hsl = converter.hsl();
    setColors([
      ...colors,
      { id: colors.length, color, rgb, hsl, removeable: true },
    ]);
    setBlur(false);
    setColor("#");
  };

  const RemoveBoxHandler = (id: number) => {
    const filter = colors.filter((color) => color.id !== id);
    setColors(filter);
  };

  const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = new RegExp(/[0-9a-f]+/i);
    if (e.target.value.length === 1 && e.target.value !== "#") {
      return console.log("start with #");
    } else if (
      e.target.value.length > 1 &&
      !regexp.test(e.target.value.slice(-1))
    ) {
      return console.log("not allowed char");
    } else {
      setColor(e.target.value);
    }
  };

  return (
    <div>
      <div className='Forms'>
        <AddColorForm
          addColorSubmit={addColorSubmit}
          color={color}
          ChangeInputHandler={ChangeInputHandler}
          setBlur={setBlur}
          RegExpIsHex={RegExpIsHex}
          blur={blur}
        />
        <FilterForm filter={filter} setFilter={setFilter} />
      </div>

      <Boxs
        filteredColors={filteredColors}
        RemoveBoxHandler={RemoveBoxHandler}
      />
    </div>
  );
};

export default App;
