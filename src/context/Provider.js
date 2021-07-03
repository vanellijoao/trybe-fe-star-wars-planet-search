import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const comparisonFunc = {
  'maior que': (num1, num2) => num1 > num2,
  'menor que': (num1, num2) => num1 < num2,
  'igual a': (num1, num2) => num1 === num2,
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [filteredByNumber, setFilteredByNumber] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [wasFilteredByNumber, setWasFilteredByNumber] = useState(false);
  const [numericFilter] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // didMount
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((resp) => resp.json());
      setData(results);
      setHeader(Object.keys(results[0]));
    };
    getPlanets();
  }, []);

  const handleChangeText = ({ target: { value } }) => {
    setTextFilter(value);
  };

  const handleFilter = (state) => {
    setWasFilteredByNumber(true);
    numericFilter.push(state);
    const filteredOptions = columnOptions.filter((el) => el !== state.column);
    setColumnOptions(filteredOptions);
  };

  const disableFilters = () => {
    setWasFilteredByNumber(false);
  };

  // filter by name
  useEffect(() => {
    if (textFilter) {
      const filterByName = data.filter(
        ({ name }) => name.toLowerCase().includes(textFilter.toLowerCase()),
      );
      if (filterByName.length > 0) {
        setFilteredByName(filterByName);
      } else {
        setFilteredByName(data);
      }
    }
  }, [data, textFilter]);

  // filter by numeric value
  useEffect(() => {
    if (wasFilteredByNumber) {
      const { column, comparison, value } = numericFilter[0];
      const filterByNumber = data.filter(
        (el) => comparisonFunc[comparison](parseFloat(el[column]), parseFloat(value)),
      );
      setFilteredByNumber(filterByNumber);
    } else {
      setWasFilteredByNumber(false);
    }
  }, [data, numericFilter, wasFilteredByNumber]);

  const globalContext = {
    data,
    header,
    textFilter,
    numericFilter,
    filteredByName,
    handleChangeText,
    filteredByNumber,
    wasFilteredByNumber,
    handleFilter,
    columnOptions,
    disableFilters,
  };

  return (
    <StarWarsContext.Provider value={ globalContext }>
      {children}
    </StarWarsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.html,
}.isRequired;

export default PlanetsProvider;
