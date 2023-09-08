using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Monocle.Api.Models;

namespace Monocle.Api.Infrastructure.EntityConfigurations;

public sealed class ClaimConfiguration : IEntityTypeConfiguration<Claim>
{
    public void Configure(EntityTypeBuilder<Claim> builder)
    {
        builder.OwnsOne(x => x.AdverseParty, ownNavBuilder =>
        {
            ownNavBuilder.OwnsOne(ap => ap.Address);
            ownNavBuilder.OwnsOne(ap => ap.Insurance);
        });
        builder.Navigation(x => x.AdverseParty).IsRequired();
        builder.OwnsMany(x => x.Facilities, a =>
        {
            a.HasKey(x => x.Id);
        });

        builder.Property(x => x.Status).HasConversion<string>();
    }
}




