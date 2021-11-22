FROM node:lts-alpine


WORKDIR /usr/src/app
RUN chmod -R 777 /usr/src/app

COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./

USER node

CMD ["npm", "start"]
