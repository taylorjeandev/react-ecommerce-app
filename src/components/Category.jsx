const Category = ({ category, handleCategoryChange }) => {
  return (
    <div className="filter-container">
      <div>Filter by Category:</div>
      <div>
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {category.map((category, index) => {
            return (
              <option
                key={index}
                onClick={handleCategoryChange}
                value={category}
              >
                {category}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Category;
