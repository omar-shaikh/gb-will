"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DisplayUserData = () => {
  const [email, setEmail] = useState("");
  const [calcShares, setCalcShares] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://l2x3x5e610.execute-api.us-west-1.amazonaws.com/dev/user/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching user details: ${response.statusText}`);
        }

        const data = await response.json();
        setCalcShares(data.CalcShares || []);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Prepare data for Pie chart
  const pieChartData = {
    labels: calcShares.map((entry) => `${entry.firstName} ${entry.lastName}`),
    datasets: [
      {
        data: calcShares.map((entry) => parseFloat(entry.percentage)),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="flex">
      {/* Table Section */}
      <div className="w-2/3 p-4">
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Share
                </th>
                <th scope="col" className="px-6 py-3">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {calcShares.map((entry, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {entry.firstName} {entry.lastName}
                  </td>
                  <td className="px-6 py-4">{entry.share}</td>
                  <td className="px-6 py-4">{entry.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="w-1/3 p-4">
        <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Distribution
          </h5>
          <div className="py-6">
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserData;
