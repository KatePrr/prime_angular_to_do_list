var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/mongo_to_do');
mongoose.model(
    'Task_List',
    new Schema({
        "task": String,
        "time": String,
        "date": String
    },
        {
            collection: 'tasks'
        }
    ));

var Task_List = mongoose.model('Task_List');

app.post('/task', function(req, res) {
    //console.log(req.body);
    var newTask = new Task_List({
        "task": req.body.task,
        "time": req.body.time,
        "date": req.body.date
    });

    newTask.save(function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }
        Task_List.find({}, function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }
            res.send(data);
        });
    });

});

app.get('/task', function(req, res) {
    Task_List.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }
        res.send(data);
        console.log(data);
        });
});

app.delete('/task/:id', function(req, res) {
    Task_List.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});




// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});