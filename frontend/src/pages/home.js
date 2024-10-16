// Home.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../components/navbar'
import Products from '../components/Products'; // Adjust the import based on your file structure
import Footer from '../components/footer';
import { jwtDecode } from "jwt-decode";

//import './Home.css'; // Optional: CSS file for styling

const Home = () => {
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    // Function to get the token and decode it
    const getUserFromToken = () => {
      const token = Cookies.get('authToken'); // Get token from cookies
      if (token) {
        try {
          // Decode the token to get the user data
          const decodedToken = jwtDecode(token);
          setUser(decodedToken); // Set the user data in state
          console.log('Decoded User:', decodedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    getUserFromToken(); // Call the function to extract user data
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar user={user} /> {/* Pass the user to the Navbar */}

      {/* Product List */}
      <Products />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
