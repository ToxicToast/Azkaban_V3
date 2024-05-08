FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system azkaban-webhooks && \
          adduser --system -G azkaban-webhooks azkaban-webhooks

COPY dist/apps/azkaban-webhooks .
RUN chown -R azkaban-webhooks:azkaban-webhooks .

RUN npm i --omit=dev --omit=optional
RUN npm i --save @toxictoast/azkaban-base-types

CMD [ "node", "main.js" ]
