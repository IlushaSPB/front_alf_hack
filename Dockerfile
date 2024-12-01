# Этап 1: Сборка React приложения
FROM node:18-alpine AS build

# Установите рабочую директорию внутри контейнера
WORKDIR /src

# Копируйте package.json и package-lock.json (или yarn.lock, если используете Yarn)
COPY package.json package-lock.json ./

# Установите зависимости
RUN npm install

# Копируйте остальной исходный код вашего приложения
COPY . .

# Соберите React приложение
RUN npm run build

# Этап 2: Обслуживание приложения с помощью Nginx
FROM nginx:stable-alpine

# Копируйте результат сборки в стандартный html-директорию Nginx
COPY --from=build /src/build /usr/share/nginx/html

# Копируйте пользовательскую конфигурацию Nginx (если используете)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Откройте порт 80 для доступа извне
EXPOSE 80

# Запустите Nginx при запуске контейнера
CMD ["nginx", "-g", "daemon off;"]