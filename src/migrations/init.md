# SOME USEFUL COMMAND

## DOCKER

```bash
docker exec -it <container_id> /bin/bash
docker exec -it <container_id> /bin/bash -c "psql -U postgres"
docker exec -it <container_id> /bin/bash -c "psql -U postgres -c '\l'"
```

---

## POSTGRES

```bash
psql -U <user>
psql -U <user> -h <host> -p <port> -c "CREATE DATABASE <dbname>;"
\l
\c <dbname>
\dt
```

---

### Create Database

```postgres
CREATE DATABASE <db_name>;
```

### Grant Privileges

```postgres
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <db_username>;
```

### Create UUID Extention

```postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
