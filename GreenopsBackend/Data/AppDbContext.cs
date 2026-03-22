using Greenops.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
//using GreenopsAPI.Models;

namespace GreenopsAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        public DbSet<ResaleItem> ResaleItems { get; set; }
        public DbSet<Order> Orders { get; set; }

        public DbSet<WasteReport> WasteReports { get; set; }
        public DbSet<Complaint> Complaints { get; set; }

        public DbSet<Feedback> Feedback { get; set; }
    }
}