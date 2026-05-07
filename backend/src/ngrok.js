/** @format */

import dotenv from "dotenv";
import ngrok from "@ngrok/ngrok";
import express from "express";
import { app } from "./server.js";
import { connectDB } from "./config/db.js";
dotenv.config();

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
