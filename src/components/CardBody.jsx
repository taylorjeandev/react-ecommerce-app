import Card from "./Card";

const CardBody = ({
  products,
  addItem,
  removeItem,
  addedItems,
  selectedCategory,
}) => {
  products.map((product) => (product.isAdded = true));
  return (
    <div className="grid">
      {products.map((product) => (
        <Card
          key={product.id}
          selectedCategory={selectedCategory}
          product={product}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      ))}
    </div>
  );
};

export default CardBody;
