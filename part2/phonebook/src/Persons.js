const Persons = (props) => {
  const { persons, keyword } = props;

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
            </p>
          );
        })}
    </div>
  );
};

export default Persons;
