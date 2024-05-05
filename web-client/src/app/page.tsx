import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.welcomeText}>
        Welcome <br></br> to <span className={styles.siteName}>DevChat</span>.
      </h1>
      <h3 className={styles.welcomeSubtext}>A place for devs to meet and collaborate.</h3>
      
      <div className={styles.buttons}>
        <form action="/chat" method="get">
          <button className={styles.button} type="submit">Chat</button>
        </form>
        <form action="/search" method="get">
          <button className={styles.button} type="submit">Search</button>
        </form>
      </div>
      
      <div className={styles.noticeContainer}>
        <p>Please excuse the mess. We're in Beta.</p>
      </div>
    </main>
  );
}
