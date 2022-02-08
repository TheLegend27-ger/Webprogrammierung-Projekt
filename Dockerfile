# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /usr/src/app
RUN git clone TheLegend27-ger/Webprogrammierung-Projekt .
RUN npm install
EXPOSE 8080
CMD ["node", "server.js"]