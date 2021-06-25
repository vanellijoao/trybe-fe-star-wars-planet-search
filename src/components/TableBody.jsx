import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function TableBody() {
  const { data, header } = useContext(StarWarsContext);
  return (
    <tbody>
      { data.map((planet, i) => (
        <tr key={ i }>
          {header.map((att, j) => (
            <td key={ i + j }>
              {planet[att]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
