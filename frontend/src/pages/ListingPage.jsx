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
        return <p>Loading...</p>;
    }

    return (
        <div className="listing-details">
            <div className="listing-header">
                <h1>{listing.title}</h1>
                <p>{listing.category}</p>
                <p>{listing.description}</p>
            </div>

            {/* Display the images */}
            <div className="listing-images">
                {listing.images.map((image, index) => (
                    <img key={index} src={image} alt={`${listing.title} image ${index + 1}`} className="listing-image" />
                ))}
            </div>

            {/* Price and Reservation */}
            <div className="reservation">
                <p>Price: ${listing.price} per night</p>
                <button
                    onClick={handleReserve}
                    disabled={reserved}
                    className={`reserve-button ${reserved ? 'reserved' : ''}`}
                >
                    {reserved ? 'Reserved' : 'Reserve Now'}
                </button>
            </div>
        </div>
    );
};

export default ListingDetails;
