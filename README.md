# claims-management
[Nonprod](https://monocle-webapp.azurewebsites.net)
## Installing MongoDb locally in docker

```
docker pull mongo
```

```
docker run \
-d \
--name mongo-local \
-p 27017:27017 \
mongo
```

## Building docker image

```
docker build . -f server/Dockerfile --target base -t claims-management:latest
```

```
docker run -it claims-management:latest /bin/bash
```
