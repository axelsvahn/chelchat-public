import React, { useState } from "react";

export const ResponseForm = (props) => {

	const [values, setValues] = useState({
		responderName: "",
		responseContent: "",
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

		let responseObject = {
			id: Date.now().toString(),
			time: new Date().toLocaleString('sv-SE', { timeZone: 'CET' }),
			responseTo: props.responseTo,
			...values,
		};
		//Some data validation
		if (responseObject.responderName && responseObject.responseContent) {
			props.sendResponse(responseObject);
		}
		else {
			console.error("invalid response submitted");
		}
		//this clears the input fields
		setValues((values) => ({
			responderName: "",
			responseContent: "",
		}));

	}

	return (
		<div className="new-response-form">
			<div id="response-form-div" className="form-div">
				<form id="response-form" autoComplete="off" onSubmit={handleSubmit}>
					<div className="form-group">
						<input style={{ width: "70%" }}
							name="responderName"
							placeholder="Namn"
							value={values.responderName}
							onChange={handleChange} />
						<br />
						<textarea style={{ width: "70%" }}
							name="responseContent"
							rows={2}
							cols={20}
							placeholder="Meddelande"
							value={values.responseContent}
							onChange={handleChange} />
					</div>
					<button type="submit" className="btn btn-primary chat-btn" id="submit-response" >Svara</button>
				</form>
			</div>
		</div>
	)
};
