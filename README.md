# monocle-webapp

[Nonprod](https://monocle-webapp.azurewebsites.net)

## Migrating the database

`make ef command=update`

You may want to drop the database first if there is a new Initial migration file. Until the application
is in production, we will be deleting and recreating the Initial migration file.  
To drop the database

`make ef command=drop`

## Running the Application Locally (with docker compose)

`make up-local`

to stop the application  
`make stop`

## Running the Application Locally (without docker compose)

Run these commands in 2 separate terminals.

- `cd src/WebApi/Monocle.Api` then `dotnet run`
- `cd src/UI` then `npm start`
