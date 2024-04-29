FROM node:lts-alpine3.19

RUN apk add --no-cache \
  dumb-init

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN chown -R node:node /app

USER node

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]

CMD ["yarn", "start"]
