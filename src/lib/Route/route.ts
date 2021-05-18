import express from "express";
export default class Route {
    url: string;
    action: string;
    method: 'get' | 'post' | 'put' | 'delete';
    router: express.Router
    middlewares: any[]

    constructor(url: string, action: string, method: 'get' | 'post' | 'put' | 'delete') {
        this.url = url;
        this.action = action;
        this.method = method;
        this.router = express.Router()
        this.middlewares = [];
    }

    async build(prefix: string, middlewares: any[]) {
        this.router[this.method](prefix + this.url, ...middlewares, ...this.middlewares , async (req, res, next) => {
            const [controllerName, action] = this.action.split('.');
            const Controller = (await import(`../../Controllers/${controllerName}.js`)).default;
            const controller = new Controller(req, res);
            if(typeof controller[action] !== "function") throw Error(`There is no action ${controllerName}.${action}`);
            const data = await controller[action]();
            res.send(data);
            res.end();
        })
        
        return this.router;
    }

    middleware(middlewares: any[]) {
        this.middlewares = middlewares;
        return this;
    }
}