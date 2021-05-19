import BaseController from "./BaseController";

export default class StudentController extends BaseController {
    async index() {
        console.log('index func');
        return 'hello';
    }

    async create() {
        return '1234';
    }
}