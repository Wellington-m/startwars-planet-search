import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { DivTableStyle } from './Style';

function Table({ data = null, columns = null }) {
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };

  const iterator = (list) => {
    if (typeof list === 'object') {
      return (
        <ul>
          { list.map((film) => (
            <li key={ film }>{ film }</li>
          )) }
        </ul>
      );
    }

    return (list);
  };

  return (
    <DivTableStyle>
      <table>
        <thead>
          <tr>
            { columns && columns.map((head) => (
              <th key={ head.field }>{ getCaps(head.header, head.field) }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { data && data.map((row) => (
            <tr key={ row.name }>
              {columns.map((col) => (
                <td key={ row[col.field] }>{ iterator(row[col.field]) }</td>
              ))}
            </tr>
          )) }
        </tbody>
      </table>

      { data ? null : <p>Nada para mostrar aqui :)</p> }
    </DivTableStyle>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(shape).isRequired,
  columns: PropTypes.arrayOf(shape).isRequired,
};

export default Table;
