import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';

function Index() {
  const {
    getPlanet,
    filteredData,
  } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanet();
  }, []);

  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'rotation_period', header: 'Rotation period' },
    { field: 'orbital_period', header: 'Orbital period' },
    { field: 'diameter', header: 'Diameter' },
    { field: 'climate', header: 'Climate' },
    { field: 'gravity', header: 'Gravity' },
    { field: 'terrain', header: 'Terrain' },
    { field: 'surface_water', header: 'Surface water' },
    { field: 'population', header: 'Population' },
    { field: 'films', header: 'Films' },
    { field: 'created', header: 'Created' },
    { field: 'edited', header: 'Edited' },
    { field: 'url', header: 'url' },
  ];

  return (
    <Table data={ filteredData } columns={ columns } />
  );
}

export default Index;
