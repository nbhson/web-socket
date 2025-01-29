# Dockerfile cho Frontend
FROM node:14 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép mã nguồn vào container
COPY . .

# Sử dụng một server tĩnh để phục vụ các tệp tĩnh
FROM nginx:alpine

# Sao chép tệp đã xây dựng vào thư mục phục vụ của Nginx
COPY --from=build /app /usr/share/nginx/html

# Mở cổng cho Nginx
EXPOSE 80