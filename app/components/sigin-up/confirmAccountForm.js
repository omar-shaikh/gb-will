"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import UserPool from "@/UserPool";
import { CognitoUser } from "amazon-cognito-identity-js"; // Import CognitoUser
import GreenLogo from '../../../assets/GreenLogo.png';
import PurpleLogo from '../../../assets/PurpleLogo.png'
import Image from "next/image";

const ConfirmAccountForm = () => {
    const [email, setEmail] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const router = useRouter(); // Initialize useRouter

    const onSubmit = (event) => {
        event.preventDefault();
        
        // Create a CognitoUser instance with the provided email
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        // Confirm the account using AWS Cognito
        user.confirmRegistration(confirmationCode, true, (err) => {
            if (err) {
                console.error(err);
                alert(err.message || JSON.stringify(err)); // Alert error message to user
                return;
            }
            console.log("Account confirmed!");
            // Redirect to a success page or login page after confirmation
            router.push("/login");
        });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image 
                        src={PurpleLogo} 
                        width={140}   // Replace with the actual width in pixels
                        height={32}  // Replace with the actual height in pixels
                        alt="Logo"
                        className="dark:hidden"  // Hide this in dark mode
                    />
                    <Image 
                        src={GreenLogo} 
                        width={140}   // Replace with the actual width in pixels
                        height={32}  // Replace with the actual height in pixels
                        alt="Logo"
                        className="hidden dark:block"  // Show this only in dark mode
                    />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Confirm your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmation-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmation Code</label>
                                <input 
                                    type="text" 
                                    name="confirmation-code" 
                                    id="confirmation-code" 
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    placeholder="Enter your confirmation code" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Confirm Account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already confirmed? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmAccountForm;
