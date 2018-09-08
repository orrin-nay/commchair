FROM node:8

LABEL maintainer="orrin@webaholics.co"

COPY . /worspace/src

WORKDIR /worspace/src

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run"]