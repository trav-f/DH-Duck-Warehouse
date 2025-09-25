import { Router } from "express";
import { getShippingQuote } from "../controllers/shippingController.js";

const router = Router();

// Route definitions
router.post("/quote", getShippingQuote);

export default router;