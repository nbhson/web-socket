const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
// const server = new WebSocket('ws://192.168.1.12:8080');
const clients = [];

server.on('connection', (socket) => {
    clients.push(socket);
    console.log('Number of clients:', clients.length);

    socket.on('message', (message) => {
        // transform Buffer to String
        const messageString = message.toString();
        let jsonMessage;
        try {
            jsonMessage = JSON.parse(messageString);
            console.log('Received JSON:', jsonMessage);
            const response = {
                ip: jsonMessage.ip,
                message: jsonMessage.message,
            };
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            socket.send(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8080');