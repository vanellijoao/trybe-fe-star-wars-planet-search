import React from 'react';
import Provider from './context/Provider';

import Table from './components/Table';
import Filter from './components/Filter';

import './styles/Table.css';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
