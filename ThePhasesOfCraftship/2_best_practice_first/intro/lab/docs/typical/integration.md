# Integration

> In terms of the integration tests we're running, there are two key types here. The incoming adapter and the outgoing adapter tests.

## Outgoing adapter tests (contract tests)

> These tests verify that your outgoing adapters adhere to the contract. Combined with any other test that involves the use of test doubles, contract tests create **test-code parity**.

<img width="836" alt="Untitled-4" src="https://github.com/stemmlerjs/the-software-essentialist/assets/6892666/0e3cdc1d-00ec-4ffe-9de7-2f802002776a">

To run these, see the HVIT docs for [running them all](https://github.com/stemmlerjs/the-software-essentialist/blob/main/ThePhasesOfCraftship/2_best_practice_first/intro/lab/docs/highValue/integration.md).

## Incoming adapter tests

> These tests verify that your public-facing API stays consistent over time. It verifies that your incoming protocol (HTTP for example) routes requests to the correct use case. It can also be used to stabilize your API responses.

<img width="1030" alt="Untitled-5" src="https://github.com/stemmlerjs/the-software-essentialist/assets/6892666/7d8767ff-cb06-4c3e-a3ae-903ba249eb83">

To run these, see the HVIT docs for [running them all](https://github.com/stemmlerjs/the-software-essentialist/blob/main/ThePhasesOfCraftship/2_best_practice_first/intro/lab/docs/highValue/integration.md).

