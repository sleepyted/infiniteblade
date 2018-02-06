/**
 * Created by matengfei1 on 2018/2/6.
 */
var socket = io.connect('http://localhost:10000');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});