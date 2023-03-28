const Card = ({ product, addItem }) => {
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
