FROM node:18.15.0-alpine

LABEL maintainer="SeyedMilad Hashemi <s.milad.hashemi@outlook.com>"

ENV NODE_ENV=development
ENV ITOLL_BIND_IP=0.0.0.0
ENV ITOLL_PORT=3000
ENV ITOLL_DB_TYPE=postgres
ENV ITOLL_DB_HOST=0.0.0.0
ENV ITOLL_DB_PORT=5432
ENV ITOLL_DB_USERNAME=itoll
ENV ITOLL_DB_PASSWORD=itoll
ENV ITOLL_DB=itoll_docker
ENV ITOLL_PASSPORT_SECRET=itoll_secret
ENV ITOLL_PASSPORT_EXPIRATION_TIME=1h

EXPOSE 3000

RUN apk update && apk upgrade

WORKDIR /opt/app/

COPY --chown=itoll:itoll --chmod=644 package*.json .

RUN npm install --loglevel verbose

COPY . .

RUN npm run build

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]