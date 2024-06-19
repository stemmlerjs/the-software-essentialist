"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStructuredValidator = exports.makeExactValidator = exports.makeValidator = void 0;
var tslib_1 = require("tslib");
var internalMakeValidator = function (parseFn) {
    return function (spec) { return (tslib_1.__assign(tslib_1.__assign({}, spec), { _parse: parseFn })); };
};
/**
 * Creates a validator which can output subtypes of `BaseT`. E.g.:
 *
 * ```ts
 * const int = makeValidator<number>((input: string) => {
 *   // Implementation details
 * })
 * const MAX_RETRIES = int({ choices: [1, 2, 3, 4] })
 * // Narrows down output type to 1 | 2 | 3 | 4
 * ```
 *
 * @param parseFn - A function to parse and validate input.
 * @returns A validator which output type is narrowed-down to a subtype of `BaseT`
 */
var makeValidator = function (parseFn) {
    return internalMakeValidator(parseFn);
};
exports.makeValidator = makeValidator;
/**
 * Creates a validator which output type is exactly T:
 *
 * ```ts
 * const int = makeExactValidator<number>((input: string) => {
 *   // Implementation details
 * })
 * const MAX_RETRIES = int({ choices: [1, 2, 3, 4] })
 * // Output type 'number'
 * ```
 *
 * @param parseFn - A function to parse and validate input.
 * @returns A validator which output type is exactly `T`
 */
var makeExactValidator = function (parseFn) {
    return internalMakeValidator(parseFn);
};
exports.makeExactValidator = makeExactValidator;
/**
 * This validator is meant for inputs which can produce arbitrary output types (e.g. json).
 * The typing logic behaves differently from other makers:
 *
 * - makeStructuredValidator has no type parameter.
 * - When no types can be inferred from context, output type defaults to any.
 * - Otherwise, infers type from `default` or `devDefault`.
 * - Also generated validators have an output type parameter.
 * - Finally, the generated validators disallow `choices` parameter.
 *
 * Below is an example of a validator for query parameters (e.g. `option1=foo&option2=bar`):
 *
 * ```ts
 * const queryParams = makeStructuredValidator((input: string) => {
 *   const params = new URLSearchParams(input)
 *   return Object.fromEntries(params.entries())
 * })
 * const OPTIONS1 = queryParams()
 * // Output type 'any'
 * const OPTIONS2 = queryParams({ default: { option1: 'foo', option2: 'bar' } })
 * // Output type '{ option1: string, option2: string }'
 * const OPTIONS3 = queryParams<{ option1?: string; option2?: string }>({
 *   default: { option1: 'foo', option2: 'bar' },
 * })
 * // Output type '{ option1?: string, option2?: string }'
 * ```
 *
 * @param parseFn - A function to parse and validate input.
 * @returns A validator which output type is exactly `T`
 */
var makeStructuredValidator = function (parseFn) {
    return internalMakeValidator(parseFn);
};
exports.makeStructuredValidator = makeStructuredValidator;
//# sourceMappingURL=makers.js.map