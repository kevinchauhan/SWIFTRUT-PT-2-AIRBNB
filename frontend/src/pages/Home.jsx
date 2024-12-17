import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard"
const listings = [
    {
        _id: "1",
        imageUrl: 'https://via.placeholder.com/300',
        title: 'Cozy Apartment in NYC',
        price: '$120',
        isSuperhost: true,
        reviewsCount: 30,
        location: 'New York, NY',
    },
    {
        _id: '2',
        imageUrl: 'https://via.placeholder.com/300',
        title: 'Charming Villa in Bali',
        price: '$300',
        isSuperhost: false,
        reviewsCount: 120,
        location: 'Bali, Indonesia',
    },
    // Add more listings as needed
];
const Home = () => {
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