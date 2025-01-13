"use client";
import React, { useState } from 'react';

const FetchUserDetails = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

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

  return (
    <div className="fetch-user-details">
      <h2>Fetch User Details</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleInputChange}
        className="email-input"
      />
      <button
        onClick={handleFetchData}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? 'Loading...' : 'Fetch Details'}
      </button>
    </div>
  );
};

export default FetchUserDetails;
