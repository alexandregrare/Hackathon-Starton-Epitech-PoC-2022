FROM node:17-alpine

COPY . .

RUN npm install

EXPOSE 8080

ENV BACKEND_PORT=8080

ENV SERVER_HOST=localhost

CMD ["npm", "start"]