# Mapogram Project

## Run Project locally

### 0. Install dependencies

- Make sure you have `docker`
- Install the dep: `yarn install`

### 1. Setup ENV

Example

```bash

# Docker Settings
PROJECT_DIRECTORY=./
PORT=3000
POSTGRES_PORT=5432
POSTGRES_PASSWORD=mapogram123
POSTGRES_USER=postgres
POSTGRES_DB=mapogram
NODE_ENV=development
POSTGRES_SCHEMA=public
POSTGRES_HOST=localhost
DATABASE_URL="postgresql://postgres:mapogram123@localhost:5432/mapogram?schema=public"

API_URL=http://localhost:3000/

```

### 2. Run DB locally

Run command: `docker-compose up db` to run the database at localhost and port 5432

### 3. For new DB or first time, run the DB migration

- Generate the prisma client: `yarn prisma:generate`
- Run Migration: `yarn migrate`
- Run Migration deploy (to make sure): `yarn migrate:deploy`
- Seed some data: `yarn seed`

Then you are ready to have the DB running, please also check if the DB is actually running with docker as well.

### 4. Run the project

Run `yarn dev` to start the application.

## Database Migration

### How to Create Migration


Command for prisma

 ./node_modules/.bin/prisma init  

 ./node_modules/.bin/prisma format   

./node_modules/.bin/prisma generate   

./node_modules/.bin/prisma migrate dev  

## If you're using Docker

After pull the project, find out the .env.example file in the `root directory`.

If you found the file, do this command:

```bash
cp .env.example .env
```

After copy the file, there are some configuration that you need to concern, but it's up to you, I mean the `.env` file has default value for configuration.

If the `.env` file seems right to you, do this command:

```bash
docker-compose up 
```
Let's waiting for the process, and voila!

# Server Installation

## Docker installation
Please refer to this [Official Link](https://docs.docker.com/engine/install/ubuntu/)

To run docker command without sudo:
```bash
sudo usermod -a -G docker [user] #Where [user] is your login user
newgrp docker
```

## Create folder to store nginx config, gis data and generated image
```bash
mkdir -p /home/ubuntu/project-data/gis-data
mkdir -p /home/ubuntu/project-data/nginx
mkdir -p /home/ubuntu/project-data/public
```

## Copy mapogram data to created folder
```bash
scp -i ~/mapogram-key.pem data ubuntu@@13.250.17.55:home/ubuntu/project-data/gis-data
```

## New Installation step
1. Run database migration inside web-app container
```bash
docker exec -it [mapogram-web-container-id] sh
npm run migrate:deploy
npm run seed
exit
```

# Migration
1. ssh to the server
1. Run database migration inside web-app container
```bash
docker exec -it [mapogram-web-container-id] sh
npm run migrate:deploy
```