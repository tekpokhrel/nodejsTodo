
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds143191.mlab.com:43191/todotest');

//Create a schema - blueprint

var todoSchema = mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'Play Tennis'}).save(function(err) {
//
//     if(err) throw err;
//
//     console.log("data saved");
// });

// var data = [
//     {item: "Drink coffee"},
//     {item: "Go to office"},
//     {item: "Play tennis"}
// ];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to the view

        Todo.find({}, function(err, data) {

            if(err) throw err;

            res.render('todo', {todos: data});
        });

    });

    app.post('/todo', urlencodedParser, function(req,res) {

        //get data from the view and add it to the mongodb

        var newTodo = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        });

        // data.push(req.body);
        // res.json(data);

    });

    app.delete('/todo/:item', function(req, res) {

       //delete the requested data from the mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {

            if(err) throw err;

            res.json(data);
        });


        // data = data.filter(function(app) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);

    });
};
