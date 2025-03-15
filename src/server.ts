import config from "./app/config";
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";


let server : Server;


async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`App listenning to port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();



process.on('unhandledRejection', ()=>{
  console.log('Unhandled Rejection Occured. Server shutting down..')
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1);
})


process.on('uncaughtException',()=>{
  console.log('Uncaught exception occured. Server shutting down..')
  process.exit(1)
})
