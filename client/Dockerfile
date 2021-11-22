FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --chown=node:node ./package.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY --chown=node:node ./ ./

USER node

CMD ["npm", "start"]
