// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { NewMessageForm } from './NewMessageForm';
import { MessageFrame } from './MessageFrame';
import { HashtagList } from './HashtagList';
import * as signalR from '@microsoft/signalr';

export const MessagePage = () => {
	const [connection, setConnection] = useState(null);
	const [userIdentifier, setUserIdentifier] = useState(null);
	const [messageData, setMessageData] = useState([]);
	const [hashtag, setHashtag] = useState("");

	const latestMessageData = useRef(null); //used to avoid stale closure: could refactor to avoid this
	latestMessageData.current = messageData;

	//establish connection
	useEffect(() => {
		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl('https://localhost:5001/chatHub')
			.configureLogging(signalR.LogLevel.Information)
			.build();
		setConnection(newConnection);
	}, []);

	useEffect(() => {
		if (connection) {
			connection.start()
				.then(res => {
					//request identifier and chat history on start
					(async () => {
						if (!connection.connectionStarted) { //guard clause
							console.error('No SignalR Connection');
							return;
						}
						try {

							await connection.send('SendIdentifier');
							await connection.send('SendHistory');
						}
						catch (err) {
							console.error("active connection but sending error ", err);
						}
					})();

					connection.on('SendIdentifier', (identifier) => {
						// console.log("got identifier", identifier);
						setUserIdentifier(() => identifier);

					});

					connection.on('SendHistory', (history) => {
						// console.log("got history", history);
						setMessageData(() => [...history]);

					});

					connection.on('SendToAllClients', message => {
						setMessageData((prevMessageData) => [...prevMessageData, message]);
					});

					connection.on('SendResponseToAllClients', response => {
						let updatedMessages = addResponseToMessageData(response, latestMessageData.current); //useref avoids state state
						setMessageData(() => [...updatedMessages]);
					});

					connection.on('SendDeleteRequestToAllClients', deleteRequest => {
						// console.log("received", deleteRequest);
						let updatedMessages = removeMessageFromMessageData(deleteRequest, latestMessageData.current); //useref avoids stale state
						setMessageData(() => [...updatedMessages]);
					});
				})
				.catch(err => console.error('Connection interrupted: ', err));
		}
	}, [connection]);

	const sendAbstraction = async (method, data) => {
		if (!connection.connectionStarted) { //guard clause
			console.error('No SignalR Connection');
			return;
		}
		try {
			await connection.send(method, data);

		}
		catch (err) {
			console.error("active connection but sending error ", err);
		}
	};

	const sendMessage = async (message) => {
		sendAbstraction('SendToAllClients', message);
	};

	const sendResponse = async (response) => {
		sendAbstraction('SendResponseToAllClients', response);
	};

	const sendDeleteRequest = async (deleteRequest) => {
		sendAbstraction('SendDeleteRequestToAllClients', deleteRequest);
	};

	const addResponseToMessageData = (response, messageData) => {
		let updatedMessages = messageData.map(
			(message) => {
				if (message.id === response.responseTo) {
					message.responses.push(response);
				}
				return message;
			});
		return updatedMessages;
	};

	const removeMessageFromMessageData = (deleteRequest, messageData) => {
		let updatedMessages = messageData.filter(
			(message) => {
				return message.id !== deleteRequest.id
			});
		// console.log("updated", updatedMessages);
		return updatedMessages;
	};

	const switchHashtag = (hashtag) => {
		setHashtag(hashtag);
	};

	const clearHashtag = () => {
		setHashtag("");
	};

	return (

		<div className="messagePage">
			<div className="container-1">
				{/* left column */}
				<div className="box-1">
					<h1>ChelChat</h1>
					<p className="chelLink" >
						<a href="https://localhost:4000/" className="btn btn-outline-secondary">Till hotellets dashboard</a>
					</p>
					<NewMessageForm
						sendMessage={sendMessage}
						userIdentifier={userIdentifier} />
					<HashtagList
						messageData={messageData}
						switchHashtag={switchHashtag} />
				</div>
				{/* main column */}
				<div className="box-2">
					<MessageFrame
						userIdentifier={userIdentifier}
						messageData={messageData}
						hashtag={hashtag}
						sendResponse={sendResponse}
						clearHashtag={clearHashtag}
						switchHashtag={switchHashtag}
						sendDeleteRequest={sendDeleteRequest} />
				</div>
			</div>
		</div>
	)
};