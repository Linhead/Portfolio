let WebSocketModule = require('ws')
let server = WebSocketModule.Server;
let newSocket = new server({
    port: 9009
});

let users = [];
newSocket.on('connection', (socket) => {

    socket.on('message', (message) => {
        let inputMess = JSON.parse(message);
        if (inputMess.type === 'message') {
            newSocket.clients.forEach(client => {

                if (client !== socket)

                    client.send(JSON.stringify({
                        type: 'message',
                        user: inputMess.user,
                        text: inputMess.text
                    }));
            })
        } else if (inputMess.type === 'user') {

            if (users.indexOf(inputMess.text) == -1) {
                socket.login = inputMess.text;
                users.push(socket.login);
                newSocket.clients.forEach(client => {
                    client.send(JSON.stringify({
                        type: 'users',
                        text: inputMess.text
                    }));
                    if (client === socket)
                        users.forEach(user => {
                            client.send(JSON.stringify({
                                type: 'usersList',
                                text: user
                            }));
                        });
                });
            } else {
                newSocket.clients.forEach(client => {
                    if (client === socket) {
                        client.send(JSON.stringify({
                            type: 'error',
                            text: "Имя уже занято!"
                        }));
                    };
                });
            }
        }
    });

    socket.on('close', function () {
        users.splice(users.indexOf(socket.login), 1);
        newSocket.clients.forEach(client => {
            client.send(JSON.stringify({
                type: 'DisconnectedUser',
                text: socket.login
            }));
        });
    });

});