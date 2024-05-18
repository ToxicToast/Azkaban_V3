FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system sse-service && \
          adduser --system -G sse-service sse-service

COPY dist/apps/sse-service .
RUN chown -R sse-service:sse-service .

RUN npm i --omit=dev --omit=optional
RUN npm i --save @toxictoast/azkaban-base-types

CMD [ "node", "main.js" ]
