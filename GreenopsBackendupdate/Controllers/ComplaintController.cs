using Microsoft.AspNetCore.Mvc;
//using Greenops.Data;
using Greenops.Models;
using GreenopsAPI.Data;
using Microsoft.AspNetCore.Authorization;

namespace Greenops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ComplaintController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost("register")]
        public IActionResult RegisterComplaint(Complaint complaint)
        {
            complaint.ComplaintDate = DateTime.Now;
            complaint.Status = "Pending";

            _context.Complaints.Add(complaint);
            _context.SaveChanges();

            return Ok(complaint);
        }
        [Authorize]
        [HttpGet("all")]
        public IActionResult GetAllComplaints()
        {
            var complaints = _context.Complaints.ToList();

            return Ok(complaints);
        }
    }
}