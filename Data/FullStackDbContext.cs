using Microsoft.EntityFrameworkCore;   
using server.Models;
namespace server.Data
{

        public class FullStackDbContext : DbContext
        {
            public FullStackDbContext(DbContextOptions<FullStackDbContext> options) : base(options) {
        
                }

           
            public DbSet<NewUser> NewUsers { get; set; }
           
        
          }
}
