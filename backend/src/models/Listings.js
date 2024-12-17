import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        description: {
            type: String,
            trim: true,
            minlength: 10,
            maxlength: 1000,
        },
        images: [
            {
                type: String, // URLs of images (e.g., Cloudinary or S3)
            },
        ],
        category: {
            type: String,
        },
        placeType: {
            type: String,
        },
        roomCount: {
            type: Number,
            min: 1,
        },
        bathroomCount: {
            type: Number,
            min: 1,
        },
        guestCount: {
            type: Number,
            min: 1,
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
            address: {
                type: String,
                trim: true,
            },
        },
        price: {
            type: Number,
            min: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model('Listing', ListingSchema);
export default Listing;
