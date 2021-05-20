import Route from '@cores/Route'
Route.group(() => {
    Route.get('/students', 'StudentController.index');
    Route.post('/students', 'StudentController.create')
    Route.group(() => {
        Route.get('hello', 'TestController.hello');
    }).prefix('/defc')
}).middleware([]).prefix('/abc');

export default Route