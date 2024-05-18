FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system notification-service && \
          adduser --system -G notification-service notification-service

COPY dist/apps/notification-service .
RUN chown -R notification-service:notification-service .

RUN npm i --omit=dev --omit=optional
RUN npm i --save @toxictoast/azkaban-base-types

CMD [ "node", "main.js" ]
