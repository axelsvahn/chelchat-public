using System.Collections.Generic;

namespace ChelChat.Models
{
	public class Message
	{
		public string Id { get; set; }
		public string PosterIdentifier { get; set; }
		public string Time { get; set; }
		public string UserName { get; set; }
		public string MessageContent { get; set; }
		public string Hashtag { get; set; }
		private List<Response> responses = new();

		public List<Response> Responses
		{
			get { return responses; }
			set { responses = value; }
		}
	}
}