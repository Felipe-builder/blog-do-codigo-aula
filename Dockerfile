FROM node:16.14.0
WORKDIR /api-blog
ARG PORT_BUILD=3000
ENV PORT=$PORT_BUILD
EXPOSE $PORT_BUILD
COPY . .
RUN npm install
ENTRYPOINT npm start