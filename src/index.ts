import 'module-alias/register';
import Server from "./lib/server";

const server = new Server(3000);
server.start()