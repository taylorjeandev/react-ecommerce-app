import Search from "./Search";
import Category from "./Category";
import CardBody from "./CardBody";
import { useContext } from "react";
import { ShopContext } from "../App";

export default function Shop({
  changingSearchData,
  handleCategoryChange,
  filteredList,
  itemsFilter,
  addItem,
  removeItem,
}) {
  const { items, selectedCategory, categories, searchValue } =
    useContext(ShopContext);

  return (
    <div>
      {selectedCategory == "All" && (
        <Search
          products={items}
          value={searchValue}
          onChangeData={changingSearchData}
        />
      )}
      <Category
        category={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="grid">
        <CardBody
          categories={categories}
          selectedCategory={selectedCategory}
          filteredList={filteredList}
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}
