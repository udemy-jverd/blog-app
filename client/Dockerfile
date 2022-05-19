FROM node:lts-alpine

# These two env variables are set according to the following opened issues:
# https://github.com/facebook/create-react-app/issues/8688
# https://github.com/facebook/create-react-app/issues/11779
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/src/app

COPY --chown=node:node ./package.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY --chown=node:node ./ ./

USER node

CMD ["npm", "start"]
