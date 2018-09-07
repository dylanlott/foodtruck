FROM node:9
WORKDIR /app
COPY ./ /app
RUN npm install --production
CMD ["npm", "run", "prod"]
