import { useState, useEffect, createContext, useMemo } from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import Card from "./components/Card";
import "./App.css";
import SingleProduct from "./components/SingleProduct";

export const ShopContext = createContext(null);

function App() {
  const [items, setItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

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

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  function getFilteredList() {
    if (selectedCategory === "All") {
      return setItem(items);
    } else {
      return items.filter((item) => item.category === selectedCategory);
    }
  }

  const filteredList = useMemo(getFilteredList, [selectedCategory, items]);

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
      <ShopContext.Provider
        value={{
          items,
          categories,
          selectedCategory,
          searchValue,
        }}
      >
        <h1>Telenor</h1>
        <nav>
          <li>
            <Link
              to={"/"}
              state={{
                items: items,
                category: categories,
                selectedCategory: selectedCategory,
                searchValue: searchValue,
              }}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to={"/cart"}
              state={{
                items: items,
                selectedCategory: selectedCategory,
                searchValue: searchValue,
              }}
            >
              Cart
            </Link>
          </li>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Shop
                handleCategoryChange={handleCategoryChange}
                changingSearchData={changingSearchData}
                getFilteredList={getFilteredList}
                filteredList={filteredList}
                itemsFilter={itemsFilter}
                addItem={addItem}
                removeItem={removeItem}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path=":id"
            element={<SingleProduct product={items} addItem={addItem} />}
          />
        </Routes>
        <Outlet />
      </ShopContext.Provider>
    </div>
  );
}

export default App;
