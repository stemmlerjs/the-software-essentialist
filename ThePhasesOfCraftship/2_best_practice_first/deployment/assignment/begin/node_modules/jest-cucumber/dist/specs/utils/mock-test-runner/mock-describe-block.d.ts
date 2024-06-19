import { MockTest } from './mock-test';
export declare class MockDescribeBlock {
    description: string | null;
    skip: boolean;
    concurrent: boolean;
    only: boolean;
    children: Array<MockTest | MockDescribeBlock>;
    constructor(description: string | null, skip: boolean, concurrent: boolean, only: boolean);
}
