import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        This web application is designed to showcase the implementation of a
        frontend and backend connection and provide a platform for practicing
        their working condition. The frontend of the application is built using
        React.js, a popular JavaScript library for building user interfaces.
        React.js allows for the creation of dynamic and interactive components,
        providing a seamless user experience.
      </p>
      <p>
        On the backend, we have utilized Node.js, a JavaScript runtime
        environment, along with Express.js, a web application framework for
        Node.js. Node.js allows us to run JavaScript on the server-side,
        enabling the development of scalable and efficient backend logic. With
        Express.js, we can easily define routes, handle HTTP requests, and
        connect to databases.
      </p>
      <p>
        Visitors to this web application can explore the practice implementation
        on the Home page. The Home page displays a collection of movies and
        allows users to search for specific movies using the provided search
        functionality. This demonstrates the frontend and backend connection,
        where the frontend requests and receives movie data from the backend
        server, enabling seamless interaction and data manipulation.
      </p>
      <p>
        We hope this web application serves as a useful learning resource for
        understanding the integration of frontend and backend technologies and
        provides a practical platform for honing your skills in web development.
        Enjoy exploring and experimenting with the functionality!
      </p>
    </div>
  );
}

export default About;
