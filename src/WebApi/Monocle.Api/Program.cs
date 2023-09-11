using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Monocle.Api.Infrastructure;
using Monocle.Api.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.local.json", true);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Monocle API",
        Version = "v1"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Monocle API V1");
});
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapHealthChecks("/health");

app.MapGet("/claims", async (MonocleDbContext context) =>
{
    var claims = await context.Claims
        .AsNoTracking()
        .ToListAsync();
    return claims.Any() ? Results.Ok(claims) : Results.NoContent();
});
app.MapGet("/claims/{id}", async (MonocleDbContext context, int id) =>
    await context.FindAsync<Claim>(id) is Claim claim
     ? Results.Ok(claim) : Results.NotFound()
);
app.MapPost("/claims", async (MonocleDbContext context) =>
{
    var entry = await context.AddAsync(new Claim
    {
        CreatedDate = DateTime.UtcNow,
        LastUpdatedDate = DateTime.UtcNow,
        Status = ClaimStatus.UnderInvestigation
    });

    await context.SaveChangesAsync();

    return Results.Created($"/claims/{entry.Entity.Id}", entry.Entity);
});
app.MapPut("/claims/{id}", async (MonocleDbContext context, Claim claim, int id) =>
{
    var existing = await context.Claims.FindAsync(id);

    if (existing is null) return Results.NotFound();

    existing.AdverseParty = claim.AdverseParty;
    existing.Facilities = claim.Facilities;
    existing.DateOfLoss = claim.DateOfLoss;
    existing.Status = claim.Status;
    existing.LastUpdatedDate = DateTime.UtcNow;

    await context.SaveChangesAsync();

    return Results.Ok(claim);
});

app.Run();

