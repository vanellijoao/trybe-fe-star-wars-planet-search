import React from 'react';

import TableHead from './TableHead';
import TableBody from './TableBody';

import '../styles/Table.css';

function Table() {
  return (
    <table>
      <TableHead />
      <TableBody />
    </table>
  );
}

export default Table;
