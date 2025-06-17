FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4040

RUN apk update

RUN npm run build

CMD ["npm", "run", "start"]
