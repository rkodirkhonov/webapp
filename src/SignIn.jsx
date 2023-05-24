import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Retrieve the user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.name === name && userData.password === password) {
      // Successful sign-in, perform any necessary action (e.g., redirect, set authentication state)
      setIsError(false);
      // Redirect to the authenticated page or perform any other necessary action
      navigate("/home");
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {isError && <p>Invalid credentials</p>}
    </div>
  );
};

export default SignIn;
