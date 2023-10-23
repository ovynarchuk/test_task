import { useEffect, useState } from 'react';
import { getTable } from '../api';
import { Loader } from './Loader';
import { Table } from '../types/Table';

const emptyTable: Table = {
  count: 0,
  next: null,
  previous: null,
  results : [],
}

export const TablePage: React.FC = () => {
  const [table, setTable] = useState<Table>(emptyTable);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTable()
      .then(setTable)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {table?.results.length > 0 && error === false && (
                <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthday Date</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                  </tr>
                </thead>
          
                <tbody>
                  {table.results.map(person => (
                    <tr
                      data-cy="person"
                      key={person.id}
                    >
                      <td>{person.name}</td>
                      <td>{person.email}</td>
                      <td>{person.birthday_date}</td>
                      <td>{person.phone_number}</td>
                      <td>{person.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {table.results.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}