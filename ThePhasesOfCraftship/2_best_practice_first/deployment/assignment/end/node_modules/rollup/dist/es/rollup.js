/*
  @license
	Rollup.js v4.17.2
	Tue, 30 Apr 2024 05:00:09 GMT - commit 5e955a1c2c5e080f80f20f650da9b44909d65d56

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
