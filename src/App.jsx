import { useState, useEffect, createContext, useMemo } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import Navbar from "./components/Navbar";
import "./App.css";
import SingleProduct from "./components/SingleProduct";

export const ShopContext = createContext(null);

function App() {
  const [items, setItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const [addedItems, setAddedItems] = useState(() => {
    const data = JSON.parse(localStorage.getItem("itemsInCart"));
    if (data !== null) {
      return data;
    }
  });

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

  // Store items in local storage
  useEffect(() => {
    localStorage.setItem("itemsInCart", JSON.stringify(addedItems));
  }, [addedItems]);

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
    if (addedItems.includes(item)) {
      return null;
    }
    const itemArr = addedItems;
    setAddedItems([...itemArr, item]);
  }

  function removeItem(id) {
    const newItems = addedItems.filter((item) => item.id !== id);
    setAddedItems(newItems);
  }

  return (
    <div className="container">
      <ShopContext.Provider
        value={{
          items,
          categories,
          selectedCategory,
          searchValue,
          addedItems,
        }}
      >
        <Heading as="h1">Ecommerce</Heading>
        <Navbar />
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
          <Route path="/cart" element={<Cart removeItem={removeItem} />} />
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
