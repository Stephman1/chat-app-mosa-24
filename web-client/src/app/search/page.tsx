"use client";
import { useEffect } from 'react';
import styles from './page.module.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";

export default function Search() {
  useEffect(() => {
    // Function to fetch messages from Firebase and store them in localStorage
    const setMessages = async () => {
      // Your Firebase configuration
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
      // Clear localStorage
      localStorage.clear();
      // Fetch message data
      const querySnapshot = await getDocs(collection(db, 'messages'));
      querySnapshot.forEach((doc) => {
        localStorage.setItem(doc.id.toString(), JSON.stringify(doc.data()));
      });
    };
    // Function to print message data from localStorage
    const printMessageData = () => {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key !== null) {
          var value = localStorage.getItem(key);
          console.log(key + ": " + value);
        }
      }
    };
    // Call setMessages and printMessageData functions sequentially when component mounts
    setMessages().then(() => {
      printMessageData();
    });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <main className={styles.main}>
      <h1>Search Page</h1>
    </main>
  );
}
