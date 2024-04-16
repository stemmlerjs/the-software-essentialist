# High Value Unit Testing

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


