FROM node:9.11.1

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "start"]
