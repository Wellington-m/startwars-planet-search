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
  const [filterByNumeric, setFilterByNumeric] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    ],
  });
  const [listOfFilters, setListOfFilters] = useState([]);

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
    filterByNumeric,
    setFilterByNumeric,
    isFilterByNumeric,
    setIsFilterByNumeric,
    listOfFilters,
    setListOfFilters,
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
