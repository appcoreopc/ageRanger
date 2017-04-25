using AgeRanger.Model;
using Microsoft.EntityFrameworkCore;

namespace AgeRanger.DataProvider
{
    public interface IAgeRangeContext
    {
        DbSet<Person> Person { get; }

        DbSet<AgeGroup> AgeGroup { get; }

        int SaveChanges();
    }
}
