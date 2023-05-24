import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import im from './welco.png';

const WelcomePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Save the user data to local storage
    if (name && password) {
      // Save the user data to local storage
      localStorage.setItem("userData", JSON.stringify({ name, password }));
      // Set sign-up success to true
      setIsSignUpSuccess(true);
      // Clear input values
      setName("");
      setPassword("");
      // const bt = document.querySelector('.btn2');
      // bt.style.visibility = 'visible';
    } else {
      window.alert("Fill in the blanks above first.");
    }
    // Set sign-up success to true
  };

  const handleSignIn = () => {
    // Redirect to the sign-in page
    navigate("/signin");
  };
  

  return (
    <>
      <div className="welcome-page">
        <img src={im} alt="Welcome" />
        <h1>Welcome to Our Web Application</h1>
        <p>Explore the world of programming and technology</p>
      </div>
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={
            (e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
