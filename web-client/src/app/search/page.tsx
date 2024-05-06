"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";


export default function Search() {
  const [inputText, setInputText] = useState("");
  const [jsonObjs, fillArray] = useState<any[]>([]);
  const [messages, filterMessages] = useState<any[]>([]);

  let temp = [];

  useEffect(() => {
    fetch("http://localhost:3001/get_data")
    .then(response => response.json())
    .then(data => {  
      fillArray(data);
    });
  });

  const searchMessage = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // prevents page reload
    temp = [];

    if (jsonObjs.length > 0) {
      for (const obj of jsonObjs) {
        // console.log(obj.displayName && obj?.displayName.toLowerCase() === inputText.toLowerCase());
        if (obj?.displayName && obj?.displayName.toLowerCase() === inputText.toLowerCase()) {
          const newMessage = {
            "photoUrl": obj.photoUrl,
            "message": obj.message,
            "timestamp": obj.timestamp,
          }
          temp.push(newMessage);
        }
      }
    }
    
    console.log(JSON.stringify(messages));
    filterMessages(temp);
  };

  
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Search Messages</h1>
      <div className={styles.searchBar}>
        <form className={styles.textInput} onSubmit={searchMessage}>
          <input value={inputText} className={styles.textBox} type="text" 
          maxLength={160} placeholder="Filter Messages By User" onChange={(event) => {
            setInputText(event.target.value)
          }} /> 
          <button className={styles.submitBtn} type="submit">Send</button>
        </form>
      </div>

      <div className={styles.searchResults}>
        {
          (messages.length > 0) ? (
            messages.map((item : any, index) => {
              return (
                <div className={styles.message} key={index}>
                  <div className={styles.row}>
                    <img src={item.photoUrl} alt="photo" className={styles.img} />
                    <p >{`${new Date(parseInt(item.timestamp)).toLocaleTimeString()}`}</p>
                  </div>
                  <p className={styles.text}>{item.message}</p>
                </div>
              );
            })
          ) : (
            <h2 className={styles.noResults}>No Results...</h2>
          )


          
        }
      </div>
    </main>
  );  
}
