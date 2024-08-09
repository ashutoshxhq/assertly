# Build stage
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install @nestjs/cli -g
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /usr/src/app

# Copy node_modules and built files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]