import path from "path";
import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import { app } from '@dddforum/backend/src/index';
import { sharedTestRoot } from "@dddforum/shared/src/paths";
import { resetDatabase } from "@dddforum/shared/tests/support/fixtures/reset";
import { CreateUserBuilder } from "@dddforum/shared/tests/support/builders/createUserBuilder";
import { CreateUserParams } from "@dddforum/shared/src/api/users";

const feature = loadFeature(
    path.join(sharedTestRoot, 'features/registration.feature'),
    { tagFilter: '@backend and not @excluded' }
);

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test('Successful registration', ({ given, when, then }) => {
        let user: CreateUserParams;
        let response: request.Response;

        given('I am a new user', () => {
            user = new CreateUserBuilder()
                .withAllRandomDetails()
                .build();
        })

        when('I register with valid account details', async () => {
            response = await request(app)
                .post('/users/new')
                .send(user);
        })

        then('I should be granted access to my account', () => {
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.email).toBe(user.email);
            expect(response.body.data.username).toBe(user.username);
            expect(response.body.data.firstName).toBe(user.firstName);
            expect(response.body.data.lastName).toBe(user.lastName);
            expect(response.body.data.id).toBeDefined();
        })
    })
})