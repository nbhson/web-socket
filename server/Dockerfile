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
CMD ["node", "app.js"]