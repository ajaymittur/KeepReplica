const express = require("express");
const router = express.Router();
const firebase = require("./firebaseInitialize");

const auth = firebase.auth();
const db = firebase.firestore();

userLoggedIn = (req, res, next) => {
	let user = auth.currentUser;

	if (!user) {
		res.status(400).json({ success: false, message: "User not logged in" });
	}

	req.body.userId = user.uid;

	next();
};

router.post("/add", userLoggedIn, async (req, res) => {
	const { data, userId } = req.body;
	// let user = auth.currentUser;

	// if (!user) {
	// 	res.status(400).json({ success: false, message: "User not logged in" });
	// }

	try {
		let addDoc = await db.collection("notes").add({
			userId,
			data
		});

		res.status(200).json({
			success: true,
			message: `Successfully added note: ${addDoc.id}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get("/:noteId/delete", userLoggedIn, async (req, res) => {
	// let user = auth.currentUser;

	// if (!user) {
	// 	res.status(400).json({ success: false, message: "User not logged in" });
	// }
	const { noteId } = req.params;
	try {
		let deleteDoc = db
			.collection("notes")
			.doc(noteId)
			.delete();

		res.status(200).json({
			success: true,
			message: `Successfully deleted note: ${noteId}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get("/all", userLoggedIn, async (req, res) => {
	const { userId } = req.body;

	try {
		let notes = await db
			.collection("notes")
			.where("userId", "==", userId)
			.get();

		if (notes.empty) {
			throw { message: `No notes for user ${userId} found` };
		} else {
			notesArray = [];
			notes.forEach(doc => {
				let { data } = doc.data();
				let noteId = doc.id;
				notesArray.push({ noteId, data });
			});

			res.status(200).json({
				success: true,
				message: `Successfully obtained ${notesArray.length} notes`,
				notes: notesArray
			});
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

module.exports = router;
