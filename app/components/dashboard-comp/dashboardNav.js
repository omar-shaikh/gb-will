'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GreenLogo from '../../../assets/GreenLogo.png';
import PurpleLogo from '../../../assets/PurpleLogo.png';
import Link from 'next/link';
import SmallGreenLogo from '../../../assets/SmallGreenLogo.png';
import SmallPurpleLogo from '../../../assets/SmallPurpleLogo.png';
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from '@/UserPool';

const DashboardNav = () => {
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
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">  
          <Image 
            src={PurpleLogo} 
            width={170}   
            height={32}  
            alt="Logo"
            className="dark:hidden hidden sm:block"  
          />
          <Image 
            src={GreenLogo} 
            width={170}   
            height={32}  
            alt="Logo"
            className="hidden dark:sm:block sm:hidden"  
          />
          <Image 
            src={SmallPurpleLogo} 
            width={40}   
            height={40}  
            alt="Logo"
            className="dark:hidden block sm:hidden"  
          />
          <Image 
            src={SmallGreenLogo} 
            width={40}   
            height={40}  
            alt="Logo"
            className="hidden dark:block sm:dark:hidden sm:hidden"  
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <span className="text-black dark:text-white mr-5">{givenName} {familyName}</span> {/* Display full name */}
          <button type="button" className="flex text-sm bg-gray-150 dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          </button>
          {/* Dropdown menu */}
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{/*HERE*/}</span> {/* Show user's full name */}
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
          </div>
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
