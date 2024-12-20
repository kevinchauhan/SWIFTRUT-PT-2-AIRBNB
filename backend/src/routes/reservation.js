import express from "express";
import ReservationController from "../controllers/ReservationController.js";
const router = express.Router();


router.post("/create", ReservationController.createReservation);
router.get("/users/:id", ReservationController.getUserReservations);

export default router;