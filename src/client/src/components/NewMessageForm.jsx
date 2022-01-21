import React, { useState } from "react";

export const NewMessageForm = (props) => {

	const [values, setValues] = useState({
		userName: "",
		messageContent: "",
		hashtag: "",
	});

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setValues((values) => ({
			...values,
			[name]: value
		}));
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setValues((values) => ({
			...values,
		}));

		let messageObject = {
			id: Date.now().toString(),
			posterIdentifier: props.userIdentifier,
			time: new Date().toLocaleString('sv-SE', { timeZone: 'CET' }),
			...values,
			responses: []
		};

		//data validation: checks for empty strings
		if (messageObject.userName && messageObject.messageContent) {
			props.sendMessage(messageObject); //sends to messagePage
		}
		else {
			console.error("invalid message submitted");
		}

		//this clears the input fields and state
		setValues((values) => ({
			userName: "",
			messageContent: "",
			hashtag: ""
		}));

	}

	return (
		<div className="new-message-form">
			<div id="message-form-div" className="form-div">
				<form id="message-form" autoComplete="off" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>
							Namn
							<br />
							<input style={{ width: "90%" }}
								name="userName"
								placeholder=""
								value={values.userName}
								onChange={handleChange} />
						</label>
						<br />
						<label>
							Meddelande
							<br />
							<textarea style={{ width: "90%" }}
								name="messageContent"
								rows={2}
								cols={30}
								placeholder=""
								value={values.messageContent}
								onChange={handleChange} />
						</label>
						<br />
						<label>
							Hashtag (ej obligatorisk)
							<br />
							<input style={{ width: "90%" }}
								name="hashtag"
								placeholder=""
								value={values.hashtag}
								onChange={handleChange} />
						</label>
					</div>
					<button type="submit" className="btn btn-primary chat-btn" id="submit-message" >Skicka</button>
				</form>
			</div>
		</div>
	)
};
