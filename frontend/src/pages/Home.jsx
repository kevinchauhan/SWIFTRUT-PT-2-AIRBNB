import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard"
import { useEffect, useState } from "react";
import { api } from "../http/client";

const Home = () => {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        fetchListings()
    }, [])

    const fetchListings = async () => {
        try {
            const { data } = await api.get("/api/listing");
            if (data.success) {
                setListings(data.data);
            } else {
                console.error('Error fetching listings:', data.message);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    }

    return (
        <div className="container mx-auto py-2">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listings.map((listing, index) => (
                    <Link to={`listing/${listing._id}`} key={index}>
                        <ListingCard key={index} listing={listing} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home