﻿CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20230912152234_Initial') THEN
    CREATE TABLE "Claims" (
        "Id" integer GENERATED BY DEFAULT AS IDENTITY,
        "DateOfLoss" timestamp with time zone NULL,
        "CreatedDate" timestamp with time zone NULL,
        "LastUpdatedDate" timestamp with time zone NULL,
        "AdverseParty_Name" text NULL,
        "AdverseParty_PhoneNumber" text NULL,
        "AdverseParty_Email" text NULL,
        "AdverseParty_Address_AddressLine1" text NULL,
        "AdverseParty_Address_AddressLine2" text NULL,
        "AdverseParty_Address_Unit" text NULL,
        "AdverseParty_Address_City" text NULL,
        "AdverseParty_Address_State" text NULL,
        "AdverseParty_Address_Zip" text NULL,
        "AdverseParty_Insurance_CompanyName" text NULL,
        "AdverseParty_Insurance_AdjustorName" text NULL,
        "AdverseParty_Insurance_PhoneNumber" text NULL,
        "AdverseParty_Insurance_Email" text NULL,
        "Status" text NULL,
        CONSTRAINT "PK_Claims" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20230912152234_Initial') THEN
    CREATE TABLE "Facility" (
        "Id" integer GENERATED BY DEFAULT AS IDENTITY,
        "Type" text NULL,
        "RepairCost" text NULL,
        "Description" text NULL,
        "ClaimId" integer NOT NULL,
        CONSTRAINT "PK_Facility" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Facility_Claims_ClaimId" FOREIGN KEY ("ClaimId") REFERENCES "Claims" ("Id") ON DELETE CASCADE
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20230912152234_Initial') THEN
    CREATE INDEX "IX_Facility_ClaimId" ON "Facility" ("ClaimId");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20230912152234_Initial') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20230912152234_Initial', '7.0.11');
    END IF;
END $EF$;
COMMIT;
