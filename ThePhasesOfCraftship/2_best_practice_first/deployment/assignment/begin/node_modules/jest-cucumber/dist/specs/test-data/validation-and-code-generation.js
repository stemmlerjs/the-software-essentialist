"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.steplessStepDefinitions = exports.stepsWithMismatchedSecondStep = exports.stepsWithMissingStep = exports.stepsWithStepsOutOfOrder = exports.stepsWithScenariosOutOfOrder = exports.stepsForfeatureWithMultipleScenarios = exports.emptyStepDefinitions = exports.featureWithSteplessScenario = exports.featureWithMultipleScenarios = exports.featureWithSingleScenario = void 0;
exports.featureWithSingleScenario = "\nFeature: Test\n\n    @my-tag\n    Scenario: Doing some stuff\n        Given I did some stuff\n        When I do some stuff\n        Then I should have done some stuff\n";
exports.featureWithMultipleScenarios = "\nFeature: Test\n\n    Scenario: Doing some stuff\n        Given I did some stuff\n        When I do some stuff\n        Then I should have done some stuff\n\n    Scenario: Doing some more stuff\n        Given I did some stuff\n        When I do some stuff\n        Then I should have done some stuff\n\n";
exports.featureWithSteplessScenario = "\nFeature: Test\n\n    Scenario: Doing nothing at all\n";
exports.emptyStepDefinitions = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function () {
        // No step definitions defined
    });
};
exports.stepsForfeatureWithMultipleScenarios = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing some stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
        });
        test('Doing some more stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
        });
    });
};
exports.stepsWithScenariosOutOfOrder = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing some more stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
        });
        test('Doing some stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
        });
    });
};
exports.stepsWithStepsOutOfOrder = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing some stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
        });
    });
};
exports.stepsWithMissingStep = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing some stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I do some stuff', function () {
                // Nothing to do here
            });
        });
    });
};
exports.stepsWithMismatchedSecondStep = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing some stuff', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            given('I did some stuff', function () {
                // Nothing to do here
            });
            when('I don\'t do some stuff', function () {
                // Nothing to do here
            });
            then('I should have done some stuff', function () {
                // Nothing to do here
            });
        });
    });
};
exports.steplessStepDefinitions = function (mockFeature, defineMockFeature) {
    defineMockFeature(mockFeature, function (test) {
        test('Doing nothing at all', function (_a) {
            var given = _a.given, when = _a.when, then = _a.then;
            // No steps to define
        });
    });
};
//# sourceMappingURL=validation-and-code-generation.js.map