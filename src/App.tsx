import React, { useEffect, useState } from "react";
import "./Styles/app/styles.css";
import {
  useLocalStorage,
  HexConverter,
  NewColorValidator,
  filterColors,
} from "./Helpers";
import { AddColorForm, FilterForm } from "./Components/Forms";
import Boxs from "./Components/Boxs/Boxs";

export type rgb = {
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
  const [filter, setFilter] = useState("none");
  const [error, setError] = useState("");
  const RegExpIsHex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
  const usedIds = [0, 1, 2];

  useEffect(() => {
    filterColors({ filter, setFilteredColors, colors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, colors]);

  const addColorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const converter = new HexConverter(color);
    const rgb = converter.rgb();
    const hsl = converter.hsl();

    const getRandomId = (max: number): number => {
      return Math.random() * max;
    };

    const checkId = (id: number): number => {
      return usedIds.includes(id) ? checkId(getRandomId(999999)) : id;
    };

    const id = getRandomId(999999);
    let checkedNumber = checkId(id);
    usedIds.push(checkedNumber);

    const newColor = { id: checkedNumber, color, rgb, hsl, removeable: true };

    const validate = NewColorValidator({ color, type: "submit", setError });
    if (validate) {
      setColors([...colors, newColor]);
      setColor("#");
    }
  };

  const RemoveBoxHandler = (id: number) => {
    const filter = colors.filter((color) => color.id !== id);
    setColors(filter);
  };

  const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    const validate = NewColorValidator({
      color: newColor,
      type: "change",
      setError,
    });
    if (validate) setColor(newColor);
  };

  return (
    <div>
      <div className='Forms'>
        <AddColorForm
          addColorSubmit={addColorSubmit}
          color={color}
          ChangeInputHandler={ChangeInputHandler}
          RegExpIsHex={RegExpIsHex}
          error={error}
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
