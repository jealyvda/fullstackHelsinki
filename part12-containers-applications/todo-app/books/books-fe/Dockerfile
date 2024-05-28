FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["npm", "run", "start", "serve", "build"]