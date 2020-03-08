import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Grid, Header, Message, Checkbox, Image, Divider } from "semantic-ui-react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Linkify from "react-linkify";

function MainPage(props) {
	const [data, setData] = useState();
	const [notes, setNotes] = useState();
	const [todos, setTodos] = useState();
	const [images, setImages] = useState([]);
	const [checkChanged, setCheckChanged] = useState(0);
	const [noteChanged, setNoteChanged] = useState(0);
	const [todoChanged, setTodoChanged] = useState(0);
	const imageInputRef = useRef(null);

	useEffect(() => {
		axios
			.get("https://keepreplica.herokuapp.com/notes/all")
			.then(res => {
				setNotes(res.data.notes);
			})
			.catch(err => console.log);
		axios
			.get("https://keepreplica.herokuapp.com/todos/all")
			.then(res => {
				setTodos(res.data.todos);
			})
			.catch(err => console.log);
	}, [checkChanged, noteChanged, todoChanged]);

	const addNote = async () => {
		if (data.length > 0) {
			await axios.post("https://keepreplica.herokuapp.com/notes/add", { content: data });
			setNoteChanged(noteChanged + 1);
		}
	};

	const addTodo = async () => {
		if (data.length > 0) {
			await axios.post("https://keepreplica.herokuapp.com/todos/add", {
				content: data,
				checked: false
			});
			setTodoChanged(todoChanged + 1);
		}
	};

	const handleChange = e => {
		setData(e.target.value);
	};

	const changeCheck = async id => {
		await axios.get(`https://keepreplica.herokuapp.com/todos/${id}/check`);
		setCheckChanged(checkChanged + 1);
	};

	const deleteNote = async id => {
		await axios.get(`https://keepreplica.herokuapp.com/notes/${id}/delete`);
		setNoteChanged(noteChanged + 1);
	};

	const deleteTodo = async id => {
		await axios.get(`https://keepreplica.herokuapp.com/todos/${id}/delete`);
		setTodoChanged(todoChanged + 1);
	};

	const imageChange = e => {
		let img = e.target.files[0];
		setImages([...images, img]);
	};

	const deleteImage = file => {
		let newImgsArray = images.filter(img => img !== file);
		setImages(newImgsArray);
	};

	return (
		<div>
			<Header
				as='h3'
				textAlign='center'
				content={`${props.location.state.displayName}'s Notes`}
				color='orange'
				style={{ marginTop: "3em" }}
			/>
			<Grid
				style={{ height: "100vh", padding: "10px 0 0 10px", width: "80%", margin: "auto" }}
				columns={3}
				divided
			>
				<Grid.Column>
					<Header as='h4' textAlign='center' content='Notes' color='grey' />
					{notes &&
						notes.map(note => (
							<Message color='orange' key={note.noteId}>
								<Linkify>{note.content}</Linkify>
								<Button
									icon='remove'
									color='orange'
									inverted
									style={{ float: "right", padding: "2px" }}
									onClick={() => deleteNote(note.noteId)}
								/>
							</Message>
						))}
				</Grid.Column>
				<Grid.Column>
					<Header as='h4' textAlign='center' content='Todo' color='grey' />
					{todos &&
						todos.map(todo => (
							<Message color='orange' key={todo.todoId}>
								<Linkify>
									<Checkbox
										label={todo.content}
										checked={todo.checked}
										onChange={() => changeCheck(todo.todoId)}
									/>
								</Linkify>
								<Button
									icon='remove'
									color='orange'
									inverted
									style={{ float: "right", padding: "2px" }}
									onClick={() => deleteTodo(todo.todoId)}
								/>
							</Message>
						))}
				</Grid.Column>
				<Grid.Column>
					<Header as='h4' textAlign='center' content='Images' color='grey' />
					{images &&
						images.map((img, i) => (
							<Message color='orange' key={i}>
								<Image
									src={URL.createObjectURL(img)}
									size='tiny'
									centered
									verticalAlign='middle'
								></Image>
								<Button
									icon='remove'
									color='orange'
									inverted
									style={{ float: "right", padding: "2px" }}
									onClick={() => deleteImage(img)}
								/>
							</Message>
						))}
				</Grid.Column>
				<Form style={{ margin: "auto" }}>
					<Form.TextArea placeholder='Add note/todo' onChange={handleChange} />
					<Button color='orange' inverted onClick={addNote}>
						Add Note
					</Button>
					<Button color='orange' inverted onClick={addTodo}>
						Add Todo
					</Button>
					<Button
						color='orange'
						inverted
						content='Add Image'
						onClick={() => imageInputRef.current.click()}
					/>
					<input ref={imageInputRef} type='file' hidden onChange={imageChange} />
				</Form>
			</Grid>
		</div>
	);
}

export default withRouter(MainPage);
