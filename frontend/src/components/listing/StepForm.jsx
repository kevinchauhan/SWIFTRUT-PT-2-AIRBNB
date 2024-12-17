import React, { useState } from 'react';
import { HomeIcon, UserIcon, BuildingLibraryIcon, WifiIcon, SparklesIcon, TruckIcon } from '@heroicons/react/24/outline';

const questions = [
    {
        question: "Which of these best describes your place?",
        options: [
            { label: "Entire home", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "You'll have the whole place to yourself." },
            { label: "Private room", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "A private room in a shared space." },
            { label: "Shared room", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "A shared space with others." },
        ],
        multiSelect: false, // Single select
    },
    {
        question: "What type of place will guests have?",
        options: [
            { label: "House", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A standalone home." },
            { label: "Apartment", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "A unit in a building or complex." },
            { label: "Condo", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "A private unit within a shared building." },
            { label: "Villa", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "A luxurious standalone home." },
            { label: "Studio", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A small, single-room living space." },
        ],
        multiSelect: false, // Single select
    },
    {
        question: "How many guests can your place accommodate?",
        options: [
            { label: "1-2", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "Ideal for solo travelers or couples." },
            { label: "3-4", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "Perfect for a small family or group." },
            { label: "5-6", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "Ideal for a larger family or small group." },
            { label: "7+", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "Great for bigger groups or parties." },
        ],
        multiSelect: false, // Single select
    },
    {
        question: "What amenities are available?",
        options: [
            { label: "Wi-Fi", icon: <WifiIcon className="h-6 w-6 text-gray-600" />, description: "Fast and reliable internet connection." },
            { label: "Air Conditioning", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Stay cool during the hot summer months." },
            { label: "Kitchen", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Fully equipped kitchen for cooking." },
            { label: "Parking", icon: <TruckIcon className="h-6 w-6 text-gray-600" />, description: "Free parking for your vehicle." },
            { label: "Swimming Pool", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Relax in the pool at your convenience." },
            { label: "Hot Tub", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Enjoy a relaxing soak in the hot tub." },
        ],
        multiSelect: true, // Multiple select allowed
    },
    {
        question: "Do you allow pets?",
        options: [
            { label: "Yes", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "Pets are welcome in your space." },
            { label: "No", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "No pets allowed in your space." },
            { label: "Only small pets", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "Only small pets are allowed." },
        ],
        multiSelect: false, // Single select
    },
];

const StepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]); // Track selected options for multi-select questions

    const handleOptionClick = (option) => {
        if (questions[currentStep].multiSelect) {
            // If it's a multi-select question, add or remove from selected options
            setSelectedOptions((prevOptions) => {
                if (prevOptions.includes(option.label)) {
                    return prevOptions.filter((item) => item !== option.label); // Deselect
                } else {
                    return [...prevOptions, option.label]; // Select
                }
            });
        } else {
            // If it's a single select question, just set the selected option
            setSelectedOptions([option.label]);
        }
    };

    const handleNextClick = () => {
        if (selectedOptions.length > 0) {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [questions[currentStep].question]: selectedOptions,
            }));
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
                // Preserve previous selections when moving forward
                setSelectedOptions(answers[questions[currentStep + 1]?.question] || []);
            }
        }
    };

    const handleBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            // Preserve selections when moving back
            setSelectedOptions(answers[questions[currentStep - 1]?.question] || []);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{questions[currentStep].question}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {questions[currentStep].options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`cursor-pointer p-4 border rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out 
                            ${selectedOptions.includes(option.label) ? 'bg-gray-200 border-gray-500' : ''}`} // Highlight selected option
                        >
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-gray-100 rounded-full mb-2">
                                    {option.icon}
                                </div>
                                <h4 className="font-semibold text-lg text-center">{option.label}</h4>
                                <p className="text-sm text-center text-gray-500 mt-1">{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={handleBackClick}
                        disabled={currentStep === 0}
                        className="px-4 py-2 border border-gray-600 text-gray-600 rounded-lg disabled:opacity-50"
                    >
                        Back
                    </button>
                    <p className="text-gray-500 text-sm">
                        Step {currentStep + 1} of {questions.length}
                    </p>
                    <button
                        onClick={handleNextClick}
                        disabled={selectedOptions.length === 0} // Disable if no option is selected
                        className="px-4 py-2 border border-gray-600 text-gray-600 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepForm;
