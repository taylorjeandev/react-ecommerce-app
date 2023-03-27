function Search({ value, onChangeData }) {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Enter product name"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
}

export default Search;
