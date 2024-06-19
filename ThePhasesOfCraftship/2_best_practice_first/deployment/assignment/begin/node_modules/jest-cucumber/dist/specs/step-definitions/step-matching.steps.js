"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var step_matching_1 = require("../test-data/step-matching");
var mock_test_runner_1 = require("../utils/mock-test-runner/mock-test-runner");
var wire_up_mock_scenario_1 = require("../utils/wire-up-mock-scenario");
var feature = src_1.loadFeature('./specs/features/steps/step-matching.feature');
src_1.defineFeature(feature, function (test) {
    var mockTestRunner;
    var errorMessage = '';
    var stepDefinitions = null;
    var featureFile = null;
    var stepArguments;
    beforeEach(function () {
        mockTestRunner = new mock_test_runner_1.MockTestRunner();
        errorMessage = '';
        stepArguments = [];
    });
    var whenIRunMyJestCucumberTests = function (when) {
        when('I run my Jest Cucumber tests', function () { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        wire_up_mock_scenario_1.wireUpMockFeature(mockTestRunner, featureFile, stepDefinitions);
                        return [4 /*yield*/, mockTestRunner.execute()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        errorMessage = err_1.message;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    var thenTheStepShouldMatchCorrectly = function (then) {
        then('the step should match correctly', function () {
            expect(errorMessage).toBeFalsy();
        });
    };
    test('Step definition with plain string', function (_a) {
        var given = _a.given, when = _a.when, then = _a.then, and = _a.and;
        given('a step matched with a plain string in a step definition', function () {
            featureFile = step_matching_1.featureWithStepsToMatch;
            stepDefinitions = step_matching_1.stringStepMatcher(stepArguments);
        });
        whenIRunMyJestCucumberTests(when);
        thenTheStepShouldMatchCorrectly(then);
        and('no step arguments should be passed to the step definition', function () {
            expect(stepArguments.length).toBe(0);
        });
    });
    test('Regex step definition with 2 capture groups', function (_a) {
        var given = _a.given, when = _a.when, then = _a.then, and = _a.and;
        given('a step matched with a regex that has 2 capture groups', function () {
            featureFile = step_matching_1.featureWithStepsToMatch;
            stepDefinitions = step_matching_1.regexStepMatcher(stepArguments);
        });
        whenIRunMyJestCucumberTests(when);
        thenTheStepShouldMatchCorrectly(then);
        and('2 step arguments should be passed to the step definition', function () {
            expect(stepArguments.length).toBe(2);
            expect(stepArguments[0]).toBe('1');
            expect(stepArguments[1]).toBe('2');
        });
    });
});
//# sourceMappingURL=step-matching.steps.js.map