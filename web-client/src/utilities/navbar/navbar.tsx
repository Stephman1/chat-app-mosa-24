'use client';

import styles from "./navbar.module.css";
import SignInBtn from "./signIn";

import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "@/utilities/firebase/firebase";
import { User } from "firebase/auth";

function Navbar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [] /* No dependencies, never rerun */);

  return (
    <nav className={styles.nav}>
      <h1>ToDo: Logo</h1>
      <h1>DevChat</h1>
      {/* <SignInBtn user={user} /> */}
      <h1>ToDo: SignIn Button</h1>
    </nav>
  );
}

export default Navbar;