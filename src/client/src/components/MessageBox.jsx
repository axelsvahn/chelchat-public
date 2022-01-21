import React from 'react';
import { ResponseBox } from './ResponseBox';
import { ResponseForm } from './ResponseForm';

export const MessageBox = (props) => {

	const Responses = () => {
		if (props.message.responses.length > 0) {
			const responses = props.message.responses.map((response) => {
				return (
					<li key={response.id}>
						<ResponseBox response={response} />
					</li>
				);
			});
			return responses;
		}
		return null;
	};

	const handleDelete = () => {
		let deleteRequest = {
			id: props.message.id
		};
		props.sendDeleteRequest(deleteRequest);
	};

	return (
		<div className="message-box">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ textAlign: "left" }} className="message-id-div">
					{props.message.time}
				</div>
				{/* delete button is conditionally rendered only if current user posted the message */}
				{
					props.userIdentifier === props.message.posterIdentifier && <div id="delete-div">
						<button type="submit" className="btn btn-outline-danger delete-btn" id="submit-delete"
							onClick={() => handleDelete()}
						>Ta bort
						</button>
					</div>
				}
			</div>

			<div className="message-name-div" style={{ marginLeft: "1em" }}>
				{props.message.userName}
			</div>
			<div className="message-content-div" style={{ marginLeft: "1em" }}>
				{props.message.messageContent}
			</div>
			{props.message.hashtag && <div className="message-hashtag-div">
				<div style={{ fontSize: "1.2em", color: "blue", cursor: "pointer", textAlign: "left", marginLeft: "1em" }} onClick={() => props.switchHashtag(props.message.hashtag)}>#{props.message.hashtag}</div>
			</div>}

			<br />
			<div className="response-div">
				<ul>
					<Responses />
				</ul>
			</div>
			<ResponseForm responseTo={props.message.id} sendResponse={props.sendResponse} />

		</div>
	)
};
