import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";

const ProductCard = ({ product, addItem }) => {
  const { items } = useContext(ShopContext);
  return (
    <Card>
      <CardHeader>
        {" "}
        <Link
          to={`${product.id}`}
          state={{
            items: items,
          }}
        >
          <img src={product.image} alt="" />{" "}
        </Link>
      </CardHeader>

      <CardBody>
        <Text>{product.title}</Text>
      </CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter>
        <HStack>
          <Text>Price : ${product.price}</Text>
          <Button
            colorScheme="blackAlpha"
            m="10px"
            onClick={() => {
              addItem(product);
            }}
          >
            Add
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
