FROM node:14

WORKDIR /usr/src/app

COPY . .

EXPOSE 3388

CMD [ "node", "install.js" ]
