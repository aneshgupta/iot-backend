FROM node:18.20.3  AS builder
COPY ./ /app/
WORKDIR /app
RUN npm install
RUN npm run build 

FROM node:18.20.3-slim
COPY --from=builder /app/ /app/
EXPOSE 5000
CMD ["node", "/app/dist/index.js"]
