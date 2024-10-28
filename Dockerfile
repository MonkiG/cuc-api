FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx playwright install
RUN npx playwright install-deps

COPY . .
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]