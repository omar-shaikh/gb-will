import React, { forwardRef, useImperativeHandle } from "react";

const SaveUserDetails = forwardRef((_, ref) => {
  const saveData = async (formattedData) => {
    const apiUrl = `https://l2x3x5e610.execute-api.us-west-1.amazonaws.com/dev/user/${formattedData.email}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData.message);
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };
  

  useImperativeHandle(ref, () => ({
    saveData,
  }));

  return null; // This component does not render anything visually
});

export default SaveUserDetails;
