FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci 
  
USER node

EXPOSE 4000

CMD npm start