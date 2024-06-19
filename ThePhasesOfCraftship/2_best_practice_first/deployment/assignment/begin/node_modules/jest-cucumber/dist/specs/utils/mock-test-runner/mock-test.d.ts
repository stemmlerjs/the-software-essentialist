/// <reference types="jest" />
export declare class MockTest {
    description: string;
    executionFunc: jest.ProvidesCallback;
    skip: boolean;
    concurrent: boolean;
    only: boolean;
    constructor(description: string, executionFunc: jest.ProvidesCallback, skip: boolean, concurrent: boolean, only: boolean);
}
