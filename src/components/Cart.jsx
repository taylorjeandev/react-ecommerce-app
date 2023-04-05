import { useContext } from "react";
import { ShopContext } from "../App";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Cart({ removeItem }) {
  const { addedItems } = useContext(ShopContext);

  const itemsInCart = addedItems.map((item, index) => {
    return (
      <div key={index} className="cart">
        <img src={item.image} alt={item.title} />

        <p>{item.title}</p>
        <p>{item.price}</p>
        <DeleteIcon boxSize={6} onClick={(e) => removeItem(item.id)} />
      </div>
    );
  });

  return <div className="cart">{itemsInCart}</div>;
}
