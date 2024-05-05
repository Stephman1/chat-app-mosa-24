import express from "express";
import { firestore } from "./db";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const usersSnapshot = await firestore.collection('users').get();
    const userData: any[] = [];
    usersSnapshot.forEach(doc => {
      userData.push({uid: doc.id,...doc.data()});
    });
    res.json(userData);
  } catch (error) {
    console.error('Error getting user data', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});