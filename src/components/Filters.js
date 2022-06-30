import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const RANGE = ['maior que', 'menor que', 'igual a'];

  const { filterByName: { name },
    setFilterByName,
    setIsFilterByName,
    setFilteredData,
    setIsFilterByNumeric,
    filterByNumericValues,
    setFilterByNumericValues,
    columnList,
    setColumnList,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    data } = useContext(PlanetsContext);

  useEffect(() => {
    const planetsFiltered = data
      .filter((planet) => planet.name.toLowerCase().includes(name));

    const resultArray = filterByNumericValues.reduce((accumulator, filter) => {
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
  }, [name, filterByNumericValues]);

  const handleSearch = ({ target }) => {
    setIsFilterByName(true);
    setFilterByName({ name: target.value.toLowerCase() });
  };

  const filter = (element) => {
    element.preventDefault();
    setIsFilterByNumeric(true);
    const newFilter = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
    setColumnList(columnList.filter((columnName) => columnName !== column));
  };

  const handleDeleteFilter = (index, valueOfColumnFilter) => {
    setFilterByNumericValues(
      filterByNumericValues.filter((_item, indexItem) => indexItem !== index),
    );
    setColumnList([...columnList, valueOfColumnFilter]);
  };

  const deleteAllFilters = () => {
    setFilterByNumericValues([]);
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

      <form>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ ({ target }) => { setColumn(target.value); } }
        >
          { columnList.map((columnName) => (
            <option key={ columnName } value={ columnName }>{ columnName }</option>)) }
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => { setComparison(target.value); } }
        >
          { RANGE.map((comparisonName) => (
            <option key={ comparisonName }>{ comparisonName }</option>)) }
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ value }
          onChange={ ({ target }) => { setValue(target.value); } }
        />
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ filter }
        >
          Filtrar
        </button>
      </form>
      { filterByNumericValues.map((filterList, index) => (
        <div key={ index } data-testid="filter">
          {`${filterList.column} ${filterList.comparison} ${filterList.value}` }
          <button
            type="button"
            value={ filterList.column }
            onClick={ ({ target }) => handleDeleteFilter(index, target.value) }
          >
            excluir filtro
          </button>
        </div>
      )) }

      <button
        type="button"
        onClick={ deleteAllFilters }
        data-testid="button-remove-filters"
      >
        Excluir todos os filtros
      </button>
    </section>
  );
}

export default Filters;
