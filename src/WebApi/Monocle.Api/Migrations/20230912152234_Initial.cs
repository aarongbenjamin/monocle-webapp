using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Monocle.Api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Claims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DateOfLoss = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastUpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AdverseParty_Name = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Email = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_AddressLine1 = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_AddressLine2 = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_Unit = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_City = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_State = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Address_Zip = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Insurance_CompanyName = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Insurance_AdjustorName = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Insurance_PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    AdverseParty_Insurance_Email = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Claims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Facility",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: true),
                    RepairCost = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ClaimId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facility", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Facility_Claims_ClaimId",
                        column: x => x.ClaimId,
                        principalTable: "Claims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Facility_ClaimId",
                table: "Facility",
                column: "ClaimId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Facility");

            migrationBuilder.DropTable(
                name: "Claims");
        }
    }
}
