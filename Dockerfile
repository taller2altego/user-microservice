FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
RUN npm i -g nodemon

ENTRYPOINT [ "./startup.sh" ]