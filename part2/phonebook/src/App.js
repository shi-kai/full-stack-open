import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const hanldeKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => {
      return person.name === newName;
    });

    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setSuccessMessage(`Added ${returnPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
        setNewName("");
        setNewNumber("");
      });
    } else {
      const isConfirm = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with the new one?`
      );

      if (isConfirm) {
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((returnPerson) => {
            setPersons(
              persons.map((item) =>
                item.id === person.id ? returnPerson : item
              )
            );
            setSuccessMessage(`Updated ${returnPerson.name} number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 2000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${person.name} was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
            setPersons(persons.filter(({ id }) => id !== person.id));
          });
      }
    }
  };

  const deletePerson = (person) => {
    const isConfirm = window.confirm(`Delete ${person.name}?`);

    if (isConfirm) {
      personService.remove(person.id).then((response) => {
        setPersons(persons.filter(({ id }) => id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter keyword={keyword} hanldeKeywordChange={hanldeKeywordChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        keyword={keyword}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
