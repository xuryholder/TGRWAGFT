FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:20-alpine as prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
COPY --from=build /app/tonconnect-manifest.json ./dist/
COPY --from=build /app/telegramlogo.svg ./dist/
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]