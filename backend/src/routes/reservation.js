import express from "express";
import ReservationController from "../controllers/ReservationController.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

router.use(authenticate)
router.post("/create", ReservationController.createReservation);
router.get("/user", authenticate, ReservationController.getUserReservations);

export default router;