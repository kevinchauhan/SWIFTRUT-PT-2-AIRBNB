import express from "express";
import ListingController from "../controllers/ListingController.js";
const router = express.Router();


router.post("/create", ListingController.createListing);
router.get("/", ListingController.getAllListings);
router.get("/:id", ListingController.getListingById);

export default router;