using Microsoft.AspNetCore.Http;

public class ResaleItemDto
{
    public int UserId { get; set; }

    public string ProductName { get; set; }

    public string ProductDetails { get; set; }

    public int UsageYears { get; set; }

    public decimal ProductPrice { get; set; }

    public IFormFile ProductImage { get; set; }
}