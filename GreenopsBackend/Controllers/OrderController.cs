using Microsoft.AspNetCore.Mvc;
//using Greenops.Data;
using Greenops.Models;
using GreenopsAPI.Data;

namespace Greenops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("buy")]
        public IActionResult BuyProduct([FromBody] Order order)
        {
            // 🔍 check product
            var product = _context.ResaleItems
                .FirstOrDefault(p => p.ProductId == order.ProductId);

            if (product == null)
                return BadRequest("Product not found");

            if (product.ProductStatus != "Available")
                return BadRequest("Already sold");

            // 📝 fill order details
            order.OrderDate = DateTime.Now;
            order.OrderStatus = "Ordered";

            // 🔥 mark product sold
            product.ProductStatus = "Sold";

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok(order);
        }
        [HttpGet("user/{userId}")]
        public IActionResult GetUserOrders(int userId)
        {
            var orders = _context.Orders
                .Where(o => o.BuyerId == userId)
                .ToList();

            return Ok(orders);
        }
    }
}