# High Value E2E Testing

<img width="1477" alt="Untitled-1" src="https://github.com/stemmlerjs/the-software-essentialist/assets/6892666/74e7e2ca-ec1e-49c4-bf63-e5d64e8ae76e">


> These two scopes of tests (from UI to DB and from API to DB) run the dominant acceptance test found in packages/shared/tests/features. Using the 4-Tier Acceptance Testing Rig, we run this same test from the unit and integration testing scopes.

1. [Getting setup](#gettingsetup)
2. [Testing API to DB](#apitodb)
3. [Testing UI to DB](#uitodb)

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


## See the following

_UI to DB_
- `packages/shared/tests/features/registration.feature`: the acceptance test
- `packages/frontend/tests/features/registration.e2e.ts`: the executable specification
- `packages/frontend/tests/pages`: the domain specific language layer (page objects)
- `packages/frontend/tests/driver`: the protocol driver (puppeteer/browser automation)


_API to DB_
- `packages/shared/tests/features/registration.feature`: the acceptance test
- `packages/backend/tests/features/registration.e2e.ts`: the executable specification
- `packages/shared/api/index.ts`: the domain specific language layer (apiClient)

