const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => <p>total of {sum} exercises</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => {
    return <Part key={part.id} part={part} />;
  });
};

const Course = (props) => {
  const {
    course: { name, parts },
  } = props;

  const sum = parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
