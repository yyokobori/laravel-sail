FROM node:20-alpine

RUN apk add --no-cache \
    php84 \
    php84-cli \
    php84-mbstring \
    php84-xml \
    php84-simplexml \
    php84-dom \
    php84-xmlwriter \
    php84-phar \
    php84-openssl \
    php84-tokenizer \
    php84-json \
    php84-ctype \
    php84-iconv \
    php84-fileinfo \
    curl \
    git

RUN curl -sS https://getcomposer.org/installer \
  | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app/docs-site