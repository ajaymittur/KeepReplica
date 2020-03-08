const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Uncomment if running locally
// const dotenv = require("dotenv");
// dotenv.config();

const userRoutes = require("./firebaseRoutes/userRoutes");
const noteRoutes = require("./firebaseRoutes/noteRoutes");
const todoRoutes = require("./firebaseRoutes/todoRoutes");

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Content-Length, Accept"
	);
	next();
});

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
app.use("/todos", todoRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
