import config from "./app/config";
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Initialize the server here after the DB connection
    server = app.listen(config.port, () => {
      console.log(`App listening to port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection Occurred. Server shutting down..');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1); // Ensure that the process exits if the server is undefined
  }
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception occurred. Server shutting down..');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1); // Ensure that the process exits if the server is undefined
  }
});
