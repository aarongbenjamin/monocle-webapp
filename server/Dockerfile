FROM node:18 as server_builder

WORKDIR /server
COPY /server/package*.json ./
RUN npm install
COPY /server .

FROM node:18 as client_builder
WORKDIR /client
COPY /client/package*.json ./
RUN npm install

COPY /client .
RUN npm run build

FROM node:18 as dev
WORKDIR /usr/src/dev-app
COPY --from=server_builder /server ./

FROM dev as production_build
WORKDIR /app
COPY --from=dev /usr/src/dev-app .
RUN npm run build

FROM production_build as production
WORKDIR /usr/src/app
COPY --from=production_build /app .
COPY --from=client_builder /client/build ./build/public
