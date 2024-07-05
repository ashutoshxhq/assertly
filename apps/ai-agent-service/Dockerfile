FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install @nestjs/cli -g
RUN npm install

COPY prisma ./prisma

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18-slim

WORKDIR /usr/src/app
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main"]