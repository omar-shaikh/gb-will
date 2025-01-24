import { useState, useEffect } from "react";

export default function Calculation({ onBack }) {
  const [email, setEmail] = useState("");

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

  const onCalculate = async () => {
    if (!email) {
      alert("Email is required to calculate shares.");
      return;
    }

    const apiUrl = `https://oqqqxnr6rf.execute-api.us-west-1.amazonaws.com/dev/gb-will-calculator/${email}`;

    try {
      // Call the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("API Response Error:", errorResponse);
        throw new Error(`API call failed with status: ${response.status}`);
      }

      // Parse the response
      const data = await response.json();

      // Handle the response
      console.log("Calculation successful:", data);
      alert("Calculation completed successfully!");
    } catch (error) {
      console.error("Error during calculation:", error);
      alert("An error occurred while calculating. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Calculation</h2>
      <form>
        {/* Add form fields here */}
        <button
          type="button"
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded me-4"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onCalculate}
          className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-white rounded-lg bg-dark-purple hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}
