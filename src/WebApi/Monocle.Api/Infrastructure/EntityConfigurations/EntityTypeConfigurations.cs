using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Monocle.Api.Models;

namespace Monocle.Api.Infrastructure.EntityConfigurations;

public sealed class ClaimConfiguration : IEntityTypeConfiguration<Claim>
{
    public void Configure(EntityTypeBuilder<Claim> builder)
    {
        var ownedNavigationBuilder = builder.OwnsOne(x => x.AdverseParty);
        ownedNavigationBuilder.OwnsOne(x => x.Address);
        ownedNavigationBuilder.OwnsOne(x => x.Insurance);

        builder.Navigation(x => x.AdverseParty).IsRequired();

        builder.OwnsMany(x => x.Facilities);

        builder.Property(x => x.Status).HasConversion<string>();
    }
}




