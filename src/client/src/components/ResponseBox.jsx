import React from 'react';

export const ResponseBox = (props) => {
	return (
		<div className="response-box">
			<div className="response-time-div">{props.response.time}</div>
			<div className="response-name-div">{props.response.responderName}</div>
			<div className="message-content-div">{props.response.responseContent}</div>
		</div>
	)
};
