var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to the port
app.listen(3000);

console.log('Listening to port 3000');
