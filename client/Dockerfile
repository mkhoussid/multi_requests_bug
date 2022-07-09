FROM node:14

LABEL version="1.0"
LABEL description="frontend"
LABEL maintainer = ["michael.khoussid@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]