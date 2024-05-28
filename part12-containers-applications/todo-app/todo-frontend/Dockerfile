FROM node:20 AS build-stage

WORKDIR /usr/src/app
ENV VITE_BACKEND_URL="http://localhost:3000"

COPY . .

RUN npm ci

RUN npm test

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.25-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html