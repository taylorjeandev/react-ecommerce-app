import { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import CardBody from "./components/CardBody";
import Category from "./components/Category";
import "./App.css";

function App() {
  const [items, setItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      return item.category === selectedCategory || selectedCategory === "";
    });
    setItem(filteredItems);
  }, [selectedCategory]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }

  return (
    <div className="container">
      <Header />
      <Search
        products={items}
        value={searchValue}
        onChangeData={changingSearchData}
      />
      <Category
        category={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="grid">
        <CardBody
          categories={selectedCategory}
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
}

export default App;
