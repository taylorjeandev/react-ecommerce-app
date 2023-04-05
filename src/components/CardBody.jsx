import ProductCard from "./ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";
import { Box } from "@chakra-ui/react";

const CardBody = ({ products, addItem, removeItem, filteredList }) => {
  const { selectedCategory } = useContext(ShopContext);

  return (
    <Box className="grid">
      {selectedCategory === "All"
        ? products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))
        : filteredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
    </Box>
  );
};

export default CardBody;
