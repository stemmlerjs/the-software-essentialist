export declare const bool: import("./types").ExactValidator<boolean>;
export declare const num: import("./types").BaseValidator<number>;
export declare const str: import("./types").BaseValidator<string>;
export declare const email: import("./types").BaseValidator<string>;
export declare const host: import("./types").BaseValidator<string>;
export declare const port: import("./types").BaseValidator<number>;
export declare const url: import("./types").BaseValidator<string>;
/**
 * Unless passing a default property, it's recommended that you provide an explicit type parameter
 * for json validation if you're using TypeScript. Otherwise the output will be typed as `any`.
 * For example:
 *
 * ```ts
 * cleanEnv({
 *   MY_VAR: json<{ foo: number }>(),
 * })
 * ```
 */
export declare const json: import("./types").StructuredValidator;
