FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/backend_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

RUN npx prisma generate

CMD [ "npm", "run", "start" ]
