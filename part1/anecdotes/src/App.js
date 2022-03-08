import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const addVote = () => {
    const copy = [...points];
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
  };

  const handleClick = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  };

  const mostVotesIndex = points.indexOf(Math.max(...points));

  return (
    <>
      <h1>Anecdotes of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={addVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdotes with most votes</h1>
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>has {points[mostVotesIndex]} votes</div>
    </>
  );
};

export default App;
