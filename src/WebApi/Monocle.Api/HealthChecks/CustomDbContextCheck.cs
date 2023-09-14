using Microsoft.EntityFrameworkCore;
using Monocle.Api.Infrastructure;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Monocle.Api.HealthChecks;

public static class CustomDbContextCheckExtension
{
    public static IHealthChecksBuilder AddCustomDBContextCheck<TDbContext>(this IHealthChecksBuilder builder)
    where TDbContext : MonocleDbContext
    {
        builder.AddDbContextCheck<TDbContext>(customTestQuery: async (context, cancellationToken) =>
        {
            var logger = context.GetService<ILoggerFactory>().CreateLogger("MonocleDbContext-HealthCheck");
            logger.LogInformation("Checking db connection");

            if (await context.Database.CanConnectAsync(cancellationToken))
            {
                return true;
            }

            try
            {
                await context.Database.OpenConnectionAsync(cancellationToken: cancellationToken);
            }
            catch (System.Exception ex)
            {
                logger.LogError(ex, "An error occured when trying to connect to db");
                return false;
            }
            finally
            {
                await context.Database.CloseConnectionAsync();
            }
            return true;
        });
        return builder;
    }
}