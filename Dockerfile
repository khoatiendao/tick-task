# Sử dụng image Node.js chính thức để làm base image
FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /task/myapp/server

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các gói npm
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Chỉ định cổng mà ứng dụng sẽ chạy
EXPOSE 8443

# Chạy lệnh để khởi động ứng dụng
CMD [ "node", "index.js" ]