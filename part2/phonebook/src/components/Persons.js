const Persons = (props) => {
  const { persons, keyword, deletePerson } = props;

  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(keyword.toLowerCase());
        })
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
              <button
                onClick={() => {
                  deletePerson(person);
                }}
              >
                delete
              </button>
            </p>
          );
        })}
    </div>
  );
};

export default Persons;
