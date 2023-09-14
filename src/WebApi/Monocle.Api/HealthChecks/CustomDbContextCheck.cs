using Microsoft.EntityFrameworkCore;
using Monocle.Api.Infrastructure;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Monocle.Api.HealthChecks;

public static class CustomDbContextCheckExtension
{
    public static IHealthChecksBuilder AddCustomDBContextCheck<TDbContext>(this IHealthChecksBuilder builder)
    where TDbContext : MonocleDbContext
    {
        builder.AddDbContextCheck(customTestQuery: (Func<TDbContext, CancellationToken, Task<bool>>?)(async (context, cancellationToken) =>
        {
            var logger = context.GetService<ILoggerFactory>().CreateLogger("MonocleDbContext-HealthCheck");
            logger.LogInformation("Checking db connection");

            return await context.Database.CanConnectAsync(cancellationToken) || await TryOpenConnectionAndLogError(context, logger, cancellationToken);

        }));
        return builder;
    }

    private static async Task<bool> TryOpenConnectionAndLogError<TDbContext>(TDbContext context, ILogger logger, CancellationToken cancellationToken) where TDbContext : MonocleDbContext
    {
        try
        {
            await context.Database.OpenConnectionAsync(cancellationToken: cancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occured when trying to open a connetion to {provider}", context.Database.ProviderName);
            return false;
        }
        finally
        {
            await context.Database.CloseConnectionAsync();
        }
        return true;
    }
}