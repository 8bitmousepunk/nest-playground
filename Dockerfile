FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 7000

CMD ["npm", "run", "start"]
