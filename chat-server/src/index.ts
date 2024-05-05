import express from "express";
import { firestore } from "./db";
import { initializeApp } from "firebase-admin";

const app = express();
const port = 3005;

app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { text, userId, timestamp } = req.body; // Destructuring for cleaner access

    if (!text || !userId || ! timestamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // console.log('Received text:', text, 'User ID:', userId);
    // Process the received data (e.g., store it in a database)
    const admin = require('firebase-admin');

    const serviceAccount = require('./firestore_credentials.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    const collection = db.collection("messages");
    const document = collection.doc();
    await document.set(req.body);

    res.json({ message: 'Data received successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error receiving data' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));



// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/users", async (req, res) => {
//   try {
//     const usersSnapshot = await firestore.collection('users').get();
//     const userData: any[] = [];
//     usersSnapshot.forEach(doc => {
//       userData.push({uid: doc.id,...doc.data()});
//     });
//     res.json(userData);
//   } catch (error) {
//     console.error('Error getting user data', error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

// app.listen(port, () => {
//   console.log(`server listening at http://localhost:${port}`);
// });