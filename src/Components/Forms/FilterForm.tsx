import React from "react";
import { filterPossibilites } from "../../App";

type FilterForm = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterForm = ({ filter, setFilter }: FilterForm) => {
  return (
    <div className='Form'>
      <form>
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
  );
};
