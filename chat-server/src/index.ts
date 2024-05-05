import express from "express";
import { firestore } from "./db";
import { initializeApp } from "firebase-admin";

const app = express();
const port = 3001;

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

app.post('/chat', async (req, res) => {
  console.log('post request received');
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