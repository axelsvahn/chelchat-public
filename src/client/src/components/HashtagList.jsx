import React from 'react';

export const HashtagList = (props) => {

	//filter out hashtags
	let hashtags1 = props.messageData
		.filter(message => message.hashtag)
		.map(message => message.hashtag);

	//remove duplicates
	let hashtags2 = [...new Set(hashtags1)];

	//map to list items
	let hashtagsFinal = hashtags2.map((hashtag) => {
		return (
			<li key={hashtag} style={{ display: "inline-block", textAlign: "center", marginRight: "10px" }}>
				<div style={{ fontSize: "1.1em", color: "blue", cursor: "pointer", textAlign: "center" }} onClick={() => props.switchHashtag(hashtag)}>#{hashtag}</div>
			</li>
		);

	});

	return (
		<div className="hashtag-box">
			<ul >
				{hashtagsFinal}
			</ul>
		</div>
	)
};
