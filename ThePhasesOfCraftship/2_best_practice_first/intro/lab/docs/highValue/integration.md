# High Value Integration Testing

<img width="1297" alt="Untitled-2" src="https://github.com/stemmlerjs/the-software-essentialist/assets/6892666/b05e50a4-3f5c-4cbc-b4c9-d5aef02cbcda">


> This test verifies the same functionality verified at the E2E scope (UI -> DB & API -> DB) and the Unit scope.  
Using the 4-Tier Acceptance Testing Rig, we run the test at packages/shared/tests/features and verify the application directly from
the application core (the services). We skip the controller entirely with this test. For demonstration purposes, we've mocked the 
paid transactional email and marketing services (ie: marketingService, emailService).

1. [Getting setup](#gettingsetup)
2. [How to run the integration tests](#integration)

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

## See the following

_For the high value test_
- `packages/shared/tests/features/registration.feature`: the acceptance test
- `packages/backend/tests/features/registration.infra.ts`: the executable specification
- `packages/backend/src/shared/application/applicationInterface.ts`: the domain specific language

_Incoming Adapters_
- `packages/backend/src/modules/users/userController.infra.spec.ts`: incoming adapter (controller) test
- `packages/backend/src/modules/posts/postsController.infra.spec.ts`: incoming adapter (controller) test

_Outgoing Adapters_
- `packages/backend/src/modules/users/adapters/userRepo.infra.spec.ts`: outgoing adapter (contract) test
