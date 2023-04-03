import React, { useRef, useState } from "react";
import "./Styles/app/styles.css";
import "./style.css";
import { useLocalStorage } from "./Helpers/UseLocalStorage";

type Color = { id: number; name?: string; color: string; removeable: boolean };

type InitailValue = Color[];

const initalStatel: InitailValue = [
  { id: 0, color: "#ff0000", name: "RED", removeable: false },
  { id: 1, color: "#00FF00", name: "GREEN", removeable: false },
  { id: 2, color: "#0000FF", name: "BLUE", removeable: false },
];

const App: React.FC = () => {
  const [state, setState] = useLocalStorage("colors", initalStatel);

  const [color, setColor] = useState("#");

  const addColorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState([...state, { id: state.length, color, removeable: true }]);
  };

  return (
    <div>
      <div className='forms'>
        <div className='form'>
          <h2>create new color</h2>
          <form onSubmit={addColorSubmit}>
            <input
              name='color'
              type='text'
              required
              value={color}
              placeholder='type your color '
              onChange={(e) => setColor(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
          <h3>{color}</h3>
        </div>
        <div className='form'>
          {/* <form>
            <select>
              <option value='red'>red &gt; 50%</option>
              <option value='red'>green &gt; 50%</option>
              <option value='red'>blue &gt; 50%</option>
              <option value='saturation'>saturation &gt; 50%</option>
            </select>
          </form> */}
        </div>
      </div>

      <div className='container'>
        <br />
        {state.map((e) => (
          <div
            key={e.id}
            className='box'
            style={{ "--my-ccs-var": e.color } as React.CSSProperties}
          >
            as
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
