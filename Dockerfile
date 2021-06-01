FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN node ./install.js 

EXPOSE 3388

CMD [ "cd", "server", "&&", "npm", "run", "serve" ]
