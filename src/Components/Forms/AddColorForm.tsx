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
  const IsCorrectHex = new RegExp(RegExpIsHex).test(color);

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
        <button disabled={!IsCorrectHex} type='submit'>
          Submit
        </button>
        {blur && <span className='error'> error</span>}
        {IsCorrectHex && (
          <div>
            <h3 className='HeadingPreview'>your future color:</h3>
            <div
              className='preview'
              style={{ "--preview": color } as React.CSSProperties}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};
