using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Monocle.Api.Models;

public class Claim
{
    public int? Id { get; set; }
    [NotMapped]
    public string? ClaimNumber { get => Id.ToString(); }
    public DateTime? DateOfLoss { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? LastUpdatedDate { get; set; }
    public List<Facility>? Facilities { get; set; }
    public AdverseParty? AdverseParty { get; set; }
    public ClaimStatus? Status { get; set; }
}

public class Facility
{
    public int Id { get; set; }
    public string? Type { get; set; }
    public string? RepairCost { get; set; }
    public string? Description { get; set; }
}

public class AdverseParty
{
    public string? Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public Address? Address { get; set; }
    public Insurance? Insurance { get; set; }
}
public class Address
{
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? Unit { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
}

public class Insurance
{
    public string? CompanyName { get; set; }
    public string? AdjustorName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
}

public enum ClaimStatus
{
    UnderInvestigation,
    ReadyForCollection,
    AttemptingCollection,
    PaidInFull
}

