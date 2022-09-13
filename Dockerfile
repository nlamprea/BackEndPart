FROM node:16

WORKDIR /microservicio

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "src/app.js"]