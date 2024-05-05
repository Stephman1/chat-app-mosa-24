import styles from "./page.module.css";

export default function Navigate() {
  return (
    <main className={styles.main}>
      <ul>
        <li className={styles.listElement}><a href="/" className={styles.link}>Home</a></li>
        <li className={styles.listElement}><a href="/chat" className={styles.link}>Chat</a></li>
        <li className={styles.listElement}><a href="/search" className={styles.link}>Search</a></li>
        <li className={styles.listElement}><a href="/about-us" className={styles.link}>About Us</a></li>
      </ul>
    </main>
  );
}