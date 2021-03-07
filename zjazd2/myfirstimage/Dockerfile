# 1. Wybieramy obraz bazowy
FROM alpine:latest

# 2. Instalujemy w nim zależności (dependencies) niezbędne do uruchomienia "procesu głównego"
RUN apk add --update redis

# 3. Ustawienie "procesu głównego"
CMD redis-server