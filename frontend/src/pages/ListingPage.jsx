import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../http/client'; // Assuming you have an API client set up

const ListingDetails = () => {
    const { id } = useParams(); // Get the listing ID from the URL
    const [listing, setListing] = useState(null);
    const [reserved, setReserved] = useState(false); // To track reservation status

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/api/listing/${id}`);
                setListing(response.data.listing); // Assuming the API returns the listing data
            } catch (error) {
                console.error('Error fetching listing data:', error);
            }
        };

        fetchListing();
    }, [id]);

    const handleReserve = async () => {
        try {
            const response = await api.post('/api/reserve', { listingId: id });
            if (response.data.success) {
                setReserved(true);
            }
        } catch (error) {
            console.error('Error making reservation:', error);
        }
    };

    if (!listing) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Hero Section */}
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {listing.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${listing.title} image ${index + 1}`}
                            className="rounded-lg w-full h-60 object-cover shadow-lg"
                        />
                    ))}
                </div>
                <button className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                    Share
                </button>
            </div>

            {/* Listing Content */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <p className="text-sm text-gray-500">{listing.category}</p>

                <div className="my-4 text-gray-700">
                    <p>{listing.description}</p>
                </div>
            </div>

            {/* Pricing and Reservation */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
                <p className="text-xl font-semibold">
                    ${listing.price} <span className="text-sm font-light">per night</span>
                </p>
                <button
                    onClick={handleReserve}
                    disabled={reserved}
                    className={`w-full mt-4 py-2 text-white font-semibold rounded-lg ${reserved ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                        }`}
                >
                    {reserved ? 'Reserved' : 'Reserve Now'}
                </button>
            </div>
        </div>
    );
};

export default ListingDetails;
