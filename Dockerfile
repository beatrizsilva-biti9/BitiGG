FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.* ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
