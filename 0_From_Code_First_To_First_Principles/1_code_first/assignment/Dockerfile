FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]
