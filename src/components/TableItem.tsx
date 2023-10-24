import { useState, FormEvent, useContext } from 'react';
import { Person } from '../types';
import { getTable, updatePerson } from '../api';
import { MainContext } from './MainContext';

type Props = {
  person: Person
}

export const TableItem: React.FC<Props> = ({ person }) => {
  const { setTable, itemOffset } = useContext(MainContext);

  const [clicked, setClicked] = useState(false);

  const [editingName, setEditingName] = useState(person.name);
  const [editingEmail, setEditingEmail] = useState(person.email);
  const [editingBDay, setEditingBDay] = useState(person.birthday_date);
  const [editingNumber, setEditingNumber] = useState(person.phone_number);
  const [editingAddress, setEditingAddress] = useState(person.address);

  const handleSave = (
    event: FormEvent,
    name: string,
    email: string,
    birthday_date: string,
    phone_number: string,
    address: string,
    id: number
  ) => {
    event.preventDefault();

    if (name === person.name
      && email === person.email
      && birthday_date === person.birthday_date
      && phone_number === person.phone_number
      && address === person.address) {
      setClicked(false);

      return;
    }

    updatePerson(id, {
      name,
      email,
      birthday_date,
      phone_number,
      address
     })
      .then(() => {
        getTable(itemOffset)
          .then((table) => {
            setTable(table);
            setClicked(false);
          })
          .catch(() => {
            setClicked(false);
            throw new Error('Could not load the table');
          });
      })
      .catch(() => {
        setClicked(false);
        throw new Error('Cound not update person information');
      });
    return;
  }

  return (
    <tr
      key={person.id}
      onClick={() => {
        setClicked(true)
      }}
    >
      {clicked ? (
        <>
          <td>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <input
                type="text"
                value={editingName}
                autoFocus
                onChange={event => {
                  setEditingName(event.target.value)
                }}
              />
            </form>
          </td>

          <td>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <input
                type="text"
                value={editingEmail}
                onChange={event => {
                  setEditingEmail(event.target.value)
                }}
              />
            </form>
          </td>

          <td>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <input
                type="text"
                value={editingBDay}
                onChange={event => {
                  setEditingBDay(event.target.value)
                }}
              />
            </form>
          </td>

          <td>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <input
                type="text"
                value={person.phone_number}
                onChange={event => {
                  setEditingNumber(event.target.value)
                }}
              />
            </form>
          </td>

          <td>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <input
                type="text"
                value={editingAddress}
                onChange={event => {
                  setEditingAddress(event.target.value)
                }}
              />
            </form>
          </td>

          <td>
            <button
              className="button is-success is-small"
              onClick={event =>
                handleSave(
                  event,
                  editingName,
                  editingEmail,
                  editingBDay,
                  editingNumber,
                  editingAddress,
                  person.id
                )}
            >
              Save
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{person.name}</td>
          <td>{person.email}</td>
          <td>{person.birthday_date}</td>
          <td>{person.phone_number}</td>
          <td>{person.address}</td>
        </>
      )}
    </tr>
  )
}