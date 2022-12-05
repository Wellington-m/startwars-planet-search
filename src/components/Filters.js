import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import {
  FormStyled,
  ButtonStyled,
  FilterAndOrderStyle,
  MainSectionStyle } from './Style';

function Filters() {
  const RANGE = ['maior que', 'menor que', 'igual a'];
  const COLUMN_LIST_ORDER = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const { filterByName: { name },
    setFilterByName,
    setFilteredData,
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
    order,
    setOrder,
    columnOrderName,
    setColumnOrderName,
    sort,
    setSort,
    data } = useContext(PlanetsContext);

  useEffect(() => {
    const planetsFiltered = data
      .filter((planet) => planet.name.toLowerCase().includes(name)
      && planet[order.column] !== 'unknown');

    const unknownPlanets = data
      .filter((planet) => planet[order.column] === 'unknown');

    if (order.sort === 'ASC') {
      planetsFiltered.sort((a, b) => a[order.column] - b[order.column]);
    } else if (order.sort === 'DESC') {
      planetsFiltered.sort((a, b) => b[order.column] - a[order.column]);
    }

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

    setFilteredData([...resultArray, ...unknownPlanets]);
  }, [name, filterByNumericValues, order]);

  const handleSearch = ({ target }) => {
    setFilterByName({ name: target.value.toLowerCase() });
  };

  const filter = (element) => {
    element.preventDefault();
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

  const handleOrder = () => {
    setOrder({
      column: columnOrderName,
      sort,
    });
  };

  const handleOrderInputs = ({ target }) => {
    const { value: valueInput } = target;
    setSort(valueInput);
  };

  return (
    <MainSectionStyle>

      <FormStyled>
        <input
          type="text"
          placeholder="Planet Search"
          onChange={ handleSearch }
          data-testid="name-filter"
        />
      </FormStyled>

      <FilterAndOrderStyle>
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
        <ButtonStyled
          type="submit"
          data-testid="button-filter"
          onClick={ filter }
        >
          Filtrar
        </ButtonStyled>
      </FilterAndOrderStyle>
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

      <ButtonStyled
        type="button"
        onClick={ deleteAllFilters }
        data-testid="button-remove-filters"
        margin="10px"
      >
        Excluir todos os filtros
      </ButtonStyled>

      <FilterAndOrderStyle className="ordenar">
        <label htmlFor="order">
          Ordenar
          <select
            id="order"
            data-testid="column-sort"
            onChange={ ({ target }) => setColumnOrderName(target.value) }
          >
            { COLUMN_LIST_ORDER.map((columnOrder) => (
              <option
                key={ columnOrder }
                value={ columnOrder }
              >
                { columnOrder }
              </option>
            )) }
          </select>
        </label>

        <label htmlFor="ascendente">
          Ascendente
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="ascendente"
            name="sort"
            value="ASC"
            onClick={ handleOrderInputs }
          />
        </label>

        <label htmlFor="descendente">
          Descendente
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="descendente"
            name="sort"
            value="DESC"
            onClick={ handleOrderInputs }
          />
        </label>

        <ButtonStyled
          type="button"
          data-testid="column-sort-button"
          onClick={ handleOrder }
        >
          Ordenar
        </ButtonStyled>
      </FilterAndOrderStyle>
    </MainSectionStyle>
  );
}

export default Filters;
