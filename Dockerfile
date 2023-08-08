FROM node:20

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY ./frontend .
COPY ./backend/common ../backend/common

EXPOSE 3000

CMD ["npm", "start"]
