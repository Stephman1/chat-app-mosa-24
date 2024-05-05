"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";

// Define the Message interface
interface Message {
  displayName: string;
  photoUrl: string;
  message: string;
  timestamp: string;
  dateTime: string;
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
    
      // Fetching users data in parallel
      const usersPromises = querySnapshot.docs.map(async (doc) => {
        const userId = doc.data().userId;
        // Query the 'users' collection to find the document where the userId field matches
        const userQuerySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0]; // Assuming there's only one matching document
          // Convert timestamp to a more meaningful format
          const timestamp = parseInt(doc.data().timestamp);
          const date = new Date(timestamp);
          const dateString = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
      
          return {
            userId: userId,
            displayName: userDoc.data().displayName,
            photoUrl: userDoc.data().photoUrl,
            message: doc.data().message,
            dateTime: dateString,
            timestamp: doc.data().timestamp
          };
        } else {
          return null; // Handle case where user document doesn't exist
        }
      });
    
      const usersData = await Promise.all(usersPromises);
    
      usersData.forEach(data => {
        if (data) {
          // Store the data in localStorage
          // Generate a unique key using userId and timestamp
          const uniqueKey = `${data.userId}_${data.timestamp}`;
          localStorage.setItem(uniqueKey, JSON.stringify({
            displayName: data.displayName,
            photoUrl: data.photoUrl,
            message: data.message,
            timestamp: data.timestamp,
            dateTime: data.dateTime
          }));
    
          // Push the message data to the messages array
          messages.push({
            displayName: data.displayName,
            photoUrl: data.photoUrl,
            message: data.message,
            timestamp: data.timestamp,
            dateTime: data.dateTime
          });
        }
      });
      // Sort messages by timestamp in descending order
      messages.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
      // Set the filtered messages state
      setFilteredMessages(messages);
    };    
    fetchMessages();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Update filtered messages when user input changes
  useEffect(() => {
    const filtered = filterMessageData(userInput);
    // Sort filtered messages by timestamp in descending order
    filtered.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
    setFilteredMessages(filtered);
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
          <div key={index} className={styles.message}>
            <img src={message.photoUrl} alt={message.displayName} className={styles.userPhoto} />
            <div>
              <p>{message.displayName}</p>
              <p>{message.message}</p>
              <p>{message.dateTime}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );  
}
