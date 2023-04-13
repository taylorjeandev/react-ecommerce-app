import { useState, useEffect, createContext, useMemo } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { Button, Heading, Avatar } from "@chakra-ui/react";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";
import SingleProduct from "./components/SingleProduct";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const ShopContext = createContext(null);

function App() {
  const [items, setItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [addedItems, setAddedItems] = useState(() => {
    const data = JSON.parse(localStorage.getItem("itemsInCart"));
    if (data !== null) {
      return data;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetch("https://fakestoreapi.com/products/");
      const items = await products.json();
      setItem(items);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const categories = await fetchedCategories.json();
      setCategories(categories);
    };
    fetchCategories().catch(console.error);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
        {user ? (
          <Avatar />
        ) : (
          <Heading as="h1" mb={6}>
            Ecommerce
          </Heading>
        )}
        {user ? (
          <Button color="black" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
        <Navbar handleLogout={handleLogout} user={user} />

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route
            path="shop"
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
          <Route path="signup" element={<Signup user={user} />} />
          <Route path="login" element={<Login user={user} />} />
        </Routes>
        <Outlet />
      </ShopContext.Provider>
    </div>
  );
}

export default App;
