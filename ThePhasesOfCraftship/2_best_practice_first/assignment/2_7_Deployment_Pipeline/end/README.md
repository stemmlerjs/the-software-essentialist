
## Everything that needs to be assigned and sorted by the very end


- **🔘 Acceptance (E2E):** I have implemented an automated acceptance test which succeeds at registering a new user, exercising the entirety of the backend in a single test.

  ie: e2e Acceptance Test with Gherkins + jest-cucumber + RESTfulAPIDriver + supertest; I have encapsulated the typical complexity brittleness of E2e tests using the 4-layers of abstraction necessary for Acceptance Tests (Specification, Executable Specification, Protocol Driver, Test Library or Framework)

- **🔘 Idempotency:** All of my tests are idempotent (can be run over and over consistently without failure)


- **🔘 Acceptance (E2E):** I have implemented an automated acceptance test which succeeds at registering a new user, exercising the entirety of app (server, application, database) in a single test.

  ie: shared protocol driver, used from frontend as a gateway, page objects as protocol driver for frontend


- **🔘 Docker (development):** I have migrated from using a local installation of a database to using a Dockerized version of my database of choice for my E2E Acceptance test. When running my tests in development mode (NODE_ENV=development), it uses the docker database.

**2 | Usage**

- **🔘 Discoverability:** I have a README which provides instructions on how to:
    - Install
    - Build
    - Test
    - Start
    
    You can see an example of this [here](https://github.com/stemmlerjs/dddforumv2/tree/phase/best-practice-first/1-backend-e2e).
    
- **🔘 Idempotency:** If someone were to clone my repo and run the steps in my README in sequence, they would be able to consistently *********************install, build, test********************* and ******start****** the application.

**3 | Scripting**

- **Installation**: I have verified that running `npm run ci` does a clean install of the dependencies.
- **Building:** I have verified that running `npm run build` does the steps listed above.
- **Testing:**
    - ******E2E******: I have verified that running `npm run test:e2e:dev` does the steps listed above.
    - ********Infra********: I have verified that running `npm run test:infra:dev` does the steps listed above.
- **Starting**: I have verified that I can start the app in a single command without relying on any pre-setup other than having installed Docker. Running `npm run start:dev` does it.

**4 | Integration Testing**

- **🔘 Web Server:** I have verified that I can start and stop my web server programmatically using integration tests.
- **🔘 Web Server:** I have verified that I can reach my web server via a /health API using integration tests.
- **🔘 Database:** I have verified that I can connect and disconnect from my database using integration tests.
- **🔘 Database:** I have verified that I can execute queries against my database using integration tests.

5 | **Encapsulation**

- **🔘 Composition:** I have encapsulated my key abstractions (controllers, database, webserver) using the Composition Root pattern and compose my objects together in a single place.
- **🔘 Environment:** I use a .env.development environment variable file to contain the environment variables that the application relies upon.