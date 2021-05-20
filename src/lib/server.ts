import express from 'express'
// import Route from "@cores/Route"
import Route from "@root/routes"

export default class Server {
    port;
    app;

    constructor(port: number) {
        this.port = port;
        this.app = express()
    }

    async start() {
        this.app.use(await Route.build())
        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        })
    }
}