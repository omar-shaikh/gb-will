// DirectFamily.js - saves to DynamoDB

import { useState, useEffect, useRef } from "react";
import SaveUserDetails from "./SaveUserDetails";

export default function DirectFamily({ onNext }) {
  const saveRef = useRef();
  // Questions for the wizard
  const questions = [
    "Are one or more of your parents living?",
    "Are you married and is your spouse living?",
    "Do you have any children?",
  ];

  // State to track user selection (Yes/No)
  const [selectedOption, setSelectedOption] = useState("");
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store answers to all questions
  const [answers, setAnswers] = useState({});
  // State to track additional inputs for detailed responses
  const [additionalInputs, setAdditionalInputs] = useState([]);
  // State for feedback messages after saving data to the database
  const [message, setMessage] = useState("");
  // State to store the user's email
  const [email, setEmail]  = useState("");

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

  console.log(email)

  // Get the current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  // Handle the Yes/No selection for the current question
  const handleSelection = (option) => {
    setSelectedOption(option);

    if (option === "Yes") {
      // Initialize input fields if the user answers "Yes"
      setAdditionalInputs([{ firstName: "", lastName: "", age: "", gender: "", relation: "" }]);
    } else {
      // Clear inputs and move to the next question if the user answers "No"
      setAdditionalInputs([]);
      handleNext();
    }
  };

  // Handle changes to input fields for additional details
  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };

    // Automatically set the relation based on gender and question context
    if (field === "gender") {
      let relation = "";
      if (currentQuestion === questions[0]) relation = value === "Male" ? "Father" : "Mother";
      else if (currentQuestion === questions[1]) relation = "Spouse";
      else if (currentQuestion === questions[2]) relation = value === "Male" ? "Son" : "Daughter";

      updatedInputs[index] = { ...updatedInputs[index], relation };
    }

    setAdditionalInputs(updatedInputs);
  };

  // Add a new input for additional details (e.g., another parent, spouse, or child)
  const addNewInput = () => {
    setAdditionalInputs([
      ...additionalInputs,
      { firstName: "", lastName: "", age: "", gender: "", relation: "" },
    ]);
  };

  // Function to handle deleting an input by index
  const handleDeleteInput = (index) => {
    const updatedInputs = additionalInputs.filter((_, i) => i !== index); // Remove the item at the specified index
    setAdditionalInputs(updatedInputs); // Update the state with the modified array
  };

  // Back button logic
  const onBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(""); // Reset the selection for the previous question
      setAdditionalInputs([]); // Clear inputs if any were added
    }
  };

  // Handle the "Next" button click, advancing through questions or saving data
  const handleNext = async () => {
    console.log("handleNext Func Called!")
    // Determine the current answer based on the user's selection.
    const currentAnswer =
      selectedOption === "Yes" ? additionalInputs : selectedOption;
  
    // Update the answers object with the current question's answers.
    const updatedAnswers = {
      ...answers, // Keep all existing answers.
      [currentQuestion]: [
        ...(answers[currentQuestion] || []), // Include previous answers for this question.
        ...(Array.isArray(currentAnswer) ? currentAnswer : []), // Add the new answer(s).
      ],
    };
  
    setAnswers(updatedAnswers); // Update state with all answers so far.
  
    // Check if this is the last question.
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setAdditionalInputs([]);
    } else {
      const formatData = (entries) =>
      entries.map(({ firstName, lastName, age }) => ({
        firstName,
        lastName,
        age,
      }));
 const formattedData = {
      "Father(s)": formatData(
        updatedAnswers["Are one or more of your parents living?"] || []
      ),
      "Mother(s)": formatData(
        updatedAnswers["Are one or more of your parents living?"] || []
      ),
      "Spouse(s)": formatData(
        updatedAnswers["Are you married and is your spouse living?"] || []
      ),
      "Son(s)": formatData(
        updatedAnswers["Do you have any children?"] || []
      ),
      "Daughter(s)": formatData(
        updatedAnswers["Do you have any children?"] || []
      ),
      email: email, // Replace with dynamic email if needed
    };

      // Calls SaveUserDetails component to save data
      saveRef.current.saveData(formattedData);

      onNext(formattedData); // Pass formatted data to the parent component if needed
    }
  };
  

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Direct Family</h2>
      <form>
        {/* Current question text */}
        <h2 className="text-xl font-bold mb-4">
        {additionalInputs.length === 0
          ? currentQuestion // Show question when on toggles
          : currentQuestion === "Are one or more of your parents living?"
          ? "Parent Details"
          : currentQuestion === "Are you married and is your spouse living?"
          ? "Spouse Details"
          : currentQuestion === "Do you have any children?"
          ? "Child Details"
          : "Details"}
      </h2>


        {/* Yes/No options */}
        {additionalInputs.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {/* Yes option */}
            <label className="cursor-pointer h-20 relative flex items-center gap-4 rounded-md bg-neutral p-2 hover:scale-105 transition-transform text-neutral-600 dark:text-neutral-300 dark:bg-blue-900 border border-neutral-300 dark:border-neutral-700 peer">
              <input
                type="radio"
                id="yes"
                aria-describedby="windowsDescription"
                className="peer h-12 w-12 ml-4 accent-blue-600"
                name="answer"
                value="Yes"
                checked={selectedOption === "Yes"}
                onChange={() => handleSelection("Yes")}
              />
              <span className="text-2xl text-black dark:text-white ml-4">Yes</span>
            </label>

            {/* No option */}
            <label className="cursor-pointer h-20 relative flex items-center gap-4 rounded-md bg-neutral p-2 hover:scale-105 transition-transform text-neutral-600 dark:text-neutral-300 dark:bg-blue-900 border border-neutral-300 dark:border-neutral-700 peer">
              <input
                type="radio"
                id="no"
                aria-describedby="windowsDescription"
                className="peer h-12 w-12 ml-4 accent-blue-600"
                name="answer"
                value="No"
                checked={selectedOption === "No"}
                onChange={() => handleSelection("No")}
              />
              <span className="text-2xl text-black dark:text-white ml-4">No</span>
            </label>
          </div>
        )}

        {/* Additional input fields for detailed responses */}
        {additionalInputs.map((input, index) => (
          <div key={index} className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 fade-in">
          {/* Lable for each person */}
          <h3 className="text-lg sm:col-span-2 mb-2 mt-4">
            {currentQuestion === "Are one or more of your parents living?"
              ? `Parent ${index + 1}` // Parent 1, Parent 2, etc.
              : currentQuestion === "Are you married and is your spouse living?"
              ? `Spouse ${index + 1}` // Spouse 1, Spouse 2, etc.
              : currentQuestion === "Do you have any children?"
              ? `Child ${index + 1}` // Child 1, Child 2, etc.
              : `Details ${index + 1}`}
            <div className="border-b-2 border-gray-300 mt-2 w-full"></div>
          </h3>

                
            {/* First Name input */}
            <input
              type="text"
              placeholder="First Name"
              value={input.firstName || ""}
              onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />

            {/* Last Name input */}
            <input
              type="text"
              placeholder="Last Name"
              value={input.lastName || ""}
              onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />

            {/* Age input */}
            <input
              type="number"
              placeholder="Age"
              value={input.age || ""}
              onChange={(e) => handleInputChange(index, "age", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />

            {/* Gender dropdown */}
            <select
              value={input.gender || ""}
              onChange={(e) => handleInputChange(index, "gender", e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Delete Button */}            
            <button
            type="button"
            onClick={() => handleDeleteInput(index)} // Call delete function with current index
            className="mt-2 w-[40%] text-red-600 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2">Delete</span>
          </button>


          </div>
        ))}


        {/* Buttons */}
<div className="flex flex-col space-y-20 mt-20">
  {/* Add Parent Button */}
  {additionalInputs.length > 0 && (
    <div className="flex justify-start">
      <button
        type="button"
        onClick={addNewInput}
        className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-white rounded-lg bg-dark-purple hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        <svg
          className="w-6 h-6 dark:text-white mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {currentQuestionIndex === 0 && "Add Parent"}
        {currentQuestionIndex === 1 && "Add Spouse"}
        {currentQuestionIndex === 2 && "Add Child"}
      </button>
    </div>
  )}

  {/* Navigation Buttons */}
  <div className="flex justify-between mt-10 ">
    {/* Back Button */}
    <button
      type="button"
      onClick={onBack} // Call the onBack function
      disabled={currentQuestionIndex === 0} // Disable on the first question
      className={`inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center rounded-lg ${
        currentQuestionIndex === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-dark-purple text-white hover:bg-blue-800"
      } focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900`}
    >
      Back
    </button>

    {/* Next Button */}
    <button
      type="button"
      onClick={handleNext}
      className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-white rounded-lg bg-dark-purple hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    >
      Next
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
    </button>
  </div>
</div>
      </form>
    {/* Render SaveUserDetails with ref */}
    <SaveUserDetails ref={saveRef} />
    </div>
  );
}
