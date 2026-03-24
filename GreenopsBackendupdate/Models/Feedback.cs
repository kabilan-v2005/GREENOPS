namespace Greenops.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }   // PRIMARY KEY

        public int UserId { get; set; }

        public string FeedbackContent { get; set; }

        public DateTime SubmittedDate { get; set; }
    }
}