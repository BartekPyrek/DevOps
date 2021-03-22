#!/bin/sh

# docker stop mybackend
docker stop myredis mypostgres
docker network rm mymulticont
docker rmi barpyr/mybackend:v0.2

docker network create mymulticont
docker build . -t barpyr/mybackend:v0.2
docker run -d --rm --network mymulticont --name myredis redis:alpine
docker run -d --rm --network mymulticont --name mypostgres -e POSTGRES_PASSWORD=Pa55w.rd1234 -v /mnt/c/Users/barto/OneDrive/Pulpit/repos/DevOps/projekt/postgres_data:/var/lib/postgresql/data postgres:alpine
# docker run --rm --network mymulticont --name mybackend -p 9090:9090 barpyr/mybackend:v0.2
