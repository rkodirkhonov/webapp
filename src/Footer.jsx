import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear}. All rights reserved.</p>
      <p>rkodirkhonov</p>
      {/* <p>by rusdev</p> */}
    </footer>
  );
}

export default Footer;
