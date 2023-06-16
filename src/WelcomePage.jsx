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
        <p>"The best way to learn programming is by doing it." - Grace Hopper</p>
        <p>"Programming is like building a house. You need a solid foundation, good materials, and a plan." - Donald Knuth</p>
        <p>"Programming is not about writing code. It's about solving problems." - Eric Lippert</p>
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
      <p className="tt">Your data will be stored in the browser's local storage. This means that it will be saved on your device and will not be sent to any third-party servers.</p>
      <p className="tt">You can check your data at any time by opening the browser's console and typing localStorage.userData.</p>
    </>
  );
};

export default WelcomePage;
