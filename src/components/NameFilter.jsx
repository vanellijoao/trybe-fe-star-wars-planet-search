import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function NameFilter() {
  const { filterByName, handleChange } = useContext(StarWarsContext);

  return (
    <label htmlFor="name-filter">
      Filter by name
      <input
        id="name-filter"
        type="text"
        value={ filterByName }
        onChange={ handleChange }
      />
    </label>
  );
}

export default NameFilter;
