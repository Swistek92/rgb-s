import React, { useEffect, useState } from "react";
import "./Styles/app/styles.css";
import {
  useLocalStorage,
  HexConverter,
  NewColorValidator,
  filterColors,
  uuid,
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
  const usedIds: Number[] = colors.map((e: Color) => e.id);
  const IdsController = new uuid(usedIds);

  useEffect(() => {
    filterColors({ filter, setFilteredColors, colors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, colors]);

  const addColorSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const converter = new HexConverter(color);
    const rgb = converter.rgb();
    const hsl = converter.hsl();
    const id = IdsController.generateId();
    const newColor = { id, color, rgb, hsl, removeable: true };
    const validate = NewColorValidator({ color, type: "submit", setError });
    if (validate) {
      setColors([...colors, newColor]);
      setColor("#");
    }
  };

  const RemoveBoxHandler = (id: number): void => {
    const filter = colors.filter((color) => color.id !== id);
    setColors(filter);
    IdsController.removeId(id);
  };

  const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
