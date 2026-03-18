FROM php:8.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libssl-dev libcurl4-openssl-dev \
    libicu-dev libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring bcmath intl exif zip opcache pcntl gd \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY backend/ /app/
COPY docker/prod/backend/.env-save /app/.env
COPY docker/prod/_shared/php-custom.ini /usr/local/etc/php/conf.d/99-custom.ini

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

RUN groupadd -g 1000 ilhamrhmtkbr && \
    useradd -u 1000 -g ilhamrhmtkbr -m -s /bin/bash ilhamrhmtkbr && \
    mkdir -p /app/storage/framework/views \
             /app/storage/framework/cache \
             /app/storage/framework/sessions \
             /app/storage/app/public/user-images \
             /app/storage/app/public \
             /app/storage/logs /app/bootstrap/cache  && \
    chown -R ilhamrhmtkbr:ilhamrhmtkbr /app /var/log && \
    chmod -R 755 /app && \
    chmod -R 775 /app/storage /app/bootstrap/cache

USER ilhamrhmtkbr

CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]