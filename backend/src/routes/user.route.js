/** @format */

import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { get } from "mongoose";
import {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} from "../controllers/user.controller.js";

const router = Router();
router.use(protectRoute);

router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

//wishlist routes

router.post("/wishlist", addToWishlist);
router.delete("/wishlist", removeFromWishlist);
router.get("/wishlist", getWishlist);

export default router;
