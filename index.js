const express = require("express");
const app = express();
const port = 8000;

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./firebaseRoutes/userRoutes");
const noteRoutes = require("./firebaseRoutes/noteRoutes");
const todoRoutes = require("./firebaseRoutes/todoRoutes");

app.use((req, res, next) => {
	let date = new Date();
	console.log(
		`Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Endpoint: ${
			req.originalUrl
		}`
	);
	next();
});

app.use(express.json());

app.use("/user", userRoutes);
app.use("/notes", noteRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
