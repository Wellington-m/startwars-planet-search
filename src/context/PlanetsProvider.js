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
  const [order, setOrder] = useState({
    column: '',
    sort: '',
  });
  const [columnOrderName, setColumnOrderName] = useState('');
  const [sort, setSort] = useState('');

  const getPlanet = async () => {
    try {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
      const requestJson = await request.json();
      const sortedData = requestJson.results.sort((a, b) => {
        const NUMBER = 1;
        if (a.name < b.name) return -NUMBER;
        if (a.name > b.name) return NUMBER;
        return 0;
      });
      setData(
        sortedData,
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
    order,
    setOrder,
    columnOrderName,
    setColumnOrderName,
    sort,
    setSort,
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
