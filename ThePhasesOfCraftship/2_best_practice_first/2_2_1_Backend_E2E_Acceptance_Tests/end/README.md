# 2_2_Backend_Acceptance_Tests (End)

## About this implementation
- Demonstrates how to test using the 4 tier acceptance testing infra

## Demonstrates
- 4 Tier Acceptance Patterns
- Fixtures & Builders
- Idempotency

## Improvements
- Automated tests > manual tests
- Set up 4 tier acceptance test infra (Jest, Jest Cucumber, Axios, Gherkin)
- You can run the tests using the e2e test command 
- Testing folder organized based on the Abstraction Prism
- Uses builders to build input data & set up state of the world (fixtures)
- Uses idempotency techniques to ensure tests can run independently
- Uses builders to handle complex scenarios; not just the success path

### Continued problems
- Still relies on locally installed infrastructure to run; bad usability
- Code internals still not horizontally decoupled properly
- Database connection untested
- Lack of ability to programmatically start & stop server from tests; lack of encapsulation