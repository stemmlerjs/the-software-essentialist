"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexStepMatcher = exports.stringStepMatcher = exports.featureWithStepsToMatch = void 0;
exports.featureWithStepsToMatch = "\nFeature: Matching steps\n\n    Scenario: Matching steps\n        Given a given step with step arguments \"1\" and \"2\"\n";
exports.stringStepMatcher = function (stepArgs) {
    return function (mockFeature, defineMockFeature) {
        defineMockFeature(mockFeature, function (test) {
            test('Matching steps', function (_a) {
                var given = _a.given;
                given('a given step with step arguments "1" and "2"', function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    args.forEach(function (arg) { return stepArgs.push(arg); });
                });
            });
        });
    };
};
exports.regexStepMatcher = function (stepArgs) {
    return function (mockFeature, defineMockFeature) {
        defineMockFeature(mockFeature, function (test) {
            test('Matching steps', function (_a) {
                var given = _a.given;
                given(/a given step with step arguments "(\d+)" and "(\d+)"/, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    args.forEach(function (arg) { return stepArgs.push(arg); });
                });
            });
        });
    };
};
//# sourceMappingURL=step-matching.js.map