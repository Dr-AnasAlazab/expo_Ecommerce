/** @format */
import { Inngest } from "inngest";
import { connectDB } from "./db.js";

import { User } from "../models/user.module.js";

export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    await connectDB();
    const { id, email_address, frist_name, last_name } = event.data;

    const newUser = {
      clerkId: id,
      email: email_address[0]?.email.address,
      name: `${frist_name || ""} ${last_name || ""}` || "User",
      imgUrl: image_url,
      addresses: [],
      wishlist: [],
    };

    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: "delete-user-from-db",
  },
  { events: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
