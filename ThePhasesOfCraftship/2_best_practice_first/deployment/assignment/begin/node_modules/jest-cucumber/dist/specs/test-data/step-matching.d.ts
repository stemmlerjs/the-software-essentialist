import { MockStepDefinitions } from '../utils/wire-up-mock-scenario';
export declare const featureWithStepsToMatch = "\nFeature: Matching steps\n\n    Scenario: Matching steps\n        Given a given step with step arguments \"1\" and \"2\"\n";
export declare const stringStepMatcher: (stepArgs: any[]) => MockStepDefinitions;
export declare const regexStepMatcher: (stepArgs: any[]) => MockStepDefinitions;
