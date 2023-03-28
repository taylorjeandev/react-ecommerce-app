import Card from "./Card";
import { useContext } from "react";
import { ShopContext } from "../App";

const CardBody = ({ products, addItem, removeItem, filteredList }) => {
  const { selectedCategory } = useContext(ShopContext);

  return (
    <div className="grid">
      {selectedCategory === "All"
        ? products.map((product) => (
            <Card
              key={product.id}
              product={product}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))
        : filteredList.map((product) => (
            <Card
              key={product.id}
              product={product}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
    </div>
  );
};

export default CardBody;
