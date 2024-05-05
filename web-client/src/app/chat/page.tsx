"use client";

import { eventNames } from "process";
import styles from "./page.module.css";
import React, { useState } from 'react';

export default function Chat() {
  const [inputText, setInputText] = useState("");

  const sendMessage = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    setInputText('');



    console.log(`message sent: ${inputText}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>

      </div>

      <form className={styles.textInput} onSubmit={sendMessage}>
        <input value={inputText} className={styles.textBox} type="text" 
            maxLength={160} placeholder="Type here..." onChange={(event) => {
              setInputText(event.target.value)
            }} />
        <button className={styles.submitBtn} type="submit">Send</button>
      </form>
    </main>
  );
}
