# WholesalePurchase

## Install on local host

Clone mono repo

```
git clone git@github.com:Karpov-hub/WP.git
```

or

```
git clone https://github.com/Karpov-hub/WP.git
```

Install yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

Install node modules

```
npm config set registry http://registry.npmjs.org/
npm install
npx lerna bootstrap
```

### Install Redis

you need to install WLS2 (ubunty)

```
https://redis.io/docs/getting-started/installation/install-redis-on-windows/

```

### Requirements

- Node 16.18.0
- Postgres 11
- Redis

## DB

```
sudo -u postgres psql

create database wtdb;

GRANT ALL PRIVILEGES ON DATABASE "wtdb" to hse;
```

### Run migration

```
cd packages/db
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Run Server work

Start our services

```
yarn watch
```

Start Redis service in WSL(ubuntu) terminal

```
sudo service redis-server start
```
