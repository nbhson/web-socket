# Web Socket

## Start Local

FE
- cd ui
- Run with live server on index.html

BE
- cd server
- run npm install
- run node app.js

## Setup with Docker

#### Dockerfile cho Backend

Trong thư mục gốc của Server, tạo file Dockerfile:

```bash
# Dockerfile cho Backend
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép mã nguồn vào container
COPY . .

# Cài đặt các phụ thuộc
RUN npm install

# Mở cổng cho server
EXPOSE 8080

# Lệnh để chạy server
CMD ["node", "server.js"]
```


#### Dockerfile cho UI

Trong thư mục gốc của UI, tạo file Dockerfile:

```bash
# Dockerfile cho Frontend
FROM node:14 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép mã nguồn vào container
COPY . .

# Cài đặt các phụ thuộc (nếu cần)
RUN npm install

# Xây dựng ứng dụng (nếu cần)
# RUN npm run build

# Sử dụng một server tĩnh để phục vụ các tệp tĩnh
FROM nginx:alpine

# Sao chép tệp đã xây dựng vào thư mục phục vụ của Nginx
COPY --from=build /app /usr/share/nginx/html

# Mở cổng cho Nginx
EXPOSE 80
```

#### Tạo tệp docker-compose.yml

Ở thư mục gốc của ứng dụng tạo file docker-compose.yml

```bash
version: '3'
services:
  backend:
    build:
      context: ./backend
    ports:
      - "8080:8080"

  frontend:
    build:
      context: ./frontend
    ports:
      - "80:80"
```

#### Xây dựng và Chạy Containers

- Build Image, run: `docker-compose build --no-cache`
- Build & run container, run: `docker-compose up --build`

## Deploy with Heroku

`https://devcenter.heroku.com/articles/heroku-cli`