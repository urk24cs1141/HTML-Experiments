# Experiment 11: Database Integration in NodeJS Application using MongoDB

## Aim

To develop a NodeJS application that connects to MongoDB and performs CRUD operations.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Visual Studio Code

## Description

This experiment demonstrates how to connect a NodeJS application to MongoDB and perform Create, Read, Update, and Delete operations on student records.

## Database Details

* Database Name: `studentdb`
* Collection Name: `students`
* Server URL: `http://localhost:3000`

## CRUD Operations

| Operation            | HTTP Method | Endpoint           |
| -------------------- | ----------- | ------------------ |
| Create Student       | POST        | `/students`        |
| Display All Students | GET         | `/students`        |
| Read One Student     | GET         | `/students/:regNo` |
| Update Student       | PUT         | `/students/:regNo` |
| Delete Student       | DELETE      | `/students/:regNo` |

## How to Run the Project

1. Install Node.js and MongoDB.
2. Start the MongoDB service.
3. Open the project folder in VS Code.
4. Install the required packages using `npm install`.
5. Run the application using `node app.js`.
6. Open `http://localhost:3000` in your browser.

## Result

The NodeJS application was connected to MongoDB using Mongoose, and CRUD operations for student records were implemented and tested.
