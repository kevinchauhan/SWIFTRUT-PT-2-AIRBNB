import Listing from '../models/Listings.js';

class ListingController {
    // Method to create a new listing
    static async createListing(req, res) {
        try {
            const {
                title,
                description,
                images,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                location,
                price,
            } = req.body;

            // Validate required fields
            // if (
            //     !title ||
            //     !description ||
            //     !images ||
            //     !category ||
            //     !roomCount ||
            //     !bathroomCount ||
            //     !guestCount ||
            //     !location ||
            //     !location.lat ||
            //     !location.lng ||
            //     !location.address ||
            //     !price
            // ) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'All fields are required.',
            //     });
            // }

            // Create the new listing
            const newListing = new Listing({
                title,
                description,
                images,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                location,
                price,
                user: req.user?.userId || '6761adcf1e0603b3f38e7a7b',
            });

            // Save the listing to the database
            const savedListing = await newListing.save();

            return res.status(201).json({
                success: true,
                message: 'Listing created successfully!',
                data: savedListing,
            });
        } catch (error) {
            console.error('Error creating listing:', error.message);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while creating the listing.',
            });
        }
    }

    static async getAllListings(req, res) {
        try {
            const { category } = req.query; // Extract category from query parameters

            // Define a filter object based on query params
            const filter = {};
            if (category) {
                filter.category = category;
            }

            // Fetch listings based on the filter
            const listings = await Listing.find(filter);

            return res.status(200).json({
                success: true,
                message: 'Listings retrieved successfully!',
                data: listings,
            });
        } catch (error) {
            console.error('Error fetching listings:', error.message);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching the listings.',
            });
        }
    }
}

export default ListingController;
