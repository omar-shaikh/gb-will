"use client";
import React, { useState, useEffect } from 'react';

const FetchUserDetails = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStoredEmail = () => {
      try {
        const storedUserDetails = localStorage.getItem("userDetails");
        if (storedUserDetails) {
          const userDetails = JSON.parse(storedUserDetails);
          if (userDetails.email) {
            setEmail(userDetails.email);
          } else {
            console.error("Email not found in userDetails");
          }
        }
      } catch (error) {
        console.error("Error parsing userDetails from local storage:", error);
      }
    };
    getStoredEmail();
  }, []);

  const handleFetchData = async () => {
    if (!email) {
      console.error("Email field is empty");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://l2x3x5e610.execute-api.us-west-1.amazonaws.com/dev/user/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching user details: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched User Details:", data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      handleFetchData(); // Automatically fetch details when email is set
    }
  }, [email]);

  return null; // This component doesn't render anything
};

export default FetchUserDetails;
