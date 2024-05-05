"use client";
import { useEffect } from 'react';
import styles from './page.module.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";

export default function Chat() {
  useEffect(() => {
    const setMessages = () => {
      async function printMessageData() {
        // From Authentication Service creationYour web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyAMC0z-vL9UQpH_-fRRB1VpjictRfM9800",
          authDomain: "devchat-88614.firebaseapp.com",
          projectId: "devchat-88614",
          storageBucket: "devchat-88614.appspot.com",
          messagingSenderId: "217891503392",
          appId: "1:217891503392:web:5a2c296f8bbd602e186b45"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(app);
        localStorage.clear();
        // Fetch message data
        const querySnapshot = await getDocs(collection(db, 'messages'));
        querySnapshot.forEach((doc) => {
          localStorage.setItem(doc.id.toString(), JSON.stringify(doc.data()));
        });
      }
      printMessageData();
    };
    // Call setMessages function when component mounts
    setMessages();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <main className={styles.main}>
      <h1>Chat Page</h1>
    </main>
  );
}
