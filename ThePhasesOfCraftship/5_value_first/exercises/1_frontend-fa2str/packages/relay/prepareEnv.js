"use strict";
/**
 * This script allows you to call any other following script with
 * `ts-node prepareEnv <whatever you want to call next>` and if your app
 * is running in development mode (not no NODE_ENV set at all, assumed), it
 * will load the env file before you call the script. This loads the environment
 * up properly.
 *
 * We currently need this for prisma commands to allow prisma to take the config from
 * .env.development in development mode, and from the secrets in the deployment tools in
 * production.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareEnv = void 0;
var child_process_1 = require("child_process");
var path = __importStar(require("path"));
var prepareEnv = function () {
    var env = process.env.NODE_ENV || 'development';
    var packageRoot = path.resolve(__dirname);
    var execParams = {
        cwd: packageRoot,
        stdio: 'inherit',
    };
    var script = process.argv.splice(2).join(' ');
    if (env === 'development') {
        var devEnvFile = '.env.development';
        console.log("Preparing dev environment using ".concat(devEnvFile));
        (0, child_process_1.execSync)("dotenv -e ".concat(devEnvFile, " -- ").concat(script), execParams);
        return;
    }
    console.log("Running ".concat(script, " in ").concat(process.env.NODE_ENV, " mode without loading from env file."));
    (0, child_process_1.execSync)("".concat(script), execParams);
};
exports.prepareEnv = prepareEnv;
(0, exports.prepareEnv)();
