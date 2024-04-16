# High Value E2E Testing

> These

1. [Getting setup](#gettingsetup)
2. [Testing API to DB](#apitodb)
3. [Testing UI to DB](#uitodb)
4. [Important Files](#files)

## Getting setup <a name="gettingsetup"></a>

### Step 1: Build & install

Run the following commands

`npm install`
`npm run build`

### Step 2: Install & start docker desktop/engine

We use this for the Postgres Database. You can get it [here](https://www.docker.com/products/docker-desktop/)

Then start it by selecting it in your tray.

## How to run the backend E2E tests <a name="apitodb"></a>

Run the following command:

`npm run test:e2e:back`

## How to run the frontend E2E tests <a name="uitodb"></a>

### Step 1: Start the frontend in a separate console

Run the following command:

`npm run start:dev:front`

### Step 2: Start the backend in a separate console

Run the following command:

`npm run start:dev:back`

### Step 3: Run the frontend e2e tests

Run the following command:

`npm run test:e2e:front`

## Important files to check out <a name="files"></a>