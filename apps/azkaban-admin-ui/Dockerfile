FROM nginx:stable-alpine

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV production

ARG VITE_AZKABAN_VERSION

ENV VITE_AZKABAN_VERSION=$VITE_AZKABAN_VERSION

COPY dist/apps/azkaban-admin-ui /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
