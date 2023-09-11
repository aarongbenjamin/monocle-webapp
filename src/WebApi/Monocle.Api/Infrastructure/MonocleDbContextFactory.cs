using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Linq;
namespace Monocle.Api.Infrastructure;

public sealed class MonocleDbContextFactory : IDesignTimeDbContextFactory<MonocleDbContext>
{
    public MonocleDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MonocleDbContext>();
        var connStringBuilder = new Npgsql.NpgsqlConnectionStringBuilder();

        var connString = GetConnectionString(args);
        Console.WriteLine($"Connecting to: {connString}");

        optionsBuilder.UseNpgsql(connString);
        return new MonocleDbContext(optionsBuilder.Options);
    }
    public string GetConnectionString(string[] args) => args[Array.IndexOf(args, "--conn") + 1];
}
