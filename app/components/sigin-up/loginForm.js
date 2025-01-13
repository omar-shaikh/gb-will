import React, { useState } from "react";
import UserPool from "@/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import GreenLogo from '../../../assets/GreenLogo.png';
import PurpleLogo from '../../../assets/PurpleLogo.png';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                // Redirect to dashboard or another page
                router.push("/dashboard");
                
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
                alert(`Login failed: ${err.message}`);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
                // Handle new password requirement (if applicable)
            },
        });
    };

    return (
        <section className="mt-20 dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
                <div className="w-full p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
                    <a href="#" className="inline-flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        <Image 
                            src={PurpleLogo} 
                            width={140}
                            height={32}
                            alt="Purple Logo"
                            className="dark:hidden"
                        />
                        <Image 
                            src={GreenLogo} 
                            width={140}
                            height={32}
                            alt="Green Logo"
                            className="hidden dark:block"
                        />
                    </a>
                    <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Login
                    </h1>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        Don&apos;t have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>.
                    </p>
                    <form className="mt-4 space-y-6 sm:mt-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="mr-auto place-self-center lg:col-span-6">
                    <Image
                        className="hidden mx-auto lg:flex"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
                        alt="Illustration"
                        width={500} // Adjust this width as necessary
                        height={300} // Adjust this height as necessary
                    />
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
