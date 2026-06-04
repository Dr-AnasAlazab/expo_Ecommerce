/** @format */

import { Router } from "express";
import {
  createPaymentIntent,
  handleWebhook,
} from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// intent = stripe.req

const router = Router();

router.post("/create-intent", protectRoute, createPaymentIntent);

// No aut needed- Stripe validates via signature
router.post("/webhook", handleWebhook);

export default router;
