FROM mcr.microsoft.com/dotnet/sdk:7.0 AS publish 

WORKDIR /build
ARG configuration=Release
EXPOSE 5219
ENV ASPNETCORE_URLS=http://+:5219

COPY . .

RUN dotnet publish -c $configuration -o /publish

FROM publish AS final
WORKDIR /app
COPY --from=publish /publish .

ENTRYPOINT ["dotnet", "Monocle.Api.dll"]