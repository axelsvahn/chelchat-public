using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChelChat.Models;
using System.Collections.Generic;
using System;

namespace ChelChat.Hubs
{
	public class ChatHub : Hub
	{
		private static List<Message> messages = new();

		public static List<Message> Messages
		{
			get { return messages; }
			set { messages = value; }
		}

		public void SendToAllClients(Message message)
		{
			Messages.Add(message);
			Clients.All.SendAsync("SendToAllClients", message);
		}

		public void SendHistory()
		{
			//The list of messages is only sent out upon request
			Clients.Caller.SendAsync("SendHistory", Messages);
		}

		public void SendIdentifier()
		{
			//The identifier is sent at startup
			Clients.Caller.SendAsync("SendIdentifier", Context.ConnectionId);

		}

		public void SendResponseToAllClients(Response response)
		{
			//updates chat history with response: this mirrors the client-side code
			//the advantage of mirroring code is that entire updated chat history does not have
			//to be sent to all clients every time someone sends a response
			for (int i = 0; i < Messages.Count; i++)
			{
				if (Messages[i].Id == response.ResponseTo)
				{
					Messages[i].Responses.Add(response);
				}
			}
			Clients.All.SendAsync("SendResponseToAllClients", response);
		}

		public void SendDeleteRequestToAllClients(DeleteRequest deleterequest)
		{
			//updates chat history with response: this mirrors the client-side code
			//this means that the code below is only used to update the initial array that is
			//sent to clients when they log in.
			for (int i = 0; i < Messages.Count; i++)
			{
				if (Messages[i].Id == deleterequest.Id)
				{
					Messages.Remove(Messages[i]);
				}
			}
			Clients.All.SendAsync("SendDeleteRequestToAllClients", deleterequest);
		}
	}
}