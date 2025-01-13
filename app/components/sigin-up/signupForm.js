import React, { useState } from "react";
import UserPool from "@/UserPool";
import GreenLogo from '../../../assets/GreenLogo.png'
import PurpleLogo from '../../../assets/PurpleLogo.png';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null); // New state for error messages
    const [loading, setLoading] = useState(false); // New state for loading
    const router = useRouter();

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when form is submitted

        UserPool.signUp(email, password, [
            {
                Name: "given_name",
                Value: firstName,
            },
            {
                Name: "family_name",
                Value: lastName,
            }
        ], null, (err, data) => {
            setLoading(false); // Reset loading state

            if (err) {
                console.error(err);
                setError(err.message); // Update error state
            } else {
                console.log("onSuccess: ", data);
                router.push("/confirm-account");
            }
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
                            alt="Logo"
                            className="dark:hidden"
                        />
                        <Image 
                            src={GreenLogo} 
                            width={140}
                            height={32}
                            alt="Logo"
                            className="hidden dark:block"
                        />
                    </a>
                    <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Create your Account
                    </h1>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        Start your website in seconds. Already have an account? <a href="login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>.
                    </p>
                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                    <form className="mt-4 space-y-6 sm:mt-6" onSubmit={onSubmit}>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
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
                        </div>
                        <div className="flex items-center">
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="space-y-3">
                            <a href="#" className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_13183_10121)">
                                        <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                                        <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.96978 14.0915 5.96978 10.2304C5.96978 9.12675 6.30522 8.07353 6.93134 7.28982C4.84632 7.94969 3.20976 9.65212 2.61268 11.7053C1.81857 14.0225 2.61353 16.6364 5.21432 17.5832C5.68263 18.0406 6.25387 18.4673 6.87339 18.7646C7.4939 19.0608 8.13694 19.2368 8.78794 19.2368C6.96309 19.8599 5.02793 20.0006 3.40779 20.0006C3.35693 20.0006 3.30751 20.0006 3.25689 20.0006H1.81671C1.22519 20.0006 0.860352 19.5866 0.860352 19.0287C0.860352 18.5492 1.25711 18.1348 1.81249 18.1348H3.25689C3.30751 18.1348 3.35693 18.1348 3.40779 18.1348C5.02077 18.1348 6.52952 17.5832 7.5956 16.7036C8.32414 15.9486 8.89248 15.0718 9.25782 14.1092C9.64723 15.9324 11.4735 16.6362 12.6784 16.6362C13.7823 16.6362 14.4699 16.0637 14.7466 15.7324H14.8503V19.0279C14.8503 19.5867 14.4854 20.0007 13.8939 20.0007C10.5879 20.0007 10.7019 20.0006 10.7019 20.0006Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13183_10121">
                                            <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                Sign up with Google
                            </a>
                            <button type="submit" className={`w-full inline-flex items-center justify-center py-2.5 px-5 mb-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create an account'}
                            </button>
                        </div>
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

export default SignupForm;
