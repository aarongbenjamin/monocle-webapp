# monocle-webapp

[Nonprod](https://purple-mushroom-035a32310.3.azurestaticapps.net)

## Migrating the database

`make ef command=update`

You may want to drop the database first if there is a new Initial migration file. Until the application
is in production, we will be deleting and recreating the Initial migration file.  
To drop the database

`make ef command=drop`

## Running the Application Locally (with docker compose)

`make up`

to stop the application  
`make stop`

## Running the Application Locally (without docker compose)

Run these commands in 2 separate terminals.

- `cd src/WebApi/Monocle.Api` then `dotnet run`
- `cd src/UI` then `npm start`

## Common Commands

- `az postgres flexible-server execute -n <server-name> -u <username> -p "<password>" -d <database-name> --file-path "<file-path>"`
- `az postgres flexible-server connect -n <servername> -u <username> -p "<password>" -d <databasename>`

server: monocle-pgsql-np.postgres.database.azure.com
