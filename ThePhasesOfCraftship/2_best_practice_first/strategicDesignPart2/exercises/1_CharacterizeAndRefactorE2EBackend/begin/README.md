# Begin

## How to get started?
- Install Git
- Install Node v16 or higher on your machine
- Git clone or fork this repo
- go to the begin project
- run `npm install` to install the required dependencies
- run `npm run start:dev` to set up database, seed it and start web server


## Aditional informations

- Under `src/tests/fixtures/` you'll find the `reset.ts` script. It contains a function you can use the reset database state after each test scenario.

As example, you can use it like on the snippet below:

```
afterEach(async () => {
    await resetDatabase();
  });
```

- In case you realize some routes don't properly handle business rules based on any acceptance test you have written, take the opportunity to improve the route instead adjusting the scenario to the code. In real life it's normal to find hidden bugs when you're writing tests to legacy code. Trust in your tests!

- Run `npm run tests:e2e` to run the tests

## Solution

Under the `end` directory, you'll find a solution to the exercise.