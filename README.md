# MOSA-Spring-Hackathon-2024

**Guidelines**
You are free to use whatever language(s) for the MOSA Summer of Code Project, and there is no limit on the number or type(s) of framework(s) you will adopt. But you should keep all your code in a single GitHub org or repo, so that it will be better organised for the purposes of evaluation.

## **ChatApp**

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
Node.js
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

### **Tools used**
Which frameworks, libraries, or other tools did you use to create your project?


[Tool 1](https://maven.apache.org/) - Description (e.g. "Web framework used")

[Tool 2](https://maven.apache.org/)  - Description 

[Tool 3](https://maven.apache.org/) - Description 

## **Acknowledgments**
Use anyone else's code? Inspired by a particular project? List / link here.

Item 1

Item 2

Item 3

## **License**
If desired, add a section for your license. Reference sites like (https://choosealicense.com/) can help you choose which license meets your needs.

For example:

This package is licensed under the GNU General Public License v3.0 [GPL-3](https://choosealicense.com/licenses/gpl-3.0/).


