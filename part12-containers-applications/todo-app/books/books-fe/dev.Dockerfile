FROM node:20

WORKDIR /usr/src/app

COPY . .

# npm install because dev mode
RUN npm install

EXPOSE 3000

# npm start is the command to start the application in development mode
CMD ["npm", "run", "start"]