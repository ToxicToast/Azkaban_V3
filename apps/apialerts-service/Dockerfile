FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system apialerts-service && \
          adduser --system -G apialerts-service apialerts-service

COPY dist/apps/apialerts-service .
RUN chown -R apialerts-service:apialerts-service .

RUN npm i --omit=dev --omit=optional
RUN npm i --save @toxictoast/azkaban-base-types

CMD [ "node", "main.js" ]
