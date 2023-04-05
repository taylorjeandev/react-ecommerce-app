import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";

export default function SingleProduct({ addItem }) {
  const { items } = useContext(ShopContext);
  const { id } = useParams();

  return (
    <div className="card">
      <img src={items[id - 1].image} alt="" />
      <div>
        <h2>{items[id - 1].category}</h2>
        <h4>{items[id - 1].title}</h4>
        <p>{items[id - 1].description}</p>
      </div>
      <div className="card-price-add">
        <span>Price : ${items[id - 1].price}</span>
        <button
          onClick={() => {
            addItem(items[id]);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
