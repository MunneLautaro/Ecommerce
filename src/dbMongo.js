import mongoose from "mongoose";
import { createTunnel } from "tunnel-ssh";

const mongoUri = "mongodb://localhost:27017/db_usuarios";

const tunnelOptions = {
  autoClose: true,
};

/*@#6*/
const sshOptions = {
  host: "127.0.0.1",
  port: 1333,
  username: "ecom",
  password: "ecom",
};

// Here is where the magic happens...
const serverOptions = { port: 27017 }; // automatic assign port by OS

// Note that the forwarding options does not define the srcAddr and srcPort here.
// to use the server configuration.
const forwardOptions = {
  srcAddr: "0.0.0.0",
  srcPort: 27017,
  dstAddr: "127.0.0.1",
  dstPort: 27017,
};

let sshServer = null;
let sshConnectionPromise = null;

export const connectWithSSH = async () => {
  if (global.sshConnectionPromise) return global.sshConnectionPromise;
  (async () => {
    if (sshServer) return;

    try {
      global.sshConnectionPromise = { id: new Date() };
      sshServer = await createTunnel(
        tunnelOptions,
        serverOptions,
        sshOptions,
        forwardOptions,
      );
      console.log("SSH tunnel connected");

      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB through SSH tunnel");

      process.on("SIGINT", () => {
        mongoose.connection.close(() => {
          console.log("Mongoose connection closed through app termination");
          if (sshServer) {
            sshServer.close();
            console.log("SSH tunnel closed");
          }
          process.exit(0);
        });
      });
    } catch (err) {
      console.error("Error connecting to MongoDB or SSH:", err);
      global.sshConnectionPromise = null;
    }
  })();
  return global.sshConnectionPromise;
};
