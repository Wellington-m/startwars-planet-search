import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Provisory.css';

function Table() {
  const {
    getPlanet,
    data,
    // isFilterByName,
    filteredData,
    // isFilterByNumeric,
  } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanet();
  }, []);

  let finalTitles = [];
  if (data.length > 0) {
    const TITLES = Object.keys(data[0]).filter((title) => title !== 'residents');

    const TITLES_TO_UPPERCASE = TITLES
      .map((title) => title[0].toUpperCase() + title.substring(1));

    finalTitles = TITLES_TO_UPPERCASE.map((title) => title.replace('_', ' '));
  }

  return (
    <table>
      <thead>
        <tr>
          { finalTitles.length > 0 && finalTitles.map((title) => (
            <th key={ title }>{ title }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { filteredData.length > 0 && filteredData.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              <ul>
                { planet.films.map((film) => (
                  <li key={ film }>{ film }</li>
                )) }
              </ul>
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
