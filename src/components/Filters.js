import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { filterByName: { name },
    setFilterByName,
    setIsFilterByName,
    setFilteredData,
    data } = useContext(PlanetsContext);

  useEffect(() => {
    setFilteredData(data.filter((planet) => planet.name.toLowerCase().includes(name)));
  }, [name]);

  const handleSearch = ({ target }) => {
    setIsFilterByName(true);
    setFilterByName({ name: target.value });
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
    </section>
  );
}

export default Filters;
