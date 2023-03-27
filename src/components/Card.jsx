import { useEffect, useState } from "react";

const Card = ({ product, addItem, removeItem, addedItems }) => {
  // const [isAdded, setIsAdded] = useState(true);
  // const item = addedItems.filter((addedItem) => addedItem.id == product.id);

  // useEffect(() => {
  //   item.length == 0 ? setIsAdded(true) : setIsAdded(false);
  // }, [item]);

  return (
    <div className="card">
      <img src={product.image} alt="" />
      <div>
        <h2>{product.category}</h2>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
      </div>
      <div className="card-price-add">
        <span>Price : ${product.price}</span>
        <button
          // className={isAdded ? "add-item-btn" : "remove-item-btn"}
          onClick={() => {
            addItem(product);
            // isAdded ? addItem(product) : removeItem(product);
            // setIsAdded(!isAdded);
          }}
        >
          Add{/* {isAdded ? "ADD " : "CANCEL"} */}
        </button>
      </div>
    </div>
  );
};

export default Card;
