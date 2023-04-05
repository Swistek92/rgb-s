import React from "react";
import { ListOfColors, Color } from "../../App";

type BoxsType = {
  filteredColors: ListOfColors;
  RemoveBoxHandler: (id: number) => void;
};

const Boxs = ({ filteredColors, RemoveBoxHandler }: BoxsType) => {
  return (
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
          <p>{color.name && "default  " + color.name.toLocaleLowerCase()}</p>
          <p>{color.color}</p>
        </div>
      ))}
    </div>
  );
};

export default Boxs;
