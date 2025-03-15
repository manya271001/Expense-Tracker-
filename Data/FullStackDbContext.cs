using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions<FullStackDbContext> options) : base(options)
        {
        }

        public DbSet<NewUser> NewUsers { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });

        }
    }
}
