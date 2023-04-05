import React, { useState } from "react";

type AddColorFormPropsType = {
  addColorSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  color: string;
  ChangeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  RegExpIsHex: string;
  error: string;
};

export const AddColorForm = ({
  addColorSubmit,
  color,
  ChangeInputHandler,
  RegExpIsHex,
  error,
}: AddColorFormPropsType) => {
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
          required
        />
        <button disabled={!IsCorrectHex} type='submit'>
          Submit
        </button>
        {error && <p className='error'>{error}</p>}

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
