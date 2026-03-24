using Microsoft.AspNetCore.Mvc;
//using Greenops.Data;
using Greenops.Models;
using GreenopsAPI.Data;

namespace Greenops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeedbackController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public IActionResult SubmitFeedback(Feedback feedback)
        {
            feedback.SubmittedDate = DateTime.Now;

            _context.Feedback.Add(feedback);
            _context.SaveChanges();

            return Ok(feedback);
        }

        [HttpGet("all")]
        public IActionResult GetAllFeedback()
        {
            var feedbackList = _context.Feedback.ToList();

            return Ok(feedbackList);
        }
    }
}