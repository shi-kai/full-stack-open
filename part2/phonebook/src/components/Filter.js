const Filter = (props) => {
  const { keyword, hanldeKeywordChange } = props;

  return (
    <div>
      filter shown with
      <input value={keyword} onChange={hanldeKeywordChange} />
    </div>
  );
};

export default Filter;
