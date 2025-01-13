import React, { useEffect, useState } from 'react';
import UserPool from '@/UserPool';
import Link from 'next/link';

const LambdaCalculator = () => {
    const [email, setEmail] = useState("");
    const [inputs, setInputs] = useState({
        netWorth: '',
        H: '',
        W: '',
        S: '',
        D: '',
        SS: '',
        SD: '',
        SSS: '',
        SSD: '',
        F: '',
        FF: '',
        FFF: '',
        FFFF: '',
        FM: '',
        M: '',
        MM: '',
        RB: '',
        RS: '',
        PB: '',
        PS: '',
        MT: '',
        HM: 'no',
    });
    const [result, setResult] = useState(null); 
    const [userData, setUserData] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    const lambdaApiUrl = 'https://zboghkosc8.execute-api.us-west-1.amazonaws.com/dev/';

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
                                if (attribute.getName() === "email") {
                                    setEmail(attribute.getValue());
                                }
                            });
                        }
                    });
                });
            }
        };

        fetchUserAttributes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        
        const dataToSubmit = { ...inputs, email };
        setSuccessMessage(null); // Reset success message before submission

        try {
            const response = await fetch(lambdaApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: JSON.stringify(dataToSubmit) }),
            });

            if (response.ok) {
                const result = await response.json();
                const parsedResult = JSON.parse(result.body);
                setResult(parsedResult);
                setSuccessMessage("Success! Data has been saved."); // Set success message on successful submission
            } else {
                setResult({ error: `Error: ${response.status}` });
                setSuccessMessage(null); // Clear success message on error
            }
        } catch (error) {
            setResult({ error: `Error: ${error.message}` });
            setSuccessMessage(null); // Clear success message on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-11/12 md:w-7/12 lg:w-3/5 xl:w-2/5">
                <h1 className="text-xl font-bold mb-4 text-center">Lambda Function Calculator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        {Object.keys(inputs).map((key) => (
                            <div key={key}>
                                <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {key}:
                                </label>
                                <input
                                    type={key === 'netWorth' || key.startsWith('F') || key.startsWith('W') || key.startsWith('S') ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>
                </form>
                {/* Success message display */}
                {successMessage && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-4 md:p-5 text-center">
                                        <svg className="mx-auto mb-4 text-blue-600 w-[60px] h-[60px] dark:text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd"/>
                                    </svg>
                                        <h3 className="mb-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400">Success! Your data has been saved. Visit your dashboard to view your results.</h3>
                                        <Link 
                                        href="/dashboard"
                                        data-modal-hide="popup-modal" 
                                        className="text-white bg-blue-600 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                   )}
            </div>
        </div>
    );
};

export default LambdaCalculator;
