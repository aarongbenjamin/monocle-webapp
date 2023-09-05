using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Monocle.Api.Infrastructure;

public sealed class MonocleDbContextFactory : IDesignTimeDbContextFactory<MonocleDbContext>
{
    public MonocleDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MonocleDbContext>();
        optionsBuilder.UseSqlite("Data Source=monocle.db");
        return new MonocleDbContext(optionsBuilder.Options);
    }
}
