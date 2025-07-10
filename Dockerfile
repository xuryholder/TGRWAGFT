# Use official Node.js image
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:20-alpine as prod
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4173
CMD ["npm", "run", "start"]
