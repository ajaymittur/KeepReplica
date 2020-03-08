import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function LoginForm(props) {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			let response = await axios.post("https://keepreplica.herokuapp.com/user/login", formData);
			if (response.data.success)
				props.history.push({
					pathname: "/home",
					state: {
						displayName: response.data.displayName
					}
				});
			else setError({ message: response.data.message });
		} catch (error) {
			setError({ message: error.message });
		}
	};

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='orange' textAlign='center'>
					Log-in to your account
				</Header>
				<Form size='large'>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='E-mail address'
							name='email'
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							name='password'
							onChange={handleChange}
						/>

						<Button color='orange' fluid size='large' onClick={handleSubmit}>
							Login
						</Button>
					</Segment>
				</Form>
				<Message>
					New to us? <Link to='/signup'>Sign Up</Link>
				</Message>
				{Object.entries(error).length > 0 && (
					<Message
						error
						header='Could Not Sign In'
						list={Object.keys(error).map(key => error[key])}
						size='small'
					/>
				)}
			</Grid.Column>
		</Grid>
	);
}

export default withRouter(LoginForm);
