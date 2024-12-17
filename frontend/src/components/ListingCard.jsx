const ListingCard = ({ listing }) => {
    return (
        <div className="listing-card bg-white rounded-lg  overflow-hidden hover:scale-105 transform transition-all duration-300 ease-in-out">
            {/* Image Section */}
            <div className="relative rounded-lg overflow-hidden">
                <img
                    src={listing.imageUrl} // Replace with actual image URL
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                />
                {/* Superhost Badge (optional) */}
                {listing.isSuperhost && (
                    <div className="absolute top-2 left-2 bg-white px-3 py-1 text-xs text-green-600 font-semibold rounded-full">
                        Superhost
                    </div>
                )}
            </div>

            {/* Card Info Section */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-xl font-semibold">{listing.title}</h3>

                {/* Price */}
                <p className="text-gray-600 text-lg mt-1">{listing.price} per night</p>


                {/* Location */}
                <p className="text-gray-500 text-sm mt-1">{listing.location}</p>
            </div>
        </div>
    );
};

export default ListingCard;