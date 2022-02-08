# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /usr/src/app
RUN git clone https://github.com/TheLegend27-ger/Webprogrammierung-Projekt.git .
RUN npm install
EXPOSE 8080
CMD ["node", "src/server.js"]