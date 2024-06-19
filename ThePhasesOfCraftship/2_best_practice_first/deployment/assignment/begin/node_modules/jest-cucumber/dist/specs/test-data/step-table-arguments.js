"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableStepWithStepArgs = exports.tableStepWithoutStepArgs = exports.featureWithTableArgument = void 0;
exports.featureWithTableArgument = "\nFeature: Table arguments\n\n    Scenario: Matching steps\n        Given a given step with step arguments \"1\" and \"2\" and this:\n        | foo | bar |\n        | baz | boo |\n        | ban | bat |\n";
exports.tableStepWithoutStepArgs = function (stepArgs) {
    return function (mockFeature, defineMockFeature) {
        defineMockFeature(mockFeature, function (test) {
            test('Matching steps', function (_a) {
                var given = _a.given;
                given('a given step with step arguments "1" and "2" and this:', function () {
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
exports.tableStepWithStepArgs = function (stepArgs) {
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
//# sourceMappingURL=step-table-arguments.js.map