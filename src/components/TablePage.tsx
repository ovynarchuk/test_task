import { useEffect, useState, useContext } from 'react';
import { getTable } from '../api';
import { Loader } from './Loader';
import { TableItem } from './TableItem';
import { MainContext } from './MainContext';
import ReactPaginate from 'react-paginate';

export const TablePage: React.FC = () => {
  const { table, setTable, itemOffset, setPageCount, handlePageClick, pageCount } = useContext(MainContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTable(itemOffset)
      .then(setTable)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
    setPageCount(Math.ceil(table.count / 10));
  }, [setTable, table.count, setPageCount, itemOffset]);

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
                      <TableItem person={person} key={person.id} />
                    ))}
                  </tbody>
                </table>
              )}

              {error && (
                <p className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {table.results.length === 0 && (
                <p>
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>

        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      
      <br />
      <br />
      <h2 className='title'>Fun section:</h2>
      <br />
      <h3 className='subtitle'>Brown is just orange with a contrast.</h3>
      <br />
      <h3 className='subtitle'>Do deaf people feel vibrations?</h3>
      <br />
      <h3 className='subtitle'>Seasons are just DLCs.</h3>
      <br />
      <h3 className='subtitle'>Bacon was used to make explosives during World War I.</h3>
      <br />
      <h2 className='title'>Something about me:</h2>
      <br />
      <h3 className='subtitle'>I love cars, motorcycles, guns and video games (obviously).</h3>
    </>
  );
}