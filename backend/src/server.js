/** @format */

import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import Path from "path";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

const __dirname = Path.resolve();
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(Path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(Path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

// app.listen(ENV.PORT, () => {
//   console.log("Server is up and running");
//   connectDB();
// });

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();
