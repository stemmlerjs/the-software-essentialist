# 2_2_Backend_Acceptance_Tests (Start)

## About this implementation
- Basic implementation done in code-first
- You can use the CURL commands to hit the API

### Problems

- Upon startup, will not work because database connection might not be setup
- Relies on you to have Postgres running on your machine
- Doesn't confirm database connection is valid and throw an error upon startup; does not test
- All done in a single place (a single controller); transaction script
- Manual testing required in order to test

## Getting started

- You'll need to set up a local postgres server and have it running at port 5432.
- You should be able to use CURL to test the API calls.