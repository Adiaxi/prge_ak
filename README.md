# prge_2025_12
prge demo app for studnts 



### how to start

```bash
docker-compose -f ./docker-compose/docker-compose-prge-local.yml --env-file .env -p local-prge up --build -d
```


docker system prune -a -f 
 
docker system prune --volumes

### how to start main

```
docker-compose -f ./docker-compose/docker-compose-prge-remote.yml --env-file .env.main -p prge-main up --build -d
```

### how to start env-qa

```
docker-compose -f ./docker-compose/docker-compose-prge-remote.yml --env-file .env.env-qa -p prge-env-qa up --build -d
```

### how to start env-test

```
docker-compose -f ./docker-compose/docker-compose-prge-remote.yml --env-file .env.env-test -p prge-env-test up --build -d
```