using AgeRanger.Model;
using Microsoft.EntityFrameworkCore;

namespace AgeRanger.DataProvider
{
    public class AgeRangerContext : DbContext, IAgeRangeContext
    {
        public DbSet<Person> Person { get; set; }

        public DbSet<AgeGroup> AgeGroup { get; set; }

        public AgeRangerContext()
        {

        }

        public AgeRangerContext(DbContextOptions<AgeRangerContext> options) : base(options)
        {

        }
                
    }
}
