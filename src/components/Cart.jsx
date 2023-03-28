import { useContext } from "react";
import { ShopContext } from "../App";

export default function Cart() {
  const {} = useContext(ShopContext);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <h1> Your Shopping Cart is Empty</h1>
    </div>
  );
}
