namespace Greenops.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public int BuyerId { get; set; }

        public int SellerId { get; set; }

        public decimal ProductPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public string? OrderStatus { get; set; }
    }
}