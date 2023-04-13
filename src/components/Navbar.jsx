import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  return (
    <Flex justify="space-around">
      <Box as="li">
        <Link to={"/shop"}>Shop</Link>
      </Box>
      <Box>
        {user ? null : location.pathname ===
          "/signup" ? null : location.pathname ===
          "/login" ? null : location.pathname === "/" ? null : (
          <Link to={"/signup"}>Signup</Link>
        )}
      </Box>
      <Box as="li">
        <Link to={"/cart"}>Cart</Link>
      </Box>
    </Flex>
  );
}
