FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY . .

EXPOSE 3388

CMD [ "node", "install.js" ]
