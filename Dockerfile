# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "src/index.mjs"]
EXPOSE 3000
