namespace ChelChat.Models
{
	public class Response
	{
		public string Id { get; set; }
		public string Time { get; set; }

		public string ResponseTo { get; set; }

		public string ResponderName { get; set; }

		public string ResponseContent { get; set; }
	}
}