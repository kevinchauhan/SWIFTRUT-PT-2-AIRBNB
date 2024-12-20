import { useState } from 'react';
import { HomeIcon, UserIcon, BuildingLibraryIcon, WifiIcon, SparklesIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { api } from '../../http/client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const questions = [
    {
        question: "Which of these best describes your place?",
        options: [
            { label: "House", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A standalone home." },
            { label: "Flat/Apartment", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "A unit in a building." },
            { label: "Barn", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "A rustic living space." },
            { label: "Bed & Breakfast", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A cozy place with meals." },
            { label: "Boat", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A boat for living." },
            { label: "Cabin", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "A quaint cabin in nature." },
            { label: "Campervan/Motorhome", icon: <TruckIcon className="h-6 w-6 text-gray-600" />, description: "A mobile home." },
            { label: "Casa Particular", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "A private home in Cuba." },
            { label: "Castle", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "A regal, spacious home." },
        ],
        multiSelect: false, // Single select
    },
    {
        question: "What type of place will guests have?",
        options: [
            { label: "Entire place", icon: <HomeIcon className="h-6 w-6 text-gray-600" />, description: "Guests have the whole place." },
            { label: "A room", icon: <UserIcon className="h-6 w-6 text-gray-600" />, description: "Guests get their own room." },
            { label: "Shared room", icon: <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />, description: "Guests share a room with others." },
        ],
        multiSelect: false, // Single select
    },
    {
        question: "Where's your place located?",
        type: 'location', // New step for manual location input
    },
    {
        question: "Share some basics about your place",
        fields: [
            { label: 'Guests', type: 'number', placeholder: 'Enter the number of guests' },
            { label: 'Rooms', type: 'number', placeholder: 'Enter the number of rooms' },
            { label: 'Bathrooms', type: 'number', placeholder: 'Enter the number of bathrooms' },
        ],
        amenities: [
            { label: "Wi-Fi", icon: <WifiIcon className="h-6 w-6 text-gray-600" />, description: "High-speed internet" },
            { label: "Air Conditioning", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Cool off in summer" },
            { label: "Parking", icon: <TruckIcon className="h-6 w-6 text-gray-600" />, description: "Free parking available" },
            { label: "Swimming Pool", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Relax by the pool" },
            { label: "Kitchen", icon: <SparklesIcon className="h-6 w-6 text-gray-600" />, description: "Fully equipped kitchen" },
        ],
        multiSelect: true, // Multiple select allowed
    },
    {
        question: "Add a photo of your place",
        type: 'image', // New step for image upload
    },
    {
        question: "How would you describe your place?",
        fields: [
            { label: 'Title', type: 'text', placeholder: 'Enter title' },
            { label: 'Description', type: 'text', placeholder: 'Enter description' },
            { label: 'Price', type: 'number', placeholder: 'Enter price per night' },
        ],
        multiSelect: false, // Single select
    },
];

const StepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [location, setLocation] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const navigate = useNavigate()

    // Define the handleFileDrop function before using it
    const [uploadedUrls, setUploadedUrls] = useState([]);

    const handleFileDrop = async (acceptedFiles) => {
        const uploadPromises = acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default"); // Replace with your upload preset
            formData.append("cloud_name", "dqs5lnafn"); // Replace with your Cloudinary cloud name

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dqs5lnafn/image/upload`,
                    formData
                );
                return response.data.secure_url; // Get the uploaded image URL
            } catch (error) {
                console.error("Upload failed:", error);
                return null;
            }
        });

        const urls = await Promise.all(uploadPromises);
        setUploadedUrls((prevUrls) => [...prevUrls, ...urls.filter(Boolean)]); // Append non-null URLs
    };

    // Initialize useDropzone hook after function definition
    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileDrop });

    const handleOptionClick = (option) => {
        if (questions[currentStep].multiSelect) {
            setSelectedOptions((prevOptions) => {
                if (prevOptions.includes(option.label)) {
                    return prevOptions.filter((item) => item !== option.label); // Deselect
                } else {
                    return [...prevOptions, option.label]; // Select
                }
            });
        } else {
            setSelectedOptions([option.label]); // Clear previous selection and select new one
        }
    };

    const handleNextClick = () => {
        if (selectedOptions.length > 0 || (location)) {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [questions[currentStep].question]: selectedOptions.length > 0 ? selectedOptions : location,
            }));
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
                setSelectedOptions(answers[questions[currentStep + 1]?.question] || []);
            }
        }
    };

    const handleBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedOptions(answers[questions[currentStep - 1]?.question] || []);
        }
    };

    const handleSubmit = async () => {
        try {
            // Construct a JSON payload
            const listingData = {
                title: answers['Title'], // Extract from answers
                description: answers['Description'],
                category: answers['Which of these best describes your place?'][0],
                placeType: answers['What type of place will guests have?'][0],
                guestCount: Number(answers['Guests']),
                roomCount: Number(answers['Rooms']),
                bathroomCount: Number(answers['Bathrooms']),
                location,
                images: uploadedUrls,
                price: Number(answers['Price']),
            };
            // Send JSON data to the API
            const response = await api.post('/api/listing/create', listingData);
            console.log('Listing Created Successfully:', response.data);
            navigate('/')
            toast.success('Listing Created Successfully')
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };


    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{questions[currentStep].question}</h2>

                {/* Step 1 - Checkboxes with icons */}
                {questions[currentStep].options && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {questions[currentStep].options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`cursor-pointer p-4 border rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out 
                                ${selectedOptions.includes(option.label) ? 'bg-gray-200 border-gray-500' : ''}`}
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
                )}

                {/* Step 3 - Location input */}
                {questions[currentStep].type === 'location' && (
                    <div className="mb-4">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Enter Location"
                                className="border p-2 rounded w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Step 4 - Basic info and amenities */}
                {questions[currentStep].fields && (
                    <div>
                        {questions[currentStep].fields.map((field, index) => (
                            <div key={index}>
                                <label>{field.label}</label>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="border p-2 rounded w-full"
                                    onChange={(e) =>
                                        setAnswers((prev) => ({ ...prev, [field.label]: e.target.value }))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 5 - Image Upload */}
                {/* Step 5 - Image Upload */}
                {questions[currentStep].type === 'image' && (
                    <div>
                        {uploadedUrls.length < 1 &&
                            <div
                                {...getRootProps()}
                                className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                <p>Drag and drop images here, or click to select files</p>
                            </div>
                        }

                        {/* Preview uploaded URLs */}
                        {uploadedUrls.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {uploadedUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={url}
                                            alt={`Uploaded Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                        {/* Optionally add a remove button */}
                                        <button
                                            onClick={() =>
                                                setUploadedUrls((prev) => prev.filter((_, i) => i !== index))
                                            }
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}


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
                        onClick={currentStep === 5 ? handleSubmit : handleNextClick}
                        disabled={selectedOptions.length === 0 && !(location)}
                        className="px-4 py-2 border border-gray-600 text-gray-600 rounded-lg disabled:opacity-50"
                    >
                        {currentStep === 5 ? 'Create' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepForm;
