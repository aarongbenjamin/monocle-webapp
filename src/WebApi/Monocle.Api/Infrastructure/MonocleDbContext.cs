using Microsoft.EntityFrameworkCore;
using Monocle.Api.Models;

namespace Monocle.Api.Infrastructure;

public class MonocleDbContext : DbContext
{
    public MonocleDbContext(DbContextOptions<MonocleDbContext> options) : base(options)
    {

    }
    public DbSet<Claim> Claims { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MonocleDbContext).Assembly);
    }
}