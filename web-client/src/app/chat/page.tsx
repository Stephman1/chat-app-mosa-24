"use client";

import { eventNames } from "process";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { onAuthStateChangedHelper } from "@/utilities/firebase/firebase";

export default function Chat() {
  const [inputText, setInputText] = useState("");

  /* Sends message to be written in Firestore */
  const sendMessage = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // prevents page reload
    setInputText(''); // sets the text input back to empty string
    
    const data = {
      "message": inputText,
      "timestamp": `${Date.now()}`,
      "userId": user?.uid,
    }

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('POST response:', responseData);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
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

  /* Fetch messages from DataBase on first render */
  const [jsonObjs, fillArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/get_data")
    .then(response => response.json())
    .then(data => {  
      fillArray(data);
      console.log(JSON.stringify(jsonObjs));
    });
  });

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>
        {
          jsonObjs.map((item : any, index) => {
            return (
              <div className={styles.message} key={index}>
                <div className={styles.row}>
                  <img src={item.photoUrl} alt="photo" className={styles.img} />
                  <p >{`${Math.floor((parseInt(item.timestamp) / 1000 / 60 / 60) % 24)}:${("0" + Math.floor(parseInt(item.timestamp) / 1000 / 60) % 60).substr(-2)}`}</p>
                </div>
                <p className={styles.text}>{item.message}</p>
              </div>
            );
          })
        }
      </div>

      <form className={styles.textInput} onSubmit={sendMessage}>

        {/* Text Input */}
        {
          (user === null) ? (
            <input value={inputText} className={styles.textBox} type="text" 
            maxLength={160} placeholder="Sign In To Chat" onChange={(event) => {
              setInputText(event.target.value)
            }} />
          ) : (
            <input value={inputText} className={styles.textBox} type="text" 
            maxLength={160} placeholder="Type here..." onChange={(event) => {
              setInputText(event.target.value)
            }} />
          )
        }
        
        {/* Send Button */}
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
