import { Options } from '../../src/configuration';
import { DefineFeatureFunction } from '../../src/feature-definition-creation';
import { ParsedFeature } from '../../src/models';
import { MockTestRunner } from './mock-test-runner/mock-test-runner';
export declare type MockStepDefinitions = (feature: ParsedFeature, defineFeature: DefineFeatureFunction) => void;
export declare const wireUpMockFeature: (mockTestRunner: MockTestRunner, featureFile: string, mockStepDefinitions: MockStepDefinitions | null, options?: Options | undefined) => void;
