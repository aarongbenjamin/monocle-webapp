FROM mcr.microsoft.com/dotnet/core/sdk:7.0

WORKDIR /app

COPY . .

RUN dotnet publish -c release

CMD dotnet run