import React from 'react';
import { MessageBox } from './MessageBox';

export const MessageFrame = (props) => {
	let hashtag = props.hashtag;
	const Messages = () => {

		let messages = props.messageData;

		if (hashtag !== "") {
			messages = messages.filter((message) => {
				return message.hashtag === hashtag;
			})
		}

		let result = messages.map((message) => {
			return (
				<li key={message.id}>
					<MessageBox
						userIdentifier={props.userIdentifier}
						message={message}
						sendResponse={props.sendResponse}
						switchHashtag={props.switchHashtag}
						sendDeleteRequest={props.sendDeleteRequest} />
				</li>
			);
		})

		return result;
	};

	return (
		<div className="messageFrame">
			{hashtag &&
				<>
					<h2>#{hashtag}</h2>
					<button className="btn btn-outline-secondary"
						onClick={props.clearHashtag}>rensa hashtag</button>
				</>}

			<ul>
				<Messages />
			</ul>
		</div>
	)
};
