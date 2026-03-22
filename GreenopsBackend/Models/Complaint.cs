using System.ComponentModel.DataAnnotations;

namespace Greenops.Models
{
    public class Complaint
    {
        [Key]
        public int ComplaintId { get; set; }

        public int UserId { get; set; }

        public string ComplaintDescription { get; set; }

        public string ProofImage { get; set; }

        public DateTime ComplaintDate { get; set; }

        public string? Status { get; set; }
    }
}