/** @format */
import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" }, // Correct singular key

  async ({ event }) => {
    await connectDB();
    // 1. Fixed typos: first_name (not frist) and added image_url
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      // 2. Fixed typo: email_addresses (plural)
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      imageUrl: image_url, // Matches your schema
      address: [],
      wishlist: [],
    };

    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" }, // Fixed: changed 'events' to 'event'
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
