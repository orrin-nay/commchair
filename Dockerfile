FROM node:8

LABEL maintainer="orrin@webaholics.co"

COPY . /worspace/src

WORKDIR /worspace/src

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "server/index.js"]