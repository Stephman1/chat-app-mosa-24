import styles from "./page.module.css";

export default function Search() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>A little about us...</h1>
        <div className={styles.subcontainer}>
          <p>Hi, we're Shariq, Ryan, and Stephen!</p>
          <p>We're SWEs to be in Penn Engineering's Master of Computer and Information Technology 
            program. This is our first collab together and I hope to speak for all of us when I say that 
            we're happy how this project for MOSA's Summer 2024 Hackathon turned out!</p>
          <p>Our project was originally inspired by the textbook: Head First Java. In Chapter 17,
            You'll find some sample code for a very simple Chat App. The authors finish the chapter
            by issuing a challenge that you come back and enhance the code as your skills improve.
          </p>
          <p>DevChat is a pretty steep departure from the original sample code in Head First Java, 
            featuring Cloud Native Architecture in Google Cloud, modern web libraries like NextJs and Express,
            Cloud Functions, User Authentication via Firebase, and even a fully hosted Firebase NoSQL database.
          </p>
          <p>DevChat was built by developers, for developers. Although anyone can see the conversation,
            only people with a GitHub account are able to authenticate and then actually send messages.
          </p>
          <p>It's been a blast - we hope you enjoy!</p>
        </div>
      </div>
    </main>
  )
}