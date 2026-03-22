using System.ComponentModel.DataAnnotations;

namespace Greenops.Models
{
    public class ResaleItem
    {
        [Key]
        public int ProductId { get; set; }

        public int UserId { get; set; }

        public string ProductName { get; set; }

        public string ProductDetails { get; set; }

        public int UsageYears { get; set; }

        public decimal ProductPrice { get; set; }

        public string ProductImage { get; set; }

        public DateTime PostedDate { get; set; }

        public string? ProductStatus { get; set; }
    }
}