FROM node:14

LABEL version="1.0"
LABEL description="backend"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

EXPOSE 5000

EXPOSE 5432

CMD ["npm", "run", "server"]