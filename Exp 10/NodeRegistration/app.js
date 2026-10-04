const http = require("http");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const server = http.createServer(async (req, res) => {

    // Display the registration form
    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        fs.createReadStream("./home.html").pipe(res);
    }

    // Handle form submission
    else if (req.url === "/server" && req.method === "POST") {

        let rawData = "";

        req.on("data", (data) => {
            rawData += data;
        });

        req.on("end", async () => {

            const inputData = new URLSearchParams(rawData);

            const name = inputData.get("name");
            const password = inputData.get("password");
            const age = inputData.get("age");
            const mobile = inputData.get("mobile");
            const email = inputData.get("email");
            const gender = inputData.get("gender");
            const state = inputData.get("state");

            const skills = inputData.getAll("skills");

            try {

                await client.connect();

                const db = client.db("registrationDB");

                const collection = db.collection("users");

                const user = {
                    name: name,
                    password: password,
                    age: age,
                    mobile: mobile,
                    email: email,
                    gender: gender,
                    state: state,
                    skills: skills
                };

                await collection.insertOne(user);

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.write(`
                    <html>

                    <head>

                        <title>
                            User Submitted Details
                        </title>

                        <style>

                            body {
                                font-family: Arial;
                            }

                            h1 {
                                text-align: center;
                                color: blue;
                                text-decoration: underline;
                            }

                            table {
                                border-collapse: collapse;
                                width: 70%;
                                margin: auto;
                            }

                            th, td {
                                border: 1px solid black;
                                padding: 10px;
                                text-align: left;
                            }

                        </style>

                    </head>

                    <body>

                        <h1>User Submitted Details</h1>

                        <table>

                            <tr>
                                <th>Name</th>
                                <td>${name}</td>
                            </tr>

                            <tr>
                                <th>Password</th>
                                <td>${password}</td>
                            </tr>

                            <tr>
                                <th>Age</th>
                                <td>${age}</td>
                            </tr>

                            <tr>
                                <th>Mobile Number</th>
                                <td>${mobile}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>${email}</td>
                            </tr>

                            <tr>
                                <th>Gender</th>
                                <td>${gender}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>${state}</td>
                            </tr>

                            <tr>
                                <th>Skills</th>
                                <td>${skills.join(", ")}</td>
                            </tr>

                        </table>

                    </body>

                    </html>
                `);

                res.end();

            }

            catch (error) {

                console.log(error);

                res.writeHead(500, {
                    "Content-Type": "text/html"
                });

                res.end("Database connection error");
            }
        });
    }

    else {

        res.writeHead(404);

        res.end("Page Not Found");
    }

});

server.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});