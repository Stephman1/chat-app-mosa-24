import express from "express";

const app = express();
const port = 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

/* Allows the server to receive requests from other ports*/
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

/* Establish connection to firebase */
const admin = require('firebase-admin');

const serviceAccount = require('./firestore_credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* web socket logic */
const socket = new WebSocket('ws://localhost:3001/chat');
io.on('connection', (socket : any) => {
  console.log('Client connected');

  // Handle incoming messages from the client
  socket.on('newMessage', (data : any) => {
    console.log('Received message:', JSON.stringify(data));

    // Broadcast the message to all connected clients
    io.emit('message', data); // Emit to all connected sockets
  });
});


app.post('/chat', async (req, res) => {
  // console.log('post request received');
  try {
    /* Write to database */
    const collection = db.collection("messages");
    const document = collection.doc();
    await document.set(req.body);

    res.json({ message: 'Message saved successfully to Firestore' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error writing data to Firestore' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));