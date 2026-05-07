/** @format */

import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import Path from "path";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import adminRoutes from "./routes/admin.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import cartRoute from "./routes/cart.route.js";
import productRoute from "./routes/product.route.js";
import cors from "cors";
import ngrok from "@ngrok/ngrok";

export const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

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

const PORT = process.env.PORT;

export const server = app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on("listening", () => {
  console.log(`✅ server is ready`);

  startNgrokTunnel();
});

export const startNgrokTunnel = async () => {
  try {
    const url = await ngrok.connect({
      addr: PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN,
      hostname: "groin-improper-aliens.ngrok-free.dev",
    });

    console.log(`🌐 Ngrok tunnel established at : ${url.url()}`);
    console.log(`🔗 Forwading  : ${url.url()} -> http://localhost:${PORT}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(` Error starting ngrok tunnell, ${error.message} `);
    } else {
      console.log(`unknown error,${error}`);
    }
  }
};

// shutdown the hundling

process.on("SIGINT", async () => {
  console.log(`\n 🛑 shutting down down the server and tunnell `);

  try {
    await ngrok.kill();
    console.log("✅ ngrok tunnel stopped");
  } catch (error) {
    if (error instanceof Error) {
      console.log(` Error starting ngrok tunnell, ${error.message} `);
    } else {
      console.log(`unknown error,${error}`);
    }
  }

  server.close(() => {
    console.log("✅ ngrok server stopped");
    process.exit(0);
  });
});

// startServer();
