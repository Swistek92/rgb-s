import React from "react";

type AddColorForm = {
  addColorSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  color: string;
  ChangeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  RegExpIsHex: string;
  blur: boolean;
  setBlur: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddColorForm = ({
  addColorSubmit,
  color,
  ChangeInputHandler,
  setBlur,
  RegExpIsHex,
  blur,
}: AddColorForm) => {
  return (
    <div className='Form'>
      <form onSubmit={addColorSubmit}>
        <input
          name='color'
          id='color'
          type='text'
          value={color}
          placeholder='type your color, remember starts with #'
          onChange={(e) => ChangeInputHandler(e)}
          pattern={RegExpIsHex}
          onBlur={() => setBlur(true)}
          required
          maxLength={7}
        />
        <button disabled={!new RegExp(RegExpIsHex).test(color)} type='submit'>
          Submit
        </button>
        {blur && <span className='error'> error</span>}
      </form>
      <h3>{color}</h3>
    </div>
  );
};
