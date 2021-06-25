import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    const STAR_WARS_PLANET_API = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';

    const getPlanetList = async () => {
      const req = await fetch(STAR_WARS_PLANET_API);
      const { results } = await req.json();
      results.map((planet) => delete planet.residents);
      setData(results);
      setHeader(Object.keys(results[0]));
    };

    getPlanetList();
  }, []);

  const global = {
    data,
    header,
  };

  return (
    <StarWarsContext.Provider value={ global }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.html,
}.isRequired;

export default StarWarsProvider;
