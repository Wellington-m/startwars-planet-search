import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const getPlanet = async () => {
    try {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
      const requestJson = await request.json();
      setData(
        ...data,
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
