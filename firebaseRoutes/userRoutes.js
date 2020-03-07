const express = require("express");
const router = express.Router();
const firebase = require("./firebaseInitialize");

const auth = firebase.auth();

router.post("/signup", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		let userRecord = await auth.createUserWithEmailAndPassword(email, password);

		userRecord.user.updateProfile({
			displayName: username
		});

		res.status(200).json({
			success: true,
			message: `Successfully created new user: ${userRecord.user.uid}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		let userRecord = await auth.signInWithEmailAndPassword(email, password);

		res.status(200).json({
			success: true,
			message: `Successfully logged in user: ${userRecord.user.uid}`,
			displayName: userRecord.user.displayName
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

module.exports = router;
