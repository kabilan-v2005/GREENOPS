using Microsoft.AspNetCore.Mvc;
using Greenops.Models;
using GreenopsAPI.Data;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace Greenops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResaleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResaleController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost("add")]
        public IActionResult AddItem([FromBody] ResaleItem item)
        {
            item.PostedDate = DateTime.Now;
            item.ProductStatus = "Available";

            // For now, just store image as string (or empty)
            if (string.IsNullOrEmpty(item.ProductImage))
            {
                item.ProductImage = "";
            }

            _context.ResaleItems.Add(item);
            _context.SaveChanges();

            return Ok(item);
        }
        [Authorize]
        [HttpGet("items")]
        public IActionResult GetAllItems()
        {
            var items = _context.ResaleItems.ToList();
            return Ok(items);
        }
        [Authorize]
        [HttpGet("user/{userId}")]
        public IActionResult GetUserProducts(int userId)
        {
            var items = _context.ResaleItems
                .Where(p => p.UserId == userId)
                .ToList();

            return Ok(items);
        }
        
    }
}