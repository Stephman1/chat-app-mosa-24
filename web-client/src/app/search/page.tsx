"use client";
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Search() {
  useEffect(() => {
    const retrieveMessages = () => {
      async function printMessageData() {
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key !== null) {
            var value = localStorage.getItem(key);
            console.log(key + ": " + value);
          }
        }
      }
      printMessageData();
    };
    
    // Call retrieveMessages function when component mounts
    retrieveMessages();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <main className={styles.main}>
      <h1>Search Page</h1>
    </main>
  );
}
