import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    console.log(e);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/shop");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      console.log(e);
      onLogin(e);
    }
  }

  return (
    <>
      <main className="form">
        <FormControl m={2} maxW="350px" isRequired onSubmit={onLogin}>
          <div>
            <FormLabel htmlFor="email-address">Email address</FormLabel>
            <Input
              m={1}
              id="loginEmailAddress"
              name="email"
              type="email"
              value={email}
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <FormLabel m={2} htmlFor="password">
              Password
            </FormLabel>
            <Input
              m={1}
              id="loginPassword"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </div>

          <div>
            <Button color="black" m={6} onClick={onLogin}>
              Login
            </Button>
          </div>
        </FormControl>

        <p className="text-sm text-white text-center">
          No account yet?{" "}
          <Link to="/signup">
            <span className="bold">Sign up</span>
          </Link>
        </p>
      </main>
    </>
  );
};

export default Login;
