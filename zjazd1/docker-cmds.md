# Docker commands

- info<br>
docker info

- exit without stopping container<br>
CTRL + P, CTRL + Q

- running containers [with history]<br>
docker ps [-a]

- remove all containers [with images]<br>
docker system prune [-a]

- run container in interactive mode + set TTY<br>
docker run -it IMG_NAME

- execute COMMAND in CONTAINER_ID<br>
docker exec -it CONTAINER_ID COMMAND

- stop container<br>
docker stop CONTAINER_ID

- resume container<br>
docker start CONTAINER_ID

- resume container and attach output<br>
docker start -a CONTAINER_ID

- attach to running container<br>
docker attach CONTAINER_ID

- see container logs<br>
docker logs CONTAINER_ID

- run with port mapping (local:container)<br>
docker run -p 90:80 nginx

- run services [and rebuild]<br>
docker-compose up [--build]

- check containers running within service<br>
docker-compose ps

- pass specific dockerfile to build<br>
docker build -if Dockerfile.dev .

- inspect network<br>
docker network inspect NETWORK_NAME

- create network<br>
docker network create NETWORK_NAME

- run postgres and redis containers + join network [and automatically remove on stop -[--rm]]<br>
docker run [--rm] --name my-postgres --network NETWORK_NAME -e POSTGRES_PASSWORD=123 -d postgres <br>
docker run [--rm] --name my-redis --network NETWORK_NAME -d redis 

nazwy hostów w sieci mają takie same nazwy kontenera, czyli zamiast pingować po ip można pingować po nazwie kontenera