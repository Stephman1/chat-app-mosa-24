'use client';

import styles from "./navbar.module.css";
import SignInBtn from "./signIn";

import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "@/utilities/firebase/firebase";
import { User } from "firebase/auth";

function Navbar() {
  // 'closure' - JS will continue to maintain state of user even after function has executed
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  });

  console.log(`User: ${user}`); // displays to console state of user

  return (
    <nav className={styles.nav}>
      <h1>ToDo: Logo</h1>
      <h1>DevChat</h1>
      <SignInBtn user={user} />
    </nav>
  );
}

export default Navbar;