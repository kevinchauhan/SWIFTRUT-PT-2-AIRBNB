# Airbnb App

This is a full-stack Airbnb Clone Application that allows users to browse, book, and manage listings. The app includes functionalities for both users and admins, such as creating and managing listings, making reservations, and viewing booking details.

## Features

### **Admin Features**

1. **Manage Listings:**

   - Add new listings with title, location, price, and images.
   - Edit listing details.
   - Delete listings.

2. **Manage Reservations:**
   - View all reservations.
   - Update reservation status.

### **Customer Features**

1. **Browse Listings:**

   - View all available listings with images, price, and location.
   - Filter listings by location and price.

2. **Make Reservations:**

   - Book a listing with a check-in and check-out date.
   - View the total price of the reservation.

3. **Manage Reservations:**

   - View all personal reservations.
   - Cancel reservations if necessary.

4. **Authentication:**
   - Login and signup functionality.

### **Common Features**

- **Responsive UI:**
  - The app is mobile-friendly and works seamlessly on all devices.
- **Dynamic Navbar:**
  - Displays options based on the user role (admin or customer).

## Tech Stack

### **Frontend**

- React.js
- TailwindCSS
- DaisyUI
- Zustand (State Management)
- Axios (HTTP Requests)
- React Toastify (Notifications)
- React Router (Routing)

### **Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

### **Deployment**

- Frontend: [https://swiftrut-pt-2-airbnb.vercel.app/](https://swiftrut-pt-2-airbnb.vercel.app/)
- Backend: [https://swiftrut-pt-2-airbnb.onrender.com](https://swiftrut-pt-2-airbnb.onrender.com)

## API Endpoints

### **Authentication**

- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate and login a user.

### **Listings**

- `GET /api/listings` - Get all listings.
- `POST /api/listings` - Create a new listing (Admin only).
- `PUT /api/listings/:id` - Update a listing (Admin only).
- `DELETE /api/listings/:id` - Delete a listing (Admin only).

### **Reservations**

- `GET /api/reservation/user` - Get all reservations for the logged-in user.
- `POST /api/reservation` - Create a reservation.
- `PUT /api/reservation/:id` - Update a reservation status (Admin only).
- `DELETE /api/reservation/:id` - Cancel a reservation.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute to this project by submitting issues or pull requests!
