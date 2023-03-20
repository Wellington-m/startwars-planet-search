import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
// import Table from './components/Table';
import Filters from './components/Filters';
import Index from './pages/Index';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Index />
    </PlanetsProvider>

  );
}

export default App;
