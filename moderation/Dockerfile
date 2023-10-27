FROM node:alpine

WORKDIR /app
RUN npm i -g typescript 
RUN npm i -g ts-node 
COPY package.json ./
RUN npm install

COPY ./ ./
CMD ["npm", "run","dev"]