using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Monocle.Api.Infrastructure;
using Monocle.Api.Models;

var builder = WebApplication.CreateBuilder(args);

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
}); ;
builder.Services.AddDbContext<MonocleDbContext>(options => options.UseSqlite("Data Source=monocle.db"));

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapGet("/claims", async (MonocleDbContext context) =>
{
    return await context.Claims.ToListAsync();
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
    if (await context.Claims.AnyAsync(c => c.Id == id) is false) return Results.NotFound();

    claim.Id = id;
    claim.LastUpdatedDate = DateTime.UtcNow;
    context.Claims.Update(claim);
    await context.SaveChangesAsync();

    return Results.Ok(claim);
});

app.Run();
