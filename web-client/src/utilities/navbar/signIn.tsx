import { signInWithGithub, signOut } from "@/utilities/firebase/firebase";
import { User } from "firebase/auth";

import styles from "./signIn.module.css";

interface SignInProps {
  user: User | null;
}

export default function SignInBtn(user : SignInProps) {
  return (
    <div>
      {
        /* ternary operator - if user is logged in, display sign out button, 
        else display sign in button*/
        (user) ? (
          <button className={styles.button} onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={signInWithGithub}>
            Sign In
          </button>
        )
      }
    </div>
  );
}