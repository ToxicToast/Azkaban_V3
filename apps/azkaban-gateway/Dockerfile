FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system azkaban-gateway && \
          adduser --system -G azkaban-gateway azkaban-gateway

COPY dist/apps/azkaban-gateway .
RUN chown -R azkaban-gateway:azkaban-gateway .

RUN npm i --omit=dev --omit=optional
RUN npm i --save @toxictoast/azkaban-base-types

CMD [ "node", "main.js" ]
