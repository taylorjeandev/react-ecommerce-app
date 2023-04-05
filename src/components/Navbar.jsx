import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex justify="space-around">
      <Box as="li">
        <Link to={"/"}>Shop</Link>
      </Box>
      <Box as="li">
        <Link to={"/cart"}>Cart</Link>
      </Box>
    </Flex>
  );
}
