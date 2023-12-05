import "./App.css";
import contactsData from "./contacts.json";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  const addRandomContact = () => {
    const remainingData = contactsData.filter(
      (element) => !contacts.includes(element)
    );
    if (remainingData.length !== 0) {
      const randomIndex = Math.floor(Math.random() * remainingData.length);

      setContacts((prevState) => [remainingData[randomIndex], ...prevState]);
    }
  };

  const sortByPopularity = () => {
    setContacts((prevContacts) =>
      [...prevContacts].sort((a, b) => {
        console.log(a);
        return b.popularity - a.popularity;
      })
    );
  };

  const sortByName = () => {
    setContacts((prevContacts) =>
      [...prevContacts].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  };

  const deleteContact = (contactId) => {
    const restContacts = contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts(restContacts);
  };
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort By Popularity</button>
      <button onClick={sortByName}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={uuidv4()}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    width={150}
                    height={150}
                    alt="Contact Person"
                  />
                </td>
                <td>{contact.name}</td>
                <td>{Math.floor(contact.popularity)}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🌟"}</td>
                <td>
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default App;
