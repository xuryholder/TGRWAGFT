# Use official Node.js image
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Install serve for static file serving
FROM node:20-alpine as prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
COPY --from=build /app/tonconnect-manifest.json ./dist/
COPY --from=build /app/telegramlogo.svg ./dist/
COPY --from=build /app/index.html ./dist/

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
