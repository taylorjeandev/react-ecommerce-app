import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";

const Card = ({ product, addItem }) => {
  const { items } = useContext(ShopContext);
  return (
    <div className="card">
      <Link
        to={`${product.id}`}
        state={{
          items: items,
        }}
      >
        <img src={product.image} alt="" />
      </Link>
      <div>
        <h2>{product.category}</h2>
        <h4>{product.title}</h4>
      </div>
      <div className="card-price-add">
        <span>Price : ${product.price}</span>
        <button
          onClick={() => {
            addItem(product);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Card;
