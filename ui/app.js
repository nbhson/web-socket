let socket = null;

document.addEventListener("DOMContentLoaded", async function () {
    const ip = await getIp();
    wsConnection(ip);
    wsListenMessage();
    addMessageEvent(ip);
    requestNotification();
});

async function getIp() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ip = data.ip;
        return ip;
    } catch (error) {
        console.error(error);
    }
}

function addMessageEvent(ip = '') {
    document.getElementById('send-button').addEventListener('click', function () {
        const input = document.getElementById('message-input');
        const message = input.value;
        wsSend(message, ip);
    });
}

function displayMessage(message = '', ip = '') {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');

    messageElement.className = ip ? 'my-message' : 'other-message';
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function wsConnection(ip) {
    socket = new WebSocket('ws://192.168.1.12:8080');
    socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify({ ip, message: `New User Join: ${ip}` }));
    });
}

function wsSend(message = '', ip = '') {
    socket.send(JSON.stringify({ ip, message }));
}

function wsListenMessage() {
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        const { message, ip } = JSON.parse(event.data);
        displayMessage(message, ip);
        showNotification(message)
    });
}

function requestNotification() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    }
}

function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification("New Message", {
            body: message,
        });
    } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("New Message", {
                    body: message,
                });
            } else {
                console.log("Notification permission denied.");
            }
        });
    } else {
        console.log("Notification permission denied.");
    }
}