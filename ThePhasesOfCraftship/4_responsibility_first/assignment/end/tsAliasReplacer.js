/**
 * There is no way Typescript replaces paths (aliases) defined in the <root>/tsconfig.json in the production code.
 * Therefore, we need to do it manually. This file contains an imports replacer for the tsc-alias package,
 * which can be used as a post-processing step in the build process.
 */

const replacements = [
  ["@dddforum/shared/src", "@dddforum/shared/dist"],
  ["@dddforum/backend/src", "@dddforum/backend/dist"],
  ["@dddforum/frontend/src", "@dddforum/frontend/dist"],
];

/**
 * tsc-alias only supports commonjs replacers.
 */
exports.default = function tsAliasesReplacer({
  orig: originalImport,
  _file,
  _config,
}) {
  let newImport = originalImport;

  replacements.forEach(([fromRule, toRule]) => {
    newImport = newImport.replace(fromRule, toRule);
  });

  return newImport;
};
