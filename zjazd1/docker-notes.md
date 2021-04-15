---

How to map ports with Docker Toolbox:
https://stackoverflow.com/a/57417278
"C:\Program Files\Oracle\VirtualBox\VBoxManage" modifyvm "default" --natpf1 "tcp-port27017,tcp,,27017,,27017"

--

After install:
- docker CLI
- docker daemon (server)

---

CLI sends requests to daemon.

---

IMAGE == BINARY with system etc.
CONTAINER == process, running image

---

hub.docker.com

---

vi:
vi FILE_NAME (CREATE FILE AND OPEN IN VI)
a (GO TO TYPE MODE)
ESC (EXIT TO COMMAND MODE)
: (START COMMAND)
q OR wq (exit OR exit+save)

---

redis:
docker exec -it CONTEINER_ID redis-cli (START REDIS CLI)
set somekey Hello (SET 'Hello' TO 'somekey')
get somekey (GET value AT GIVEN key)

---

docker-compose:

- how to restart app after it exits:
restart: "no" / on-failure / always / unless-stopped

---

react:

- install react CLI
npm install -g create-react-app

- create new app (new dir):
npx create-react-app APP_NAME

- there is a bug with docker/react, so container has to be run with -it params