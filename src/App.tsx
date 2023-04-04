import React, { useEffect, useState } from "react";
import "./Styles/app/styles.css";
import "./style.css";
import { useLocalStorage, HexToRgb, RgbToHsl } from "./Helpers";

type rgb = {
  r: number;
  g: number;
  b: number;
};

type Color = {
  id: number;
  name?: string;
  color: string;
  rgb: rgb;
  hsl: number;
  removeable: boolean;
};

type InitailValue = Color[];

const initalStatel: InitailValue = [
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

enum filterPossibilites {
  none = "none",
  red = "red",
  green = "green",
  blue = "blue",
  saturation = "saturation",
}

const App: React.FC = () => {
  const [colors, setColors] = useLocalStorage("colors", initalStatel);
  const [filteredColors, setFilteredColors] = useState<Color[]>(colors);
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
    } else if (filter === filterPossibilites.saturation) {
      const filtered = colors.filter((color) => color.hsl > 0.5);
      setFilteredColors(filtered);
    }
  };

  const addColorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rgb = HexToRgb(color);
    const hsl = RgbToHsl(rgb);

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

  const changeChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setColor(e.target.value);
    const regexp = new RegExp(/[0-9a-f]+/i);
    // const RegExpIsHex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
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
      <div className='Addingform'>
        <div className='form'>
          <form onSubmit={addColorSubmit}>
            <label htmlFor='color'>create color box</label>
            <input
              name='color'
              id='color'
              type='text'
              value={color}
              placeholder='type your color, remember starts with #'
              onChange={(e) => changeChangeInput(e)}
              // onChange={(e) => setColor(e.target.value)}
              pattern={RegExpIsHex}
              onBlur={() => setBlur(true)}
              required
              maxLength={7}
            />
            <button
              disabled={!new RegExp(RegExpIsHex).test(color)}
              type='submit'
            >
              Submit
            </button>
            {blur && <span className='error'> error</span>}
          </form>
          <h3>{color}</h3>
        </div>

        <div>
          <form>
            {filter}
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value={filterPossibilites.none}>all</option>
              <option value={filterPossibilites.red}>red &gt; 50%</option>
              <option value={filterPossibilites.green}>green &gt; 50%</option>
              <option value={filterPossibilites.blue}>blue &gt; 50%</option>
              <option value={filterPossibilites.saturation}>
                saturation &gt; 50%
              </option>
            </select>
          </form>
        </div>
      </div>

      <div className='boxs'>
        {filteredColors.map((color: Color) => (
          <div
            key={color.id}
            className='box'
            style={{ "--my-ccs-var": color.color } as React.CSSProperties}
          >
            {color.removeable && (
              <button onClick={() => RemoveBoxHandler(color.id)}>X</button>
            )}
            <p>{color.name && "deflaut " + color.name.toLocaleLowerCase()}</p>
            <p>{color.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
