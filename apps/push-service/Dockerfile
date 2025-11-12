FROM php:8.2-fpm

# install system deps and extensions (including sockets)
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev \
    librabbitmq-dev libssl-dev libxml2-dev libpq-dev \
    sudo supervisor default-mysql-client \
  && docker-php-ext-install pdo_mysql sockets zip opcache \
  && pecl install amqp || true \
  && docker-php-ext-enable amqp || true \
  && rm -rf /var/lib/apt/lists/*

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY . /var/www
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 9000
CMD ["/usr/bin/supervisord", "-n"]
