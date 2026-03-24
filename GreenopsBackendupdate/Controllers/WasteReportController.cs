using Microsoft.AspNetCore.Mvc;
//using Greenops.Data;
using Greenops.Models;
using GreenopsAPI.Data;
using Microsoft.AspNetCore.Http;
using System.IO;

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
        //    [HttpPost("report")]
        //    [Consumes("multipart/form-data")]
        //    public async Task<IActionResult> AddReport(
        //[FromForm] int userId,
        //[FromForm] string district,
        //[FromForm] string place,
        //[FromForm] string description,
        //[FromForm] IFormFile? wasteImage)
        //    {
        //        string fileName = "";

        //        try
        //        {
        //            if (wasteImage != null && wasteImage.Length > 0)
        //            {
        //                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

        //                if (!Directory.Exists(folder))
        //                    Directory.CreateDirectory(folder);

        //                fileName = Guid.NewGuid() + Path.GetExtension(wasteImage.FileName);

        //                var path = Path.Combine(folder, fileName);

        //                using (var stream = new FileStream(path, FileMode.Create))
        //                {
        //                    await wasteImage.CopyToAsync(stream);
        //                }
        //            }

        //            var report = new WasteReport
        //            {
        //                UserId = userId,
        //                District = district,
        //                Place = place,
        //                Description = description,
        //                WasteImage = fileName,
        //                ReportDate = DateTime.Now
        //            };

        //            _context.WasteReports.Add(report);
        //            await _context.SaveChangesAsync();

        //            return Ok(report);
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, ex.Message);
        //        }
        //    }

        [HttpGet("all")]
        public IActionResult GetAllReports()
        {
            var reports = _context.WasteReports.ToList();

            return Ok(reports);
        }
    }
}