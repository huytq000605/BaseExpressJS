import Route from '../lib/Route/index.js'
Route.group(() => {
    Route.get('/students', 'StudentController.index');
    Route.post('/students', 'StudentController.create')
    Route.group(() => {
        Route.get('hello', 'TestController.hello');
    }).prefix('/defc')
}).middleware([]).prefix('/abc');

export default Route