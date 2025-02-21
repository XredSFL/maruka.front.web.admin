FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN rm -rf public

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]