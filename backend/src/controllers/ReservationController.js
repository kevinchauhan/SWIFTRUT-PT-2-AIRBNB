import Reservation from '../models/Reservation.js';
import Listing from '../models/Listings.js';

class ReservationController {
    static async createReservation(req, res) {
        const { id: listingId } = req.params; // Listing ID from URL params
        const { userId, checkIn, checkOut, totalPrice } = req.body;

        try {
            // Find the listing
            const listing = await Listing.findById(listingId);
            if (!listing) {
                return res.status(404).json({ success: false, message: 'Listing not found' });
            }

            // Create a reservation
            const reservation = new Reservation({
                listing: listingId,
                user: userId,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                totalPrice,
            });

            await reservation.save();

            return res.status(201).json({
                success: true,
                message: 'Reservation created successfully!',
                reservation,
            });
        } catch (error) {
            console.error('Error creating reservation:', error.message);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while creating the reservation.',
            });
        }
    }

    static async getUserReservations(req, res) {
        const { userId } = req.params;

        try {
            const reservations = await Reservation.find({ user: userId })
                .populate('listing', 'title images location price')
                .sort({ createdAt: -1 }); // Sorting by latest first

            return res.status(200).json({
                success: true,
                reservations,
            });
        } catch (error) {
            console.error('Error fetching user reservations:', error.message);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching reservations.',
            });
        }
    }
}
export default ReservationController;
