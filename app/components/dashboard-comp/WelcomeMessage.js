"use client";

import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";


const WelcomeMessage = () => {

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
      const getStoredFirstName = () => {
          try {
              const storedUserDetails = localStorage.getItem("userDetails");
              if (storedUserDetails) {
                  const userDetails = JSON.parse(storedUserDetails);
                  if (userDetails.given_name) {
                      setFirstName(userDetails.given_name);
                  } else {
                      console.error("First name not found in userDetails");
                  }
              }
          } catch (error) {
              console.error("Error parsing userDetails from local storage:", error);
          }
      };

      getStoredFirstName();
  }, []);

  return (
    <div className="">
      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center w-full">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white whitespace-nowrap">
              Hello {firstName}!
            </h1>
            <p className="mb-8 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white whitespace-nowrap">
              Welcome to your{' '}
              <span className="text-dark-purple dark:text-light-green">Goodbricks</span> dashboard.
            </p>
            
            <div className="flex gap-4 mt-3">
              {/* Free Calculation Button */}
              <Link
                href="dashboard/willFormPage"
                className="inline-flex w-[50%] justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-dark-purple focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Start Free Calculation
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>

              {/* Learn More Button */}
              <button
                href="#"
                className="inline-flex w-[25%] justify-center items-center py-3 px-5 text-base font-medium text-center text-dark-purple dark:text-light-green rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Learn more
              </button>
            </div> 
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeMessage;
