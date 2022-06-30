import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [isFilterByName, setIsFilterByName] = useState(false);
  const [isFilterByNumeric, setIsFilterByNumeric] = useState(false);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columnList, setColumnList] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const getPlanet = async () => {
    try {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
      const requestJson = await request.json();
      setData(
        requestJson.results,
      );
      setFilteredData(
        requestJson.results,
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const contextValue = {
    data,
    setData,
    getPlanet,
    error,
    filterByName,
    setFilterByName,
    filteredData,
    setFilteredData,
    isFilterByName,
    setIsFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    isFilterByNumeric,
    setIsFilterByNumeric,
    columnList,
    setColumnList,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
