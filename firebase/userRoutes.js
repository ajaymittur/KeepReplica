const express = require("express");
const router = express.Router();
const firebase = require("firebase");

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);

const fireAuth = firebase.auth();

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	try {
		let userRecord = await fireAuth.createUserWithEmailAndPassword(email, password);
		res.status(200).json({
			success: true,
			message: `Successfully created new user: ${userRecord.user.uid}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { username, email, password } = req.body;
	try {
		let userRecord = await fireAuth.signInWithEmailAndPassword(email, password);
		let user = fireAuth.currentUser;
		user.updateProfile({
			displayName: username
		});
		res.status(200).json({
			success: true,
			message: `Successfully logged in user: ${userRecord.user.uid}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

module.exports = router;
