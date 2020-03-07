const express = require("express");
const app = express();
const port = 8000;

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./firebase/userRoutes");

app.use((req, res, next) => {
	console.log("Time: ", Date.now(), "Endpoint: ", req.originalUrl);
	next();
});
app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
