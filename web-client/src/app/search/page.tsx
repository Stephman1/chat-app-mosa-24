"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";

// Define the Message interface
interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

export default function Search() {
  const [userInput, setUserInput] = useState(""); // State for user input
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]); // State for filtered messages

  // Function to filter message data based on user input
  const filterMessageData = (input: string): Message[] => {
    const filtered: Message[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          const messageData: Message = JSON.parse(value);
          if (!input || (messageData && messageData.message && messageData.message.toLowerCase().includes(input.toLowerCase()))) {
            filtered.push(messageData);
          }
        }
      }
    }
    return filtered;
  };

  useEffect(() => {
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
    // TODO it should only fetch messages from the FireStore db if the user is logged in
    const fetchMessages = async () => {
      const messages: Message[] = [];
      const querySnapshot = await getDocs(collection(db, 'messages'));
      querySnapshot.forEach((doc) => {
        localStorage.setItem(doc.id.toString(), JSON.stringify(doc.data()));
        messages.push({ userId: doc.data().userId, message: doc.data().message, timestamp: doc.data().timestamp });
      });
      setFilteredMessages(messages);
    };
    fetchMessages();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Update filtered messages when user input changes
  useEffect(() => {
    setFilteredMessages(filterMessageData(userInput));
  }, [userInput]);

  return (
    <main className={styles.main}>
      <h1 className={styles.searchTitle}>Search Page</h1>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)} // Update userInput state on change
        placeholder="Search for messages..."
        className={styles.searchInput}
      />
      <div className={styles.searchResults}>
        {filteredMessages.map((message, index) => (
          <div key={index} className={styles.message}>{message.userId}: {message.message}: {message.timestamp}</div>
        ))}
      </div>
    </main>
  );
}
