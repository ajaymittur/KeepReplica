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
	const { content, checked, userId } = req.body;

	try {
		let addDoc = await db.collection("todos").add({
			userId,
			content,
			checked
		});

		res.status(200).json({
			success: true,
			message: `Successfully added todo: ${addDoc.id}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get("/:todoId/delete", userLoggedIn, async (req, res) => {
	const { todoId } = req.params;

	try {
		let deleteDoc = db
			.collection("todos")
			.doc(todoId)
			.delete();

		res.status(200).json({
			success: true,
			message: `Successfully deleted todo: ${todoId}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get("/:todoId/check", userLoggedIn, async (req, res) => {
	const { todoId } = req.params;

	try {
		let doc = db.collection("todos").doc(todoId);
		let { checked } = (await doc.get()).data();
		await doc.update({
			checked: !checked
		});

		res.status(200).json({
			success: true,
			message: `Successfully checked/unchecked todo: ${todoId}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get("/all", userLoggedIn, async (req, res) => {
	const { userId } = req.body;

	try {
		let todos = await db
			.collection("todos")
			.where("userId", "==", userId)
			.get();

		if (todos.empty) {
			throw { message: `No todos for user ${userId} found` };
		} else {
			todosArray = [];
			todos.forEach(doc => {
				let { content, checked } = doc.data();
				let todoId = doc.id;
				todosArray.push({ todoId, content, checked });
			});

			res.status(200).json({
				success: true,
				message: `Successfully obtained ${todosArray.length} todos`,
				todos: todosArray
			});
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

module.exports = router;
