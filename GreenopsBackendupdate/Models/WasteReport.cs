using System.ComponentModel.DataAnnotations;

namespace Greenops.Models
{
    public class WasteReport
    {
        [Key]
        public int ReportId { get; set; }

        public int UserId { get; set; }

        public string District { get; set; }

        public string Place { get; set; }

        public string Description { get; set; }

        public string? WasteImage { get; set; }

        public DateTime ReportDate { get; set; }
        // For WasteReport
    }
}