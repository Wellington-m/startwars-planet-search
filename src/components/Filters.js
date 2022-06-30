import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const COLUMN_LIST = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const RANGE = ['maior que', 'menor que', 'igual a'];

  const { filterByName: { name },
    setFilterByName,
    setIsFilterByName,
    setFilteredData,
    // filteredData,
    filterByNumeric,
    setFilterByNumeric,
    setIsFilterByNumeric,
    listOfFilters,
    setListOfFilters,
    data } = useContext(PlanetsContext);

  useEffect(() => {
    const planetsFiltered = data
      .filter((planet) => planet.name.toLowerCase().includes(name));

    const resultArray = listOfFilters.reduce((accumulator, filter) => {
      console.log('Acumulador', accumulator);
      return accumulator.filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.column]) > Number(filter.value);

        case 'menor que':
          return Number(planet[filter.column]) < Number(filter.value);

        case 'igual a':
          return Number(planet[filter.column]) === Number(filter.value);

        default:
          return true;
        }
      });
    }, planetsFiltered);

    setFilteredData(resultArray);
  }, [name, listOfFilters]);

  const handleSearch = ({ target }) => {
    setIsFilterByName(true);
    setFilterByName({ name: target.value.toLowerCase() });
  };

  const handleForm = ({ target }) => {
    const { name: nameSelect, value } = target;
    setFilterByNumeric({
      filterByNumericValues: [{
        ...filterByNumeric.filterByNumericValues[0],
        [nameSelect]: value,
      }],
    });
  };

  const filter = (element) => {
    element.preventDefault();
    setIsFilterByNumeric(true);
    const { column, comparison, value } = filterByNumeric.filterByNumericValues[0];
    setListOfFilters([...listOfFilters, { column, comparison, value }]);
  };

  return (
    <section>

      <form>
        <input
          type="text"
          placeholder="Planet Search"
          onChange={ handleSearch }
          data-testid="name-filter"
        />
      </form>

      <form onSubmit={ filter }>
        <select data-testid="column-filter" name="column" onChange={ handleForm }>
          { COLUMN_LIST.map((column) => <option key={ column }>{ column }</option>) }
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleForm }
        >
          { RANGE.map((column) => <option key={ column }>{ column }</option>) }
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ filterByNumeric.filterByNumericValues[0].value }
          onChange={ handleForm }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      { listOfFilters.map((filterList, index) => (
        <div key={ index }>
          {`${filterList.column} ${filterList.comparison} ${filterList.value}` }
        </div>
      )) }
    </section>
  );
}

export default Filters;
