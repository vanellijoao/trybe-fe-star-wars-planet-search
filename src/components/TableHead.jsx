import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function TableHead() {
  const { header } = useContext(StarWarsContext);
  return (
    <thead>
      <tr>
        {header.map((th, i) => (
          <th key={ i }>
            { th }
          </th>))}
      </tr>
    </thead>
  );
}

export default TableHead;
