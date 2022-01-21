export const sendMessage = async (connection, message) => {
	if (!connection.connectionStarted) { //guard clause
		console.error('No SignalR Connection');
		return;
	}
	try {
		await connection.send('SendToAllClients', message);

	}
	catch (err) {
		console.error("active connection but sending error ", err);
	}
};

export const sendResponse = async (connection, response) => {
	if (!connection.connectionStarted) { //guard clause
		console.error('No SignalR Connection');
		return;
	}
	try {
		await connection.send('SendResponseToAllClients', response);

	}
	catch (err) {
		console.error("active connection but sending error ", err);
	}
};

export const addResponseToMessageData = (response, messageData) => {
	let updatedMessages = messageData.map(
		(message) => {
			if (message.id === response.responseTo) {
				message.responses.push(response);
			}
			return message;
		});
	return updatedMessages;
};
