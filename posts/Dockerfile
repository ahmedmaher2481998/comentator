FROM node:alpine

WORKDIR /app
RUN npm install -G typescript
COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]