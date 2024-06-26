# ChatApp

## **Overview**

**Project Summary**

DevChat is a web-based chat application built for developers. Anyone can see the conversation history, however, only people with a GitHub account are able to contribute to the conversation.
https://devpost.com/software/chatapp-2jenta

**Authors**

- Stephen Keeler - SMan24 – keelers@seas.upenn.edu - [GitHub](https://github.com/Stephman1)
- Shariq Lalani - slalani13 – shariqla@seas.upenn.edu - [GitHub](https://github.com/slalani13)
- Ryan Morgan - Ryan-the-Engineer – rymorgan@seas.upenn.edu - [GitHub](https://github.com/MisutaKohi)

## **Usage**

### **Prerequisites** 
```
Docker Engine
Node.js (v20.12.2)
```

### **Installation**

Step 1.
Navigate to the chat-server folder, which contains a Docker file. Build the docker image for the web server.
```
docker build -t chat-server .
```
You can now run a Docker container with the chat-server image when ready to deploy the web server.

Step 2.
Navigate to the web-client folder. Build the web client.
```
// Check that npm is installed. If you have downloaded Node.js, npm should aleady be installed.
npm --version
// You may need to install Next.js CLI locally
npm i next
// Build the web client
npm run build
```
You can now start the web client when ready to deploy.

### **Deployment**

Step 1.
Run the Docker container for the web server.
```
docker run -p 3001:3001 --name my-chat-server-container --rm chat-server
```
The server is now running in the Docker container and listening at http://localhost:3001.

Step 2.
Navigate to the web-client folder. Start the web client.
```
// Run the web client
npm run start
```
The web client is now running and can be accessed at http://localhost:3000.

## **Additional information**

As of 05/07/2024, a user would need the author's firebase credentials so that the server can connect to the Firestore database. However, going forward this will be modified and instead users will login to the website and this will allow them to view and send messages without needing credentials supplied by the author. This will be achieved by hosting the web server in Google Cloud.

### **Tools used**

[Next.js](https://nextjs.org/) - We used Next.js to build a server-rendered website.

[Firebase](https://firebase.google.com/)  - Firebase is a set of backend cloud computing services and application development platforms provided by Google. We used it for authenticating users through their GitHub accounts and to host the Firestore NoSQL database.

[Firestore](https://firebase.google.com/docs/firestore) - We used the Firestore NoSQL cloud database for storing messages and user information.

[Cloud Functions](https://cloud.google.com/functions?hl=en) - We used Google Cloud functions to store new GitHub users in the Firestore database and to limit the messages collection to 10 messages.

[Express](https://expressjs.com/) - We used Express for building RESTful APIs with Node.js.

## **Acknowledgments**

Our project was originally inspired by the textbook: [Head First Java](https://www.oreilly.com/library/view/head-first-java/9781492091646/). In Chapter 17, You'll find some sample code for a very simple chat app. The authors finish the chapter by issuing a challenge that you come back and enhance the code as your skills improve.

## **License**

This package is licensed under the GNU General Public License v3.0 [GPL-3](https://choosealicense.com/licenses/gpl-3.0/).


