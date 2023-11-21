const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000/", // Altere para o domínio do seu aplicativo React
        methods: ["GET", "POST"]
    }
});

// Endpoint de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor WebSocket está funcionando!');
});

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    // Escuta por mensagens do cliente e emite para todos os clientes conectados
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log("msg enviada")
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});

