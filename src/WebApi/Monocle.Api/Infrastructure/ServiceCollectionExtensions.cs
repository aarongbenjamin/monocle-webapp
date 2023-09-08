using Microsoft.EntityFrameworkCore;

namespace Monocle.Api.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var dbProvider = configuration.GetValue<string>("DatabaseProvider");
        services.AddDbContext<MonocleDbContext>(options =>
        {
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
                    var connStringBuilder = new Npgsql.NpgsqlConnectionStringBuilder(configuration.GetConnectionString("Monocle"));
                    options.UseNpgsql(connStringBuilder.ConnectionString);
                    break;
            }
        });

        return services;
    }
}