# High Value Integration Testing

> This test verifies the same functionality verified at the E2E scope (UI -> DB & API -> DB) and the Unit scope.  
Using the 4-Tier Acceptance Testing Rig, we run the test at packages/shared/tests/features and verify the application directly from
the application core (the services). We skip the controller entirely with this test. For demonstration purposes, we've mocked the 
paid transactional email and marketing services (ie: marketingService, emailService).

1. [Getting setup](#gettingsetup)
2. [Testing API to DB](#integration)

## Getting setup <a name="gettingsetup"></a>

### Step 1: Build & install

Run the following commands

`npm install`
`npm run build`

### Step 2: Install & start docker desktop/engine

We use this for the Postgres Database. You can get it [here](https://www.docker.com/products/docker-desktop/)

Then start it by selecting it in your tray.

## How to run the integration tests  <a name="integration"></a>
Run the following command from the root directory:

`npm run test:infra:all`
