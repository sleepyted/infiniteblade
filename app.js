let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let fstest = require('./routes/fs');
let ws = require('./routes/ws')

let app = express();

//create WebSocket server
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(10000);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use( express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/fs', fstest);
app.use('/ws', ws)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the let page
    res.status(err.status || 500);
    console.log(err.status)
    console.log(err.stack)
    res.render('error');
    // res.send('ERROR ' + err.status)
});


module.exports = app;
