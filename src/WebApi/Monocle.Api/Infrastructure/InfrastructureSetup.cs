using Microsoft.EntityFrameworkCore;

namespace Monocle.Api.Infrastructure;

public static class InfrastructureSetup
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        string? dbProvider = GetDbProviderSetting(configuration);
        services.AddDbContext<MonocleDbContext>((sp, options) =>
        {
            var logger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("InfrastructureServices");
            switch (dbProvider)
            {
                case "InMemory":
                    options.UseInMemoryDatabase("monocle");
                    break;
                case "Sqlite":
                    options.UseSqlite("Data Source=monocle.db");
                    break;
                case "Postgres":
                default:
                    string? connectionString = configuration.GetConnectionString("Monocle");
                    options.UseNpgsql(connectionString);
                    break;
            }
        });

        return services;
    }
    public static void MigrateDbInDevelopment(IServiceProvider services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        if (!environment.IsDevelopment() && GetDbProviderSetting(configuration) != "InMemory")
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<MonocleDbContext>();
            var pendingMigrations = context.Database.GetPendingMigrations();

            if (pendingMigrations.Any())
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            }
        }
    }
    private static string? GetDbProviderSetting(IConfiguration configuration)
    {
        return configuration.GetValue<string>("DatabaseProvider");
    }
}