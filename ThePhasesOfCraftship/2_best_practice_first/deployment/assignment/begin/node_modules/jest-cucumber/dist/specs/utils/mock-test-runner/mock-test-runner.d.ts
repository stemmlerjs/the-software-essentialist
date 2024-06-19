/// <reference types="jest" />
import { IJestLike } from '../../../src/feature-definition-creation';
import { MockDescribeBlock } from './mock-describe-block';
export declare class MockTestRunner implements IJestLike {
    rootDescribeBlock: MockDescribeBlock;
    private currentDescribeBlock;
    constructor();
    get describe(): jest.Describe;
    get test(): jest.It;
    execute(describeBlock?: MockDescribeBlock): Promise<any[]>;
}
