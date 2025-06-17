#!/bin/bash

# Получаем последние изменения
git pull origin develop

# Останавливаем текущие контейнеры
docker-compose -f docker-compose.prod.yml down

# Пересобираем и запускаем контейнеры
docker-compose -f docker-compose.prod.yml up -d --build

# Очистка старых образов
docker image prune -f