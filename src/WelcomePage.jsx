import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import mainImage from './welco.png';

const WelcomePage = () => {
  const [name, setName] = useState({
    value: "",
    isValid: true
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: true
  });
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName({
      value: e.target.value,
      isValid: e.target.value !== ""
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      value: e.target.value,
      isValid: e.target.value !== ""
    });
  };

  const handleSignUp = () => {
    if (name.value && password.value) {
      localStorage.setItem("userData", JSON.stringify({ name: name.value, password: password.value }));
      setIsSignUpSuccess(true);
      setName({ value: "", isValid: true });
      setPassword({ value: "", isValid: true });
    } else {
      setName({ ...name, isValid: name.value !== "" });
      setPassword({ ...password, isValid: password.value !== "" });
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="welcome-page">
        <h1>Web Application</h1>
        <p>Explore the world of programming and technology</p>
        <img src={mainImage} alt="Welcome" />
      </div>
      <div className="signUP">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name.value}
          onChange={handleNameChange}
          className={name.isValid ? "" : "invalid-input"}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password.value}
          onChange={handlePasswordChange}
          className={password.isValid ? "" : "invalid-input"}
          required
        />
        <button onClick={handleSignUp}>Sign Up</button>
        {isSignUpSuccess && (
          <p>Sign up successful! Please proceed to sign in.</p>
        )}
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </>
  );
};

export default WelcomePage;
