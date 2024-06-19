"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var mock_test_runner_1 = require("../utils/mock-test-runner/mock-test-runner");
var wire_up_mock_scenario_1 = require("../utils/wire-up-mock-scenario");
var validation_and_code_generation_1 = require("../test-data/validation-and-code-generation");
var configuration_1 = require("../../src/configuration");
var feature = src_1.loadFeature('./specs/features/validation-and-code-generation.feature');
src_1.defineFeature(feature, function (test) {
    var mockTestRunner;
    var errorMessage = '';
    var options;
    var stepDefinitions = null;
    var featureFile = null;
    beforeEach(function () {
        mockTestRunner = new mock_test_runner_1.MockTestRunner();
        errorMessage = '';
        options = __assign({}, configuration_1.defaultConfiguration);
        options.errors = __assign({}, configuration_1.defaultErrorSettings);
    });
    var givenScenariosMustMatchFeatureFileIsEnabled = function (given) {
        given(/`scenariosMustMatchFeatureFile` is (enabled|disabled)/, function (enabledOrDisabled) {
            options.errors.scenariosMustMatchFeatureFile =
                enabledOrDisabled === 'enabled';
        });
    };
    var givenScenariosMustMatchFeatureFileIsDisabled = givenScenariosMustMatchFeatureFileIsEnabled;
    var givenStepsMustMatchFeatureFileIsEnabled = function (given) {
        given(/`stepsMustMatchFeatureFile` is (enabled|disabled)/, function (enabledOrDisabled) {
            options.errors.stepsMustMatchFeatureFile =
                enabledOrDisabled === 'enabled';
        });
    };
    var givenAllowScenariosNotInFeatureFileIsEnabled = function (given) {
        given(/`allowScenariosNotInFeatureFile` is (enabled|disabled)/, function (enabledOrDisabled) {
            options.errors.allowScenariosNotInFeatureFile =
                enabledOrDisabled === 'enabled';
        });
    };
    var givenAllowScenariosNotInFeatureFileIsDisabled = givenAllowScenariosNotInFeatureFileIsEnabled;
    var givenStepsMustMatchFeatureFileIsDisabled = givenStepsMustMatchFeatureFileIsEnabled;
    var whenIRunMyJestCucumberTests = function (when) {
        when('I run my Jest Cucumber tests', function () {
            try {
                wire_up_mock_scenario_1.wireUpMockFeature(mockTestRunner, featureFile, stepDefinitions, options);
            }
            catch (err) {
                errorMessage = err.message;
            }
        });
    };
    var thenIShouldSeeAValidationErrorAndGeneratedCode = function (then) {
        then(/I should (see|not see) a validation error \/ generated code/, function (seeOrNotSee) {
            if (seeOrNotSee === 'see') {
                expect(errorMessage).toBeTruthy();
                expect(errorMessage).toMatchSnapshot();
            }
            else {
                expect(errorMessage).toBeFalsy();
            }
        });
    };
    var thenIShouldNotSeeAValidationErrorAndGeneratedCode = thenIShouldSeeAValidationErrorAndGeneratedCode;
    var thenIShouldSeeAValidationError = function (then) {
        then(/I should (see|not see) a validation error/, function (seeOrNotSee) {
            if (seeOrNotSee === 'see') {
                expect(errorMessage).toBeTruthy();
                expect(errorMessage).toMatchSnapshot();
            }
            else {
                expect(errorMessage).toBeFalsy();
            }
        });
    };
    var thenIShouldNotSeeAValidationError = thenIShouldSeeAValidationError;
    var andAScenarioInAFeatureFileHasNoStepDefinitions = function (and) {
        and('a scenario in a feature file has no step definitions', function () {
            featureFile = validation_and_code_generation_1.featureWithSingleScenario;
            stepDefinitions = validation_and_code_generation_1.emptyStepDefinitions;
        });
    };
    var andTheStepOrderDiffersBetweenTheFeatureAndStepDefinitions = function (and) {
        and('the step order differs between the feature / step definitions', function () {
            featureFile = validation_and_code_generation_1.featureWithSingleScenario;
            stepDefinitions = validation_and_code_generation_1.stepsWithStepsOutOfOrder;
        });
    };
    var andTheStepCountDiffersBetweenTheFeatureAndStepDefinitions = function (and) {
        and('the step count differs between the feature / step definitions', function () {
            featureFile = validation_and_code_generation_1.featureWithSingleScenario;
            stepDefinitions = validation_and_code_generation_1.stepsWithMissingStep;
        });
    };
    var andIHaveAScenarioWhereTheStepMatcherForTheSecondStepDoesntMatchTheStep = function (and) {
        and('I have a scenario where the step matcher for the second step doesn\'t match the step', function () {
            featureFile = validation_and_code_generation_1.featureWithSingleScenario;
            stepDefinitions = validation_and_code_generation_1.stepsWithMismatchedSecondStep;
        });
    };
    var andThereIsAnExtraScenarioInMyStepDefinitionsNotInMyFeatureFile = function (and) {
        and('there is an extra scenario in my step definitions not in my feature file', function () {
            featureFile = validation_and_code_generation_1.featureWithSingleScenario;
            stepDefinitions = validation_and_code_generation_1.stepsForfeatureWithMultipleScenarios;
        });
    };
    test('Enabled and scenario missing step definitions', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenScenariosMustMatchFeatureFileIsEnabled(given);
        andAScenarioInAFeatureFileHasNoStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Disabled and scenario missing step definitions', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenScenariosMustMatchFeatureFileIsDisabled(given);
        andAScenarioInAFeatureFileHasNoStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Enabled and scenario filtered via tag filter', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenScenariosMustMatchFeatureFileIsEnabled(given);
        andAScenarioInAFeatureFileHasNoStepDefinitions(and);
        and('that scenario is filtered via a tag filter', function () {
            options.tagFilter = 'not @my-tag';
        });
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Scenario order is the same', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenScenariosMustMatchFeatureFileIsEnabled(given);
        and('a set of scenarios is ordered the same in the feature / step definitions', function () {
            featureFile = validation_and_code_generation_1.featureWithMultipleScenarios;
            stepDefinitions = validation_and_code_generation_1.stepsForfeatureWithMultipleScenarios;
        });
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Scenario order is different', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenScenariosMustMatchFeatureFileIsEnabled(given);
        and('a set of scenarios is ordered the differently in the feature / step definitions', function () {
            featureFile = validation_and_code_generation_1.featureWithMultipleScenarios;
            stepDefinitions = validation_and_code_generation_1.stepsWithScenariosOutOfOrder;
        });
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Enabled and step order / count are the same', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsEnabled(given);
        and('the step definitions exactly match the feature file', function () {
            featureFile = validation_and_code_generation_1.featureWithMultipleScenarios;
            stepDefinitions = validation_and_code_generation_1.stepsForfeatureWithMultipleScenarios;
        });
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Enabled and step order is different', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsEnabled(given);
        andTheStepOrderDiffersBetweenTheFeatureAndStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Enabled and step count is different', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsEnabled(given);
        andTheStepCountDiffersBetweenTheFeatureAndStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Disabled and step order is different', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsDisabled(given);
        andTheStepOrderDiffersBetweenTheFeatureAndStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Disabled and step count is different', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsDisabled(given);
        andTheStepCountDiffersBetweenTheFeatureAndStepDefinitions(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    // tslint:disable-next-line: max-line-length
    test('Enabled and a step in the step definitions doesn\'t match the step in the feature', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsEnabled(given);
        andIHaveAScenarioWhereTheStepMatcherForTheSecondStepDoesntMatchTheStep(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldSeeAValidationErrorAndGeneratedCode(then);
    });
    // tslint:disable-next-line: max-line-length
    test('Disabled and a step in the step definitions doesn\'t match the step in the feature', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsDisabled(given);
        andIHaveAScenarioWhereTheStepMatcherForTheSecondStepDoesntMatchTheStep(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Scenario with no steps', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenStepsMustMatchFeatureFileIsDisabled(given);
        and('I have a scenario with no steps', function () {
            featureFile = validation_and_code_generation_1.featureWithSteplessScenario;
            stepDefinitions = validation_and_code_generation_1.steplessStepDefinitions;
        });
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationErrorAndGeneratedCode(then);
    });
    test('Enabled and step definitions have an extra scenario', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenAllowScenariosNotInFeatureFileIsEnabled(given);
        andThereIsAnExtraScenarioInMyStepDefinitionsNotInMyFeatureFile(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldNotSeeAValidationError(then);
    });
    test('Disabled and step definitions have an extra scenario', function (_a) {
        var given = _a.given, and = _a.and, when = _a.when, then = _a.then;
        givenAllowScenariosNotInFeatureFileIsDisabled(given);
        andThereIsAnExtraScenarioInMyStepDefinitionsNotInMyFeatureFile(and);
        whenIRunMyJestCucumberTests(when);
        thenIShouldSeeAValidationError(then);
    });
});
//# sourceMappingURL=validation-and-code-generation.steps.js.map