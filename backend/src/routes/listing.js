import express from "express";
import ListingController from "../controllers/ListingController.js";
const router = express.Router();


router.post("/create", ListingController.createListing);

export default router;