"use client";

import React from "react";
import { useState,useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from '@/UserPool';
const CardGrid = () => {

  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
      const fetchUserAttributes = () => {
          const user = UserPool.getCurrentUser();

          if (user) {
              user.getSession((err, session) => {
                  if (err) {
                      console.error("Session error:", err);
                      return;
                  }

                  user.getUserAttributes((err, attributes) => {
                      if (err) {
                          console.error("Error fetching user attributes:", err);
                      } else {
                          attributes.forEach(attribute => {
                              if (attribute.getName() === "given_name") {
                                  setGivenName(attribute.getValue());
                              }
                              if (attribute.getName() === "family_name") {
                                  setFamilyName(attribute.getValue());
                              }
                          });
                      }
                  });
              });
          }
      };

      fetchUserAttributes();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {/* Card 1 */}
      <section
        className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow w-full md:w-[31%] p-6  dark:border-gray-700 dark:bg-gray-800 "
      >
        <div className = "my-5">
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Islamic Will
        </h5>
        <div className = "my-10">
        </div>
        <img
          className="object-cover w-50 rounded-lg h-96 md:h-auto mb-4"
          src="https://shariawiz.com/assets/v2_site/will-img-50784c7e14be147ef9d8eeb46fb7a16ddecb2cf97eadbf2a48dbd83204203854.svg"
          alt="Islamic Will"
        />
        <div className = "my-3">
        </div>
        {/* Price text */}
        <h1 className="text-4xl font-extrabold text-green-500 dark:text-green-400 mb-4">
          Free
        </h1>

        <div className = "my-10">
        </div>

        {/* description text */}
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          Also includes Marital Waiver/Community Property Agreement
        </p>

        <div className = "my-3">
        </div>

        {/* Get started button */}
        <button 
        href="#" 
        className="inline-flex w-full justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-md bg-dark-purple  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get started
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>

        <div className = "my-2">
        </div>

        {/* Learn more button */}
        <button 
        href="#" 
        className="inline-flex w-full text-dark-purple dark:text-light-green justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg   focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Learn more
        </button>

        <div className = "my-3">
        </div>
      </section>

      {/* Card 2 */}
      <section
        className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow w-full md:w-[31%] p-6  dark:border-gray-700 dark:bg-gray-800 "
      >
        <div className = "my-5">
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Individual Islamic Trust
        </h5>
        <div className = "my-10">
        </div>
        <img
          className="object-cover w-50 rounded-lg h-96 md:h-auto mb-4"
          src="https://shariawiz.com/assets/v2_site/waqf-img-53c3c959f7ffaca7fdde1c08b028d78d132fe7659cc1ae6ae78341bd15478c2e.svg"
          alt="Islamic Will"
        />
        <div className = "my-3">
        </div>
        {/* Price text */}
        <h1 className="text-4xl font-extrabold text-green-500 dark:text-green-400 mb-4">
          Free
        </h1>

        <div className = "my-10">
        </div>

        {/* description text */}
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          Also includes Pour-Over Will, Certification of Trust, Trust Funding Guide, and Marital Waiver/Community Property Agreement
        </p>

        <div className = "my-3">
        </div>

        {/* Get started button */}
        <button 
        href="#" 
        className="inline-flex w-full justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-md bg-dark-purple  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get started
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>

        <div className = "my-2">
        </div>

        {/* Learn more button */}
        <button 
        href="#" 
        className="inline-flex w-full text-dark-purple dark:text-light-green justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg   focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Learn more
        </button>

        <div className = "my-3">
        </div>
      </section>

      {/* Card 3 */}
      <section
        className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow w-full md:w-[31%] p-6  dark:border-gray-700 dark:bg-gray-800 "
      >
        <div className = "my-5">
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Islamic Prenuptial Agreement
        </h5>
        <div className = "my-10">
        </div>
        <img
          className="object-cover w-50 rounded-lg h-96 md:h-auto mb-4"
          src="https://shariawiz.com/assets/v2_site/waqf-img-53c3c959f7ffaca7fdde1c08b028d78d132fe7659cc1ae6ae78341bd15478c2e.svg"
          alt="Islamic Will"
        />
        <div className = "my-3">
        </div>
        {/* Price text */}
        <h1 className="text-4xl font-extrabold text-green-500 dark:text-green-400 mb-4">
          Free
        </h1>

        <div className = "my-10">
        </div>

        {/* description text */}
        <p className="font-normal text-gray-700 dark:text-gray-300 text-center">
          Also includes Muslim Marriage Contract and Islamic Wills
        </p>

        <div className = "my-3">
        </div>

        {/* Get started button */}
        <button 
        href="#" 
        className="inline-flex w-full justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-md bg-dark-purple  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get started
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>

        <div className = "my-2">
        </div>

        {/* Learn more button */}
        <button 
        href="#" 
        className="inline-flex w-full text-dark-purple dark:text-light-green justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg   focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Learn more
        </button>

        <div className = "my-3">
        </div>
      </section>
    </div>
  );
};

export default CardGrid;
