"use client";

import { eventNames } from "process";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { onAuthStateChangedHelper } from "@/utilities/firebase/firebase";

export default function Chat() {
  const [inputText, setInputText] = useState("");

  const sendMessage = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    setInputText('');
    console.log(`message sent: ${inputText}`);
  };

  /* Logic for enabling and disabling the send button */
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  });
  
  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>

      </div>

      <form className={styles.textInput} onSubmit={sendMessage}>
        <input value={inputText} className={styles.textBox} type="text" 
            maxLength={160} placeholder="Type here..." onChange={(event) => {
              setInputText(event.target.value)
            }} />
        {
          (user === null) ? (
            <button className={styles.submitBtnDisabled} type="submit" disabled>Send</button>
          ) : (
            <button className={styles.submitBtn} type="submit">Send</button>
          )
        }
      </form>
    </main>
  );
}
        
// import { useEffect } from 'react';
// import styles from './page.module.css';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
// import { initializeApp } from "firebase/app";

// export default function Chat() {
//   useEffect(() => {
//     const setMessages = () => {
//       async function printMessageData() {
//         // From Authentication Service creationYour web app's Firebase configuration
//         const firebaseConfig = {
//           apiKey: "AIzaSyAMC0z-vL9UQpH_-fRRB1VpjictRfM9800",
//           authDomain: "devchat-88614.firebaseapp.com",
//           projectId: "devchat-88614",
//           storageBucket: "devchat-88614.appspot.com",
//           messagingSenderId: "217891503392",
//           appId: "1:217891503392:web:5a2c296f8bbd602e186b45"
//         };
//         // Initialize Firebase
//         const app = initializeApp(firebaseConfig);
//         // Initialize Cloud Firestore and get a reference to the service
//         const db = getFirestore(app);
//         localStorage.clear();
//         // Fetch message data
//         const querySnapshot = await getDocs(collection(db, 'messages'));
//         querySnapshot.forEach((doc) => {
//           localStorage.setItem(doc.id.toString(), JSON.stringify(doc.data()));
//         });
//       }
//       printMessageData();
//     };
//     // Call setMessages function when component mounts
//     setMessages();
//   }, []); // Empty dependency array ensures this effect runs only once on component mount -->
