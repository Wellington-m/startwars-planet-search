import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const COLUMN_LIST = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const RANGE = ['maior que', 'menor que', 'igual a'];

  const { filterByName: { name },
    setFilterByName,
    setIsFilterByName,
    filteredData,
    setFilteredData,
    filterByNumeric,
    setFilterByNumeric,
    setIsFilterByNumeric,
    data } = useContext(PlanetsContext);

  useEffect(() => {
    setFilteredData(data.filter((planet) => planet.name.toLowerCase().includes(name)));
  }, [name]);

  const handleSearch = ({ target }) => {
    setIsFilterByName(true);
    setFilterByName({ name: target.value });
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
    setIsFilterByNumeric(true);
    element.preventDefault();
    const { column, comparison, value } = filterByNumeric.filterByNumericValues[0];

    switch (comparison) {
    case 'maior que': {
      const filtered = data.filter((planet) => Number(planet[column]) > Number(value));
      setFilteredData(filtered); }
      break;

    case 'menor que': {
      const filtered = data.filter((planet) => Number(planet[column]) < Number(value));
      setFilteredData(filtered); }
      break;

    case 'igual a': {
      const filtered = data.filter((planet) => Number(planet[column]) === Number(value));
      setFilteredData(filtered); }
      break;

    default:
      break;
    }
  };
  console.log(filteredData);

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

    </section>
  );
}

export default Filters;
