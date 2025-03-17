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

        public DbSet<Invitation> Invitations { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });

            // ✅ Define relationships for Invitation Table
            modelBuilder.Entity<Invitation>()
                .HasOne(i => i.Group)
                .WithMany(g => g.Invitations)
                .HasForeignKey(i => i.GroupId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Invitation>()
                .HasOne(i => i.User)
                .WithMany(u => u.Invitations)
                .HasForeignKey(i => i.InvitedUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
