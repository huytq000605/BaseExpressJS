export default class BassController {
    request: Express.Request
    response: Express.Response
    constructor(request: Express.Request, response: Express.Response) {
        this.request = request;
        this.response = response
    }
}