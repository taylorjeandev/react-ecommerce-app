import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/shop");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      console.log(e);
      onSignup(e);
    }
  }

  return (
    <>
      <main className="form">
        <FormControl m={2} maxW="350px" isRequired onSubmit={onSignup}>
          <div>
            <FormLabel htmlFor="email-address">Email address</FormLabel>
            <Input
              mb={1}
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              id="signupEmailAddress"
            />
          </div>

          <div>
            <FormLabel m={2} htmlFor="password">
              Password
            </FormLabel>
            <Input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              id="signupPassword"
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </div>
          <div>
            <Button m={6} color="black" onClick={onSignup}>
              Sign up
            </Button>
          </div>
        </FormControl>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="bold">Sign in</span>
          </Link>
        </p>
      </main>
    </>
  );
};

export default Signup;
