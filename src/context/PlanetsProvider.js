import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [isFilterByName, setIsFilterByName] = useState(false);

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
