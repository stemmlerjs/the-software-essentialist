# High Value Unit Testing

<img width="1297" alt="Untitled-3" src="https://github.com/stemmlerjs/the-software-essentialist/assets/6892666/f5921d4f-4a51-4d0f-93c0-da956689efa9">

> You can run the acceptance test from a unit testing scope. That means it'll execute extremely fast. 

1. [Getting setup](#gettingsetup)
2. [How to run](#unit)

## Getting setup <a name="gettingsetup"></a>

### Step 1: Build & install

Run the following commands

`npm install`
`npm run build`

## How to run the Unit Tests <a name="unit"></a>

You can run the unit tests across all projects (`frontend`, `backend`, `shared`) by running the following command:

`npm run test:unit:all`

## See the following

_For the high value test_
- `packages/shared/tests/features/registration.feature`: the acceptance test
- `packages/backend/tests/features/registration.unit.ts`: the executable specification


