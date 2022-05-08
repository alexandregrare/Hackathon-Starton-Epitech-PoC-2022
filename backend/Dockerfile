FROM node:17-alpine

COPY . .

RUN npm install

EXPOSE 3000

ENV BACKEND_PORT=3000

ENV SERVER_HOST=localhost

CMD ["npm", "start"]