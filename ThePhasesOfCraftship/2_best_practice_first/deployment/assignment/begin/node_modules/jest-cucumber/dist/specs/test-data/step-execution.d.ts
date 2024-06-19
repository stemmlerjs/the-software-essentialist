import { MockStepDefinitions } from '../utils/wire-up-mock-scenario';
export declare const featureToExecute = "\nFeature: Executing a feature\n\n    Scenario: Executing a scenario\n        Given a given step\n        When I run the when step\n        Then it should run the then step\n";
export declare const synchronousSteps: (logs: string[]) => MockStepDefinitions;
export declare const failingSynchronousStep: (logs: string[]) => MockStepDefinitions;
export declare const asyncStep: (logs: string[]) => MockStepDefinitions;
export declare const failingAsyncStep: (logs: string[]) => MockStepDefinitions;
