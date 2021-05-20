import express from "express";
import Route from "./route";

export default class Group {
    private _prefix: string;
    private groups: Group[];
    private routes: any[];
    private middlewares: any[];
    private executer: Function | null
    private router: express.Router
    private currentGroup: Group

    constructor() {
        this.groups = []
        this._prefix = ""
        this.routes = [];
        this.middlewares = [];
        this.executer = null;
        this.router = express.Router()
        this.currentGroup = this
    }

    public getRootGroup() {
        const rootGroup = require('./index').default;
        return rootGroup;
    }

    public async build(prefix: string = '', middlewares: any[] = []) {
        if(this.executer && typeof this.executer === 'function') {
            await this.executer();
        }
        
        const currentMiddlewares = [...middlewares, ...this.middlewares]
        if(currentMiddlewares.length > 0)
            this.router.use(...currentMiddlewares);
        
        const currentPrefix = prefix + this._prefix;
        
        for(const route of this.routes) {
            const router = await route.build(currentPrefix, currentMiddlewares);
            this.router.use(router);
        }
        // Build route for this group first then build group

        for(const group of this.groups) {
            this.currentGroup = group;
            const router = await group.build(currentPrefix, currentMiddlewares);
            
            this.router.use(this._prefix, router);
        }
        

        return this.router
    }

    public middleware(middlewares: any[]) {
        this.middlewares = middlewares;
        return this;
    }

    public group(executer: Function) {
        const group = new Group();
        group.executer = executer;
        this.currentGroup.groups.push(group);
        return group;
    }

    public prefix(prefix: string) {
        this._prefix = prefix;
        return this;
    }
    
    public get(url: string, action: string) {
        const route = new Route(url, action, 'get');
        this.currentGroup.routes.push(route);
        return route;
    }
    public post(url: string, action: string) {
        const route = new Route(url, action, 'post');
        this.currentGroup.routes.push(route);
        return route;
    }
    public put(url: string, action: string) {
        const route = new Route(url, action, 'put');
        this.currentGroup.routes.push(route);
        return route;
    }
    public delete(url: string, action: string) {
        const route = new Route(url, action, 'delete');
        this.currentGroup.routes.push(route);
        return route;
    }

}