import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../http/client";

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch reservations for the logged-in user
    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/reservation/user");
            if (response.status === 200) {
                setReservations(response.data.reservations);
            } else {
                toast.error("Failed to fetch reservations. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while fetching reservations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Reservations</h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <svg
                        className="w-8 h-8 text-primary animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="opacity-25"
                        />
                        <path
                            fill="currentColor"
                            d="M4 12a8 8 0 0116 0"
                            className="opacity-75"
                        />
                    </svg>
                </div>
            ) : reservations.length === 0 ? (
                <p className="text-gray-500">You have no reservations yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservations.map((reservation) => (
                        <div
                            key={reservation._id}
                            className="border rounded-md p-4 shadow-sm bg-white"
                        >
                            <img
                                src={reservation.listing.images[0]}
                                alt={reservation.listing.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                {reservation.listing.title}
                            </h2>
                            <p className="text-gray-600">
                                <strong>Location:</strong> {reservation.listing.location}
                            </p>
                            <p className="text-gray-600">
                                <strong>Check-in:</strong>{" "}
                                {new Date(reservation.checkIn).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Check-out:</strong>{" "}
                                {new Date(reservation.checkOut).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Total Price:</strong> ${reservation.totalPrice}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationPage;
