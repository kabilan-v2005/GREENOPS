using Microsoft.AspNetCore.Mvc;
//using Greenops.Data;
using Greenops.Models;
using GreenopsAPI.Data;

namespace Greenops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WasteReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WasteReportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("report")]
        public IActionResult AddReport(WasteReport report)
        {
            report.ReportDate = DateTime.Now;

            _context.WasteReports.Add(report);
            _context.SaveChanges();

            return Ok(report);
        }

        [HttpGet("all")]
        public IActionResult GetAllReports()
        {
            var reports = _context.WasteReports.ToList();

            return Ok(reports);
        }
    }
}