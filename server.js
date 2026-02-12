const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Frontend faylları üçün

// 1. MongoDB Atlas Bağlantısı (DATABASE)
// Bura öz MongoDB linkini qoymalısan
const MONGO_URI = "YOUR_MONGODB_CONNECTION_STRING"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB-yə qoşuldu!"))
    .catch(err => console.error("❌ DB xətası:", err));

// 2. Canlı Online İstifadəçi Sayı (SOCKET.IO)
let onlineUsers = 0;
io.on('connection', (socket) => {
    onlineUsers++;
    io.emit('userCountUpdate', onlineUsers);
    console.log(`İstifadəçi qoşuldu. Hazırda: ${onlineUsers}`);

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('userCountUpdate', onlineUsers);
        console.log(`İstifadəçi çıxdı. Qaldı: ${onlineUsers}`);
    });
});

// 3. Sadə bir Test API
app.get('/api/status', (req, res) => {
    res.json({ message: "AZE-YOUTUBE Server Aktivdir!", version: "2026.1" });
});

// Serveri başlat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} ünvanında işləyir...`);
});

