"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// ../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options2) {
      options2 = options2 || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options2.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug6(...args) {
          if (!debug6.enabled) {
            return;
          }
          const self = debug6;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug6.namespace = namespace;
        debug6.useColors = createDebug.useColors();
        debug6.color = createDebug.selectColor(namespace);
        debug6.extend = extend;
        debug6.destroy = createDebug.destroy;
        Object.defineProperty(debug6, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug6);
        }
        return debug6;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min2 = forceColor || 0;
      if (env.TERM === "dumb") {
        return min2;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign2) => sign2 in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min2;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min2;
    }
    function getSupportLevel(stream2) {
      const level = supportsColor(stream2, stream2 && stream2.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util2 = require("util");
    exports.init = init2;
    exports.log = log3;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util2.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log3(...args) {
      return process.stderr.write(util2.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init2(debug6) {
      debug6.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug6.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts);
    };
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// ../../node_modules/.pnpm/@prisma+engines-version@4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81/node_modules/@prisma/engines-version/package.json
var require_package = __commonJS({
  "../../node_modules/.pnpm/@prisma+engines-version@4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81/node_modules/@prisma/engines-version/package.json"(exports, module2) {
    module2.exports = {
      name: "@prisma/engines-version",
      version: "4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81",
      main: "index.js",
      types: "index.d.ts",
      license: "Apache-2.0",
      author: "Tim Suchanek <suchanek@prisma.io>",
      prisma: {
        enginesVersion: "4bc8b6e1b66cb932731fb1bdbbc550d1e010de81"
      },
      repository: {
        type: "git",
        url: "https://github.com/prisma/engines-wrapper.git",
        directory: "packages/engines-version"
      },
      devDependencies: {
        "@types/node": "18.16.18",
        typescript: "4.9.5"
      },
      files: [
        "index.js",
        "index.d.ts"
      ],
      scripts: {
        build: "tsc -d"
      }
    };
  }
});

// ../../node_modules/.pnpm/@prisma+engines-version@4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81/node_modules/@prisma/engines-version/index.js
var require_engines_version = __commonJS({
  "../../node_modules/.pnpm/@prisma+engines-version@4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81/node_modules/@prisma/engines-version/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enginesVersion = void 0;
    exports.enginesVersion = require_package().prisma.enginesVersion;
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs7 = require("fs");
    function checkPathExt(path7, options2) {
      var pathext = options2.pathExt !== void 0 ? options2.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path7.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path7, options2) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path7, options2);
    }
    function isexe(path7, options2, cb) {
      fs7.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path7, options2));
      });
    }
    function sync(path7, options2) {
      return checkStat(fs7.statSync(path7), path7, options2);
    }
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs7 = require("fs");
    function isexe(path7, options2, cb) {
      fs7.stat(path7, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options2));
      });
    }
    function sync(path7, options2) {
      return checkStat(fs7.statSync(path7), options2);
    }
    function checkStat(stat, options2) {
      return stat.isFile() && checkMode(stat, options2);
    }
    function checkMode(stat, options2) {
      var mod2 = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options2.uid !== void 0 ? options2.uid : process.getuid && process.getuid();
      var myGid = options2.gid !== void 0 ? options2.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod2 & o || mod2 & g && gid === myGid || mod2 & u && uid === myUid || mod2 & ug && myUid === 0;
      return ret;
    }
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports, module2) {
    var fs7 = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path7, options2, cb) {
      if (typeof options2 === "function") {
        cb = options2;
        options2 = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path7, options2 || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core(path7, options2 || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options2 && options2.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path7, options2) {
      try {
        return core.sync(path7, options2 || {});
      } catch (er) {
        if (options2 && options2.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS({
  "../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path7 = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i) => new Promise((resolve, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p, i, 0));
      });
      const subStep = (p, i, ii) => new Promise((resolve, reject) => {
        if (ii === pathExt.length)
          return resolve(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve(p + ext);
          }
          return resolve(subStep(p, i, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path7.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// ../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS({
  "../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports, module2) {
    "use strict";
    var pathKey = (options2 = {}) => {
      const environment = options2.env || process.env;
      const platform = options2.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey;
    module2.exports.default = pathKey;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var which = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path7.delimiter : void 0
        });
      } catch (e) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path7.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js"(exports, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// ../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// ../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path7, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path7.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js"(exports, module2) {
    "use strict";
    var fs7 = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs7.openSync(command, "r");
        fs7.readSync(fd, buffer, 0, size, 0);
        fs7.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path7.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parse(command, args, options2) {
      if (args && !Array.isArray(args)) {
        options2 = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options2 = Object.assign({}, options2);
      const parsed = {
        command,
        args,
        options: options2,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options2.shell ? parsed : parseNonShell(parsed);
    }
    module2.exports = parse;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js"(exports, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js"(exports, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn(command, args, options2) {
      const parsed = parse(command, args, options2);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options2) {
      const parsed = parse(command, args, options2);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn;
    module2.exports.spawn = spawn;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// ../../node_modules/.pnpm/yocto-queue@0.1.0/node_modules/yocto-queue/index.js
var require_yocto_queue = __commonJS({
  "../../node_modules/.pnpm/yocto-queue@0.1.0/node_modules/yocto-queue/index.js"(exports, module2) {
    var Node = class {
      constructor(value) {
        this.value = value;
        this.next = void 0;
      }
    };
    var Queue = class {
      constructor() {
        this.clear();
      }
      enqueue(value) {
        const node = new Node(value);
        if (this._head) {
          this._tail.next = node;
          this._tail = node;
        } else {
          this._head = node;
          this._tail = node;
        }
        this._size++;
      }
      dequeue() {
        const current = this._head;
        if (!current) {
          return;
        }
        this._head = this._head.next;
        this._size--;
        return current.value;
      }
      clear() {
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
      }
      get size() {
        return this._size;
      }
      *[Symbol.iterator]() {
        let current = this._head;
        while (current) {
          yield current.value;
          current = current.next;
        }
      }
    };
    module2.exports = Queue;
  }
});

// ../../node_modules/.pnpm/p-limit@3.1.0/node_modules/p-limit/index.js
var require_p_limit = __commonJS({
  "../../node_modules/.pnpm/p-limit@3.1.0/node_modules/p-limit/index.js"(exports, module2) {
    "use strict";
    var Queue = require_yocto_queue();
    var pLimit = (concurrency) => {
      if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
      }
      const queue = new Queue();
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.size > 0) {
          queue.dequeue()();
        }
      };
      const run = async (fn, resolve, ...args) => {
        activeCount++;
        const result = (async () => fn(...args))();
        resolve(result);
        try {
          await result;
        } catch {
        }
        next();
      };
      const enqueue = (fn, resolve, ...args) => {
        queue.enqueue(run.bind(null, fn, resolve, ...args));
        (async () => {
          await Promise.resolve();
          if (activeCount < concurrency && queue.size > 0) {
            queue.dequeue()();
          }
        })();
      };
      const generator2 = (fn, ...args) => new Promise((resolve) => {
        enqueue(fn, resolve, ...args);
      });
      Object.defineProperties(generator2, {
        activeCount: {
          get: () => activeCount
        },
        pendingCount: {
          get: () => queue.size
        },
        clearQueue: {
          value: () => {
            queue.clear();
          }
        }
      });
      return generator2;
    };
    module2.exports = pLimit;
  }
});

// ../../node_modules/.pnpm/p-locate@5.0.0/node_modules/p-locate/index.js
var require_p_locate = __commonJS({
  "../../node_modules/.pnpm/p-locate@5.0.0/node_modules/p-locate/index.js"(exports, module2) {
    "use strict";
    var pLimit = require_p_limit();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = async (element, tester) => tester(await element);
    var finder = async (element) => {
      const values = await Promise.all(element);
      if (values[1] === true) {
        throw new EndError(values[0]);
      }
      return false;
    };
    var pLocate = async (iterable, tester, options2) => {
      options2 = {
        concurrency: Infinity,
        preserveOrder: true,
        ...options2
      };
      const limit = pLimit(options2.concurrency);
      const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
      const checkLimit = pLimit(options2.preserveOrder ? 1 : Infinity);
      try {
        await Promise.all(items.map((element) => checkLimit(finder, element)));
      } catch (error) {
        if (error instanceof EndError) {
          return error.value;
        }
        throw error;
      }
    };
    module2.exports = pLocate;
  }
});

// ../../node_modules/.pnpm/locate-path@6.0.0/node_modules/locate-path/index.js
var require_locate_path = __commonJS({
  "../../node_modules/.pnpm/locate-path@6.0.0/node_modules/locate-path/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var fs7 = require("fs");
    var { promisify: promisify3 } = require("util");
    var pLocate = require_p_locate();
    var fsStat = promisify3(fs7.stat);
    var fsLStat = promisify3(fs7.lstat);
    var typeMappings = {
      directory: "isDirectory",
      file: "isFile"
    };
    function checkType({ type }) {
      if (type in typeMappings) {
        return;
      }
      throw new Error(`Invalid type specified: ${type}`);
    }
    var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
    module2.exports = async (paths2, options2) => {
      options2 = {
        cwd: process.cwd(),
        type: "file",
        allowSymlinks: true,
        ...options2
      };
      checkType(options2);
      const statFn = options2.allowSymlinks ? fsStat : fsLStat;
      return pLocate(paths2, async (path_) => {
        try {
          const stat = await statFn(path7.resolve(options2.cwd, path_));
          return matchType(options2.type, stat);
        } catch {
          return false;
        }
      }, options2);
    };
    module2.exports.sync = (paths2, options2) => {
      options2 = {
        cwd: process.cwd(),
        allowSymlinks: true,
        type: "file",
        ...options2
      };
      checkType(options2);
      const statFn = options2.allowSymlinks ? fs7.statSync : fs7.lstatSync;
      for (const path_ of paths2) {
        try {
          const stat = statFn(path7.resolve(options2.cwd, path_));
          if (matchType(options2.type, stat)) {
            return path_;
          }
        } catch {
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js
var require_path_exists = __commonJS({
  "../../node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js"(exports, module2) {
    "use strict";
    var fs7 = require("fs");
    var { promisify: promisify3 } = require("util");
    var pAccess = promisify3(fs7.access);
    module2.exports = async (path7) => {
      try {
        await pAccess(path7);
        return true;
      } catch (_) {
        return false;
      }
    };
    module2.exports.sync = (path7) => {
      try {
        fs7.accessSync(path7);
        return true;
      } catch (_) {
        return false;
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@5.0.0/node_modules/find-up/index.js
var require_find_up = __commonJS({
  "../../node_modules/.pnpm/find-up@5.0.0/node_modules/find-up/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var locatePath = require_locate_path();
    var pathExists = require_path_exists();
    var stop = Symbol("findUp.stop");
    module2.exports = async (name, options2 = {}) => {
      let directory = path7.resolve(options2.cwd || "");
      const { root } = path7.parse(directory);
      const paths2 = [].concat(name);
      const runMatcher = async (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath(paths2, locateOptions);
        }
        const foundPath = await name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = await runMatcher({ ...options2, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path7.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path7.dirname(directory);
      }
    };
    module2.exports.sync = (name, options2 = {}) => {
      let directory = path7.resolve(options2.cwd || "");
      const { root } = path7.parse(directory);
      const paths2 = [].concat(name);
      const runMatcher = (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath.sync(paths2, locateOptions);
        }
        const foundPath = name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath.sync([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = runMatcher({ ...options2, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path7.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path7.dirname(directory);
      }
    };
    module2.exports.exists = pathExists;
    module2.exports.sync.exists = pathExists.sync;
    module2.exports.stop = stop;
  }
});

// ../../node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js
var require_strip_final_newline = __commonJS({
  "../../node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js"(exports, module2) {
    "use strict";
    module2.exports = (input) => {
      const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
      const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
      if (input[input.length - 1] === LF) {
        input = input.slice(0, input.length - 1);
      }
      if (input[input.length - 1] === CR) {
        input = input.slice(0, input.length - 1);
      }
      return input;
    };
  }
});

// ../../node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS({
  "../../node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var pathKey = require_path_key();
    var npmRunPath = (options2) => {
      options2 = {
        cwd: process.cwd(),
        path: process.env[pathKey()],
        execPath: process.execPath,
        ...options2
      };
      let previous;
      let cwdPath = path7.resolve(options2.cwd);
      const result = [];
      while (previous !== cwdPath) {
        result.push(path7.join(cwdPath, "node_modules/.bin"));
        previous = cwdPath;
        cwdPath = path7.resolve(cwdPath, "..");
      }
      const execPathDir = path7.resolve(options2.cwd, options2.execPath, "..");
      result.push(execPathDir);
      return result.concat(options2.path).join(path7.delimiter);
    };
    module2.exports = npmRunPath;
    module2.exports.default = npmRunPath;
    module2.exports.env = (options2) => {
      options2 = {
        env: process.env,
        ...options2
      };
      const env = { ...options2.env };
      const path8 = pathKey({ env });
      options2.path = env[path8];
      env[path8] = module2.exports(options2);
      return env;
    };
  }
});

// ../../node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "../../node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js"(exports, module2) {
    "use strict";
    var mimicFn = (to, from) => {
      for (const prop of Reflect.ownKeys(from)) {
        Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
      }
      return to;
    };
    module2.exports = mimicFn;
    module2.exports.default = mimicFn;
  }
});

// ../../node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js
var require_onetime = __commonJS({
  "../../node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js"(exports, module2) {
    "use strict";
    var mimicFn = require_mimic_fn();
    var calledFunctions = /* @__PURE__ */ new WeakMap();
    var onetime = (function_, options2 = {}) => {
      if (typeof function_ !== "function") {
        throw new TypeError("Expected a function");
      }
      let returnValue;
      let callCount = 0;
      const functionName = function_.displayName || function_.name || "<anonymous>";
      const onetime2 = function(...arguments_) {
        calledFunctions.set(onetime2, ++callCount);
        if (callCount === 1) {
          returnValue = function_.apply(this, arguments_);
          function_ = null;
        } else if (options2.throw === true) {
          throw new Error(`Function \`${functionName}\` can only be called once`);
        }
        return returnValue;
      };
      mimicFn(onetime2, function_);
      calledFunctions.set(onetime2, callCount);
      return onetime2;
    };
    module2.exports = onetime;
    module2.exports.default = onetime;
    module2.exports.callCount = (function_) => {
      if (!calledFunctions.has(function_)) {
        throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
      }
      return calledFunctions.get(function_);
    };
  }
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js
var require_core = __commonJS({
  "../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SIGNALS = void 0;
    var SIGNALS = [
      {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      },
      {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      },
      {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      },
      {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      },
      {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      },
      {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      },
      {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      },
      {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      },
      {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      },
      {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      },
      {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      },
      {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      },
      {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      },
      {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      },
      {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      },
      {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      },
      {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      },
      {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      },
      {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      },
      {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      },
      {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      },
      {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      },
      {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      },
      {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      },
      {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      },
      {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      },
      {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      },
      {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      },
      {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      },
      {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      },
      {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      }
    ];
    exports.SIGNALS = SIGNALS;
  }
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js
var require_realtime = __commonJS({
  "../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
    var getRealtimeSignals = function() {
      const length = SIGRTMAX - SIGRTMIN + 1;
      return Array.from({ length }, getRealtimeSignal);
    };
    exports.getRealtimeSignals = getRealtimeSignals;
    var getRealtimeSignal = function(value, index) {
      return {
        name: `SIGRT${index + 1}`,
        number: SIGRTMIN + index,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
      };
    };
    var SIGRTMIN = 34;
    var SIGRTMAX = 64;
    exports.SIGRTMAX = SIGRTMAX;
  }
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js
var require_signals = __commonJS({
  "../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSignals = void 0;
    var _os = require("os");
    var _core = require_core();
    var _realtime = require_realtime();
    var getSignals = function() {
      const realtimeSignals = (0, _realtime.getRealtimeSignals)();
      const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
      return signals;
    };
    exports.getSignals = getSignals;
    var normalizeSignal = function({
      name,
      number: defaultNumber,
      description,
      action,
      forced = false,
      standard
    }) {
      const {
        signals: { [name]: constantSignal }
      } = _os.constants;
      const supported = constantSignal !== void 0;
      const number = supported ? constantSignal : defaultNumber;
      return { name, number, description, supported, action, forced, standard };
    };
  }
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js
var require_main = __commonJS({
  "../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.signalsByNumber = exports.signalsByName = void 0;
    var _os = require("os");
    var _signals = require_signals();
    var _realtime = require_realtime();
    var getSignalsByName = function() {
      const signals = (0, _signals.getSignals)();
      return signals.reduce(getSignalByName, {});
    };
    var getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
      return {
        ...signalByNameMemo,
        [name]: { name, number, description, supported, action, forced, standard }
      };
    };
    var signalsByName = getSignalsByName();
    exports.signalsByName = signalsByName;
    var getSignalsByNumber = function() {
      const signals = (0, _signals.getSignals)();
      const length = _realtime.SIGRTMAX + 1;
      const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
      return Object.assign({}, ...signalsA);
    };
    var getSignalByNumber = function(number, signals) {
      const signal = findSignalByNumber(number, signals);
      if (signal === void 0) {
        return {};
      }
      const { name, description, supported, action, forced, standard } = signal;
      return {
        [number]: {
          name,
          number,
          description,
          supported,
          action,
          forced,
          standard
        }
      };
    };
    var findSignalByNumber = function(number, signals) {
      const signal = signals.find(({ name }) => _os.constants.signals[name] === number);
      if (signal !== void 0) {
        return signal;
      }
      return signals.find((signalA) => signalA.number === number);
    };
    var signalsByNumber = getSignalsByNumber();
    exports.signalsByNumber = signalsByNumber;
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js"(exports, module2) {
    "use strict";
    var { signalsByName } = require_main();
    var getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
      if (timedOut) {
        return `timed out after ${timeout} milliseconds`;
      }
      if (isCanceled) {
        return "was canceled";
      }
      if (errorCode !== void 0) {
        return `failed with ${errorCode}`;
      }
      if (signal !== void 0) {
        return `was killed with ${signal} (${signalDescription})`;
      }
      if (exitCode !== void 0) {
        return `failed with exit code ${exitCode}`;
      }
      return "failed";
    };
    var makeError = ({
      stdout,
      stderr,
      all,
      error,
      signal,
      exitCode,
      command,
      escapedCommand,
      timedOut,
      isCanceled,
      killed,
      parsed: { options: { timeout } }
    }) => {
      exitCode = exitCode === null ? void 0 : exitCode;
      signal = signal === null ? void 0 : signal;
      const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
      const errorCode = error && error.code;
      const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
      const execaMessage = `Command ${prefix}: ${command}`;
      const isError = Object.prototype.toString.call(error) === "[object Error]";
      const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
      const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
      if (isError) {
        error.originalMessage = error.message;
        error.message = message;
      } else {
        error = new Error(message);
      }
      error.shortMessage = shortMessage;
      error.command = command;
      error.escapedCommand = escapedCommand;
      error.exitCode = exitCode;
      error.signal = signal;
      error.signalDescription = signalDescription;
      error.stdout = stdout;
      error.stderr = stderr;
      if (all !== void 0) {
        error.all = all;
      }
      if ("bufferedData" in error) {
        delete error.bufferedData;
      }
      error.failed = true;
      error.timedOut = Boolean(timedOut);
      error.isCanceled = isCanceled;
      error.killed = killed && !timedOut;
      return error;
    };
    module2.exports = makeError;
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js
var require_stdio = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js"(exports, module2) {
    "use strict";
    var aliases = ["stdin", "stdout", "stderr"];
    var hasAlias = (options2) => aliases.some((alias) => options2[alias] !== void 0);
    var normalizeStdio = (options2) => {
      if (!options2) {
        return;
      }
      const { stdio } = options2;
      if (stdio === void 0) {
        return aliases.map((alias) => options2[alias]);
      }
      if (hasAlias(options2)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
      }
      if (typeof stdio === "string") {
        return stdio;
      }
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const length = Math.max(stdio.length, aliases.length);
      return Array.from({ length }, (value, index) => stdio[index]);
    };
    module2.exports = normalizeStdio;
    module2.exports.node = (options2) => {
      const stdio = normalizeStdio(options2);
      if (stdio === "ipc") {
        return "ipc";
      }
      if (stdio === void 0 || typeof stdio === "string") {
        return [stdio, stdio, stdio, "ipc"];
      }
      if (stdio.includes("ipc")) {
        return stdio;
      }
      return [...stdio, "ipc"];
    };
  }
});

// ../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
var require_signals2 = __commonJS({
  "../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js"(exports, module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  }
});

// ../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js"(exports, module2) {
    var process2 = global.process;
    var processOk = function(process3) {
      return process3 && typeof process3 === "object" && typeof process3.removeListener === "function" && typeof process3.emit === "function" && typeof process3.reallyExit === "function" && typeof process3.listeners === "function" && typeof process3.kill === "function" && typeof process3.pid === "number" && typeof process3.on === "function";
    };
    if (!processOk(process2)) {
      module2.exports = function() {
        return function() {
        };
      };
    } else {
      assert = require("assert");
      signals = require_signals2();
      isWin = /^win/i.test(process2.platform);
      EE = require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process2.__signal_exit_emitter__) {
        emitter = process2.__signal_exit_emitter__;
      } else {
        emitter = process2.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module2.exports = function(cb, opts) {
        if (!processOk(global.process)) {
          return function() {
          };
        }
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      unload = function unload2() {
        if (!loaded || !processOk(global.process)) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process2.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process2.emit = originalProcessEmit;
        process2.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module2.exports.unload = unload;
      emit = function emit2(event, code, signal) {
        if (emitter.emitted[event]) {
          return;
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (!processOk(global.process)) {
            return;
          }
          var listeners = process2.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process2.kill(process2.pid, sig);
          }
        };
      });
      module2.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load = function load2() {
        if (loaded || !processOk(global.process)) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process2.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process2.emit = processEmit;
        process2.reallyExit = processReallyExit;
      };
      module2.exports.load = load;
      originalProcessReallyExit = process2.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process2.exitCode = code || 0;
        emit("exit", process2.exitCode, null);
        emit("afterexit", process2.exitCode, null);
        originalProcessReallyExit.call(process2, process2.exitCode);
      };
      originalProcessEmit = process2.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process2.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process2.exitCode, null);
          emit("afterexit", process2.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      };
    }
    var assert;
    var signals;
    var isWin;
    var EE;
    var emitter;
    var unload;
    var emit;
    var sigListeners;
    var loaded;
    var load;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js
var require_kill = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var onExit = require_signal_exit();
    var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
    var spawnedKill = (kill, signal = "SIGTERM", options2 = {}) => {
      const killResult = kill(signal);
      setKillTimeout(kill, signal, options2, killResult);
      return killResult;
    };
    var setKillTimeout = (kill, signal, options2, killResult) => {
      if (!shouldForceKill(signal, options2, killResult)) {
        return;
      }
      const timeout = getForceKillAfterTimeout(options2);
      const t = setTimeout(() => {
        kill("SIGKILL");
      }, timeout);
      if (t.unref) {
        t.unref();
      }
    };
    var shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => {
      return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
    };
    var isSigterm = (signal) => {
      return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
    };
    var getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
      if (forceKillAfterTimeout === true) {
        return DEFAULT_FORCE_KILL_TIMEOUT;
      }
      if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
        throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
      }
      return forceKillAfterTimeout;
    };
    var spawnedCancel = (spawned, context) => {
      const killResult = spawned.kill();
      if (killResult) {
        context.isCanceled = true;
      }
    };
    var timeoutKill = (spawned, signal, reject) => {
      spawned.kill(signal);
      reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
    };
    var setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
      if (timeout === 0 || timeout === void 0) {
        return spawnedPromise;
      }
      let timeoutId;
      const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          timeoutKill(spawned, killSignal, reject);
        }, timeout);
      });
      const safeSpawnedPromise = spawnedPromise.finally(() => {
        clearTimeout(timeoutId);
      });
      return Promise.race([timeoutPromise, safeSpawnedPromise]);
    };
    var validateTimeout = ({ timeout }) => {
      if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
        throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
      }
    };
    var setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
      if (!cleanup || detached) {
        return timedPromise;
      }
      const removeExitHandler = onExit(() => {
        spawned.kill();
      });
      return timedPromise.finally(() => {
        removeExitHandler();
      });
    };
    module2.exports = {
      spawnedKill,
      spawnedCancel,
      setupTimeout,
      validateTimeout,
      setExitHandler
    };
  }
});

// ../../node_modules/.pnpm/is-stream@2.0.1/node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "../../node_modules/.pnpm/is-stream@2.0.1/node_modules/is-stream/index.js"(exports, module2) {
    "use strict";
    var isStream = (stream2) => stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
    isStream.writable = (stream2) => isStream(stream2) && stream2.writable !== false && typeof stream2._write === "function" && typeof stream2._writableState === "object";
    isStream.readable = (stream2) => isStream(stream2) && stream2.readable !== false && typeof stream2._read === "function" && typeof stream2._readableState === "object";
    isStream.duplex = (stream2) => isStream.writable(stream2) && isStream.readable(stream2);
    isStream.transform = (stream2) => isStream.duplex(stream2) && typeof stream2._transform === "function";
    module2.exports = isStream;
  }
});

// ../../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "../../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js"(exports, module2) {
    "use strict";
    var { PassThrough: PassThroughStream } = require("stream");
    module2.exports = (options2) => {
      options2 = { ...options2 };
      const { array: array2 } = options2;
      let { encoding } = options2;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array2) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream2 = new PassThroughStream({ objectMode });
      if (encoding) {
        stream2.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream2.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream2.getBufferedValue = () => {
        if (array2) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream2.getBufferedLength = () => length;
      return stream2;
    };
  }
});

// ../../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "../../node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js"(exports, module2) {
    "use strict";
    var { constants: BufferConstants } = require("buffer");
    var stream2 = require("stream");
    var { promisify: promisify3 } = require("util");
    var bufferStream = require_buffer_stream();
    var streamPipelinePromisified = promisify3(stream2.pipeline);
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream(inputStream, options2) {
      if (!inputStream) {
        throw new Error("Expected a stream");
      }
      options2 = {
        maxBuffer: Infinity,
        ...options2
      };
      const { maxBuffer } = options2;
      const stream3 = bufferStream(options2);
      await new Promise((resolve, reject) => {
        const rejectPromise = (error) => {
          if (error && stream3.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error.bufferedData = stream3.getBufferedValue();
          }
          reject(error);
        };
        (async () => {
          try {
            await streamPipelinePromisified(inputStream, stream3);
            resolve();
          } catch (error) {
            rejectPromise(error);
          }
        })();
        stream3.on("data", () => {
          if (stream3.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream3.getBufferedValue();
    }
    module2.exports = getStream;
    module2.exports.buffer = (stream3, options2) => getStream(stream3, { ...options2, encoding: "buffer" });
    module2.exports.array = (stream3, options2) => getStream(stream3, { ...options2, array: true });
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// ../../node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
var require_merge_stream = __commonJS({
  "../../node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js"(exports, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = function() {
      var sources = [];
      var output = new PassThrough({ objectMode: true });
      output.setMaxListeners(0);
      output.add = add2;
      output.isEmpty = isEmpty;
      output.on("unpipe", remove);
      Array.prototype.slice.call(arguments).forEach(add2);
      return output;
      function add2(source) {
        if (Array.isArray(source)) {
          source.forEach(add2);
          return this;
        }
        sources.push(source);
        source.once("end", remove.bind(null, source));
        source.once("error", output.emit.bind(output, "error"));
        source.pipe(output, { end: false });
        return this;
      }
      function isEmpty() {
        return sources.length == 0;
      }
      function remove(source) {
        sources = sources.filter(function(it) {
          return it !== source;
        });
        if (!sources.length && output.readable) {
          output.end();
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js"(exports, module2) {
    "use strict";
    var isStream = require_is_stream();
    var getStream = require_get_stream();
    var mergeStream = require_merge_stream();
    var handleInput = (spawned, input) => {
      if (input === void 0 || spawned.stdin === void 0) {
        return;
      }
      if (isStream(input)) {
        input.pipe(spawned.stdin);
      } else {
        spawned.stdin.end(input);
      }
    };
    var makeAllStream = (spawned, { all }) => {
      if (!all || !spawned.stdout && !spawned.stderr) {
        return;
      }
      const mixed = mergeStream();
      if (spawned.stdout) {
        mixed.add(spawned.stdout);
      }
      if (spawned.stderr) {
        mixed.add(spawned.stderr);
      }
      return mixed;
    };
    var getBufferedData = async (stream2, streamPromise) => {
      if (!stream2) {
        return;
      }
      stream2.destroy();
      try {
        return await streamPromise;
      } catch (error) {
        return error.bufferedData;
      }
    };
    var getStreamPromise = (stream2, { encoding, buffer, maxBuffer }) => {
      if (!stream2 || !buffer) {
        return;
      }
      if (encoding) {
        return getStream(stream2, { encoding, maxBuffer });
      }
      return getStream.buffer(stream2, { maxBuffer });
    };
    var getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
      const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
      const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
      const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
      try {
        return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
      } catch (error) {
        return Promise.all([
          { error, signal: error.signal, timedOut: error.timedOut },
          getBufferedData(stdout, stdoutPromise),
          getBufferedData(stderr, stderrPromise),
          getBufferedData(all, allPromise)
        ]);
      }
    };
    var validateInputSync = ({ input }) => {
      if (isStream(input)) {
        throw new TypeError("The `input` option cannot be a stream in sync mode");
      }
    };
    module2.exports = {
      handleInput,
      makeAllStream,
      getSpawnedResult,
      validateInputSync
    };
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js
var require_promise = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js"(exports, module2) {
    "use strict";
    var nativePromisePrototype = (async () => {
    })().constructor.prototype;
    var descriptors = ["then", "catch", "finally"].map((property2) => [
      property2,
      Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property2)
    ]);
    var mergePromise = (spawned, promise2) => {
      for (const [property2, descriptor] of descriptors) {
        const value = typeof promise2 === "function" ? (...args) => Reflect.apply(descriptor.value, promise2(), args) : descriptor.value.bind(promise2);
        Reflect.defineProperty(spawned, property2, { ...descriptor, value });
      }
      return spawned;
    };
    var getSpawnedPromise = (spawned) => {
      return new Promise((resolve, reject) => {
        spawned.on("exit", (exitCode, signal) => {
          resolve({ exitCode, signal });
        });
        spawned.on("error", (error) => {
          reject(error);
        });
        if (spawned.stdin) {
          spawned.stdin.on("error", (error) => {
            reject(error);
          });
        }
      });
    };
    module2.exports = {
      mergePromise,
      getSpawnedPromise
    };
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js
var require_command = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js"(exports, module2) {
    "use strict";
    var normalizeArgs = (file, args = []) => {
      if (!Array.isArray(args)) {
        return [file];
      }
      return [file, ...args];
    };
    var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
    var DOUBLE_QUOTES_REGEXP = /"/g;
    var escapeArg = (arg) => {
      if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
        return arg;
      }
      return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
    };
    var joinCommand = (file, args) => {
      return normalizeArgs(file, args).join(" ");
    };
    var getEscapedCommand = (file, args) => {
      return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
    };
    var SPACES_REGEXP = / +/g;
    var parseCommand = (command) => {
      const tokens = [];
      for (const token of command.trim().split(SPACES_REGEXP)) {
        const previousToken = tokens[tokens.length - 1];
        if (previousToken && previousToken.endsWith("\\")) {
          tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
        } else {
          tokens.push(token);
        }
      }
      return tokens;
    };
    module2.exports = {
      joinCommand,
      getEscapedCommand,
      parseCommand
    };
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js
var require_execa = __commonJS({
  "../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var childProcess = require("child_process");
    var crossSpawn = require_cross_spawn();
    var stripFinalNewline = require_strip_final_newline();
    var npmRunPath = require_npm_run_path();
    var onetime = require_onetime();
    var makeError = require_error();
    var normalizeStdio = require_stdio();
    var { spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler } = require_kill();
    var { handleInput, getSpawnedResult, makeAllStream, validateInputSync } = require_stream();
    var { mergePromise, getSpawnedPromise } = require_promise();
    var { joinCommand, parseCommand, getEscapedCommand } = require_command();
    var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
    var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
      const env = extendEnv ? { ...process.env, ...envOption } : envOption;
      if (preferLocal) {
        return npmRunPath.env({ env, cwd: localDir, execPath });
      }
      return env;
    };
    var handleArguments = (file, args, options2 = {}) => {
      const parsed = crossSpawn._parse(file, args, options2);
      file = parsed.command;
      args = parsed.args;
      options2 = parsed.options;
      options2 = {
        maxBuffer: DEFAULT_MAX_BUFFER,
        buffer: true,
        stripFinalNewline: true,
        extendEnv: true,
        preferLocal: false,
        localDir: options2.cwd || process.cwd(),
        execPath: process.execPath,
        encoding: "utf8",
        reject: true,
        cleanup: true,
        all: false,
        windowsHide: true,
        ...options2
      };
      options2.env = getEnv(options2);
      options2.stdio = normalizeStdio(options2);
      if (process.platform === "win32" && path7.basename(file, ".exe") === "cmd") {
        args.unshift("/q");
      }
      return { file, args, options: options2, parsed };
    };
    var handleOutput = (options2, value, error) => {
      if (typeof value !== "string" && !Buffer.isBuffer(value)) {
        return error === void 0 ? void 0 : "";
      }
      if (options2.stripFinalNewline) {
        return stripFinalNewline(value);
      }
      return value;
    };
    var execa2 = (file, args, options2) => {
      const parsed = handleArguments(file, args, options2);
      const command = joinCommand(file, args);
      const escapedCommand = getEscapedCommand(file, args);
      validateTimeout(parsed.options);
      let spawned;
      try {
        spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
      } catch (error) {
        const dummySpawned = new childProcess.ChildProcess();
        const errorPromise = Promise.reject(makeError({
          error,
          stdout: "",
          stderr: "",
          all: "",
          command,
          escapedCommand,
          parsed,
          timedOut: false,
          isCanceled: false,
          killed: false
        }));
        return mergePromise(dummySpawned, errorPromise);
      }
      const spawnedPromise = getSpawnedPromise(spawned);
      const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
      const processDone = setExitHandler(spawned, parsed.options, timedPromise);
      const context = { isCanceled: false };
      spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
      spawned.cancel = spawnedCancel.bind(null, spawned, context);
      const handlePromise = async () => {
        const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
        const stdout = handleOutput(parsed.options, stdoutResult);
        const stderr = handleOutput(parsed.options, stderrResult);
        const all = handleOutput(parsed.options, allResult);
        if (error || exitCode !== 0 || signal !== null) {
          const returnedError = makeError({
            error,
            exitCode,
            signal,
            stdout,
            stderr,
            all,
            command,
            escapedCommand,
            parsed,
            timedOut,
            isCanceled: context.isCanceled,
            killed: spawned.killed
          });
          if (!parsed.options.reject) {
            return returnedError;
          }
          throw returnedError;
        }
        return {
          command,
          escapedCommand,
          exitCode: 0,
          stdout,
          stderr,
          all,
          failed: false,
          timedOut: false,
          isCanceled: false,
          killed: false
        };
      };
      const handlePromiseOnce = onetime(handlePromise);
      handleInput(spawned, parsed.options.input);
      spawned.all = makeAllStream(spawned, parsed.options);
      return mergePromise(spawned, handlePromiseOnce);
    };
    module2.exports = execa2;
    module2.exports.sync = (file, args, options2) => {
      const parsed = handleArguments(file, args, options2);
      const command = joinCommand(file, args);
      const escapedCommand = getEscapedCommand(file, args);
      validateInputSync(parsed.options);
      let result;
      try {
        result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
      } catch (error) {
        throw makeError({
          error,
          stdout: "",
          stderr: "",
          all: "",
          command,
          escapedCommand,
          parsed,
          timedOut: false,
          isCanceled: false,
          killed: false
        });
      }
      const stdout = handleOutput(parsed.options, result.stdout, result.error);
      const stderr = handleOutput(parsed.options, result.stderr, result.error);
      if (result.error || result.status !== 0 || result.signal !== null) {
        const error = makeError({
          stdout,
          stderr,
          error: result.error,
          signal: result.signal,
          exitCode: result.status,
          command,
          escapedCommand,
          parsed,
          timedOut: result.error && result.error.code === "ETIMEDOUT",
          isCanceled: false,
          killed: result.signal !== null
        });
        if (!parsed.options.reject) {
          return error;
        }
        throw error;
      }
      return {
        command,
        escapedCommand,
        exitCode: 0,
        stdout,
        stderr,
        failed: false,
        timedOut: false,
        isCanceled: false,
        killed: false
      };
    };
    module2.exports.command = (command, options2) => {
      const [file, ...args] = parseCommand(command);
      return execa2(file, args, options2);
    };
    module2.exports.commandSync = (command, options2) => {
      const [file, ...args] = parseCommand(command);
      return execa2.sync(file, args, options2);
    };
    module2.exports.node = (scriptPath, args, options2 = {}) => {
      if (args && !Array.isArray(args) && typeof args === "object") {
        options2 = args;
        args = [];
      }
      const stdio = normalizeStdio.node(options2);
      const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
      const {
        nodePath = process.execPath,
        nodeOptions = defaultExecArgv
      } = options2;
      return execa2(
        nodePath,
        [
          ...nodeOptions,
          scriptPath,
          ...Array.isArray(args) ? args : []
        ],
        {
          ...options2,
          stdin: void 0,
          stdout: void 0,
          stderr: void 0,
          stdio,
          shell: false
        }
      );
    };
  }
});

// ../../node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js
var require_p_try = __commonJS({
  "../../node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js"(exports, module2) {
    "use strict";
    var pTry = (fn, ...arguments_) => new Promise((resolve) => {
      resolve(fn(...arguments_));
    });
    module2.exports = pTry;
    module2.exports.default = pTry;
  }
});

// ../../node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js
var require_p_limit2 = __commonJS({
  "../../node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js"(exports, module2) {
    "use strict";
    var pTry = require_p_try();
    var pLimit = (concurrency) => {
      if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
      }
      const queue = [];
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };
      const run = (fn, resolve, ...args) => {
        activeCount++;
        const result = pTry(fn, ...args);
        resolve(result);
        result.then(next, next);
      };
      const enqueue = (fn, resolve, ...args) => {
        if (activeCount < concurrency) {
          run(fn, resolve, ...args);
        } else {
          queue.push(run.bind(null, fn, resolve, ...args));
        }
      };
      const generator2 = (fn, ...args) => new Promise((resolve) => enqueue(fn, resolve, ...args));
      Object.defineProperties(generator2, {
        activeCount: {
          get: () => activeCount
        },
        pendingCount: {
          get: () => queue.length
        },
        clearQueue: {
          value: () => {
            queue.length = 0;
          }
        }
      });
      return generator2;
    };
    module2.exports = pLimit;
    module2.exports.default = pLimit;
  }
});

// ../../node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js
var require_p_locate2 = __commonJS({
  "../../node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js"(exports, module2) {
    "use strict";
    var pLimit = require_p_limit2();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = async (element, tester) => tester(await element);
    var finder = async (element) => {
      const values = await Promise.all(element);
      if (values[1] === true) {
        throw new EndError(values[0]);
      }
      return false;
    };
    var pLocate = async (iterable, tester, options2) => {
      options2 = {
        concurrency: Infinity,
        preserveOrder: true,
        ...options2
      };
      const limit = pLimit(options2.concurrency);
      const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
      const checkLimit = pLimit(options2.preserveOrder ? 1 : Infinity);
      try {
        await Promise.all(items.map((element) => checkLimit(finder, element)));
      } catch (error) {
        if (error instanceof EndError) {
          return error.value;
        }
        throw error;
      }
    };
    module2.exports = pLocate;
    module2.exports.default = pLocate;
  }
});

// ../../node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js
var require_locate_path2 = __commonJS({
  "../../node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var fs7 = require("fs");
    var { promisify: promisify3 } = require("util");
    var pLocate = require_p_locate2();
    var fsStat = promisify3(fs7.stat);
    var fsLStat = promisify3(fs7.lstat);
    var typeMappings = {
      directory: "isDirectory",
      file: "isFile"
    };
    function checkType({ type }) {
      if (type in typeMappings) {
        return;
      }
      throw new Error(`Invalid type specified: ${type}`);
    }
    var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
    module2.exports = async (paths2, options2) => {
      options2 = {
        cwd: process.cwd(),
        type: "file",
        allowSymlinks: true,
        ...options2
      };
      checkType(options2);
      const statFn = options2.allowSymlinks ? fsStat : fsLStat;
      return pLocate(paths2, async (path_) => {
        try {
          const stat = await statFn(path7.resolve(options2.cwd, path_));
          return matchType(options2.type, stat);
        } catch (_) {
          return false;
        }
      }, options2);
    };
    module2.exports.sync = (paths2, options2) => {
      options2 = {
        cwd: process.cwd(),
        allowSymlinks: true,
        type: "file",
        ...options2
      };
      checkType(options2);
      const statFn = options2.allowSymlinks ? fs7.statSync : fs7.lstatSync;
      for (const path_ of paths2) {
        try {
          const stat = statFn(path7.resolve(options2.cwd, path_));
          if (matchType(options2.type, stat)) {
            return path_;
          }
        } catch (_) {
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js
var require_find_up2 = __commonJS({
  "../../node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var locatePath = require_locate_path2();
    var pathExists = require_path_exists();
    var stop = Symbol("findUp.stop");
    module2.exports = async (name, options2 = {}) => {
      let directory = path7.resolve(options2.cwd || "");
      const { root } = path7.parse(directory);
      const paths2 = [].concat(name);
      const runMatcher = async (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath(paths2, locateOptions);
        }
        const foundPath = await name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = await runMatcher({ ...options2, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path7.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path7.dirname(directory);
      }
    };
    module2.exports.sync = (name, options2 = {}) => {
      let directory = path7.resolve(options2.cwd || "");
      const { root } = path7.parse(directory);
      const paths2 = [].concat(name);
      const runMatcher = (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath.sync(paths2, locateOptions);
        }
        const foundPath = name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath.sync([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = runMatcher({ ...options2, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path7.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path7.dirname(directory);
      }
    };
    module2.exports.exists = pathExists;
    module2.exports.sync.exists = pathExists.sync;
    module2.exports.stop = stop;
  }
});

// ../../node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "../../node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js"(exports, module2) {
    "use strict";
    module2.exports = function isArrayish(obj) {
      if (!obj) {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && obj.splice instanceof Function;
    };
  }
});

// ../../node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js
var require_error_ex = __commonJS({
  "../../node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js"(exports, module2) {
    "use strict";
    var util2 = require("util");
    var isArrayish = require_is_arrayish();
    var errorEx = function errorEx2(name, properties) {
      if (!name || name.constructor !== String) {
        properties = name || {};
        name = Error.name;
      }
      var errorExError = function ErrorEXError(message) {
        if (!this) {
          return new ErrorEXError(message);
        }
        message = message instanceof Error ? message.message : message || this.message;
        Error.call(this, message);
        Error.captureStackTrace(this, errorExError);
        this.name = name;
        Object.defineProperty(this, "message", {
          configurable: true,
          enumerable: false,
          get: function() {
            var newMessage = message.split(/\r?\n/g);
            for (var key in properties) {
              if (!properties.hasOwnProperty(key)) {
                continue;
              }
              var modifier = properties[key];
              if ("message" in modifier) {
                newMessage = modifier.message(this[key], newMessage) || newMessage;
                if (!isArrayish(newMessage)) {
                  newMessage = [newMessage];
                }
              }
            }
            return newMessage.join("\n");
          },
          set: function(v) {
            message = v;
          }
        });
        var overwrittenStack = null;
        var stackDescriptor = Object.getOwnPropertyDescriptor(this, "stack");
        var stackGetter = stackDescriptor.get;
        var stackValue = stackDescriptor.value;
        delete stackDescriptor.value;
        delete stackDescriptor.writable;
        stackDescriptor.set = function(newstack) {
          overwrittenStack = newstack;
        };
        stackDescriptor.get = function() {
          var stack = (overwrittenStack || (stackGetter ? stackGetter.call(this) : stackValue)).split(/\r?\n+/g);
          if (!overwrittenStack) {
            stack[0] = this.name + ": " + this.message;
          }
          var lineCount = 1;
          for (var key in properties) {
            if (!properties.hasOwnProperty(key)) {
              continue;
            }
            var modifier = properties[key];
            if ("line" in modifier) {
              var line = modifier.line(this[key]);
              if (line) {
                stack.splice(lineCount++, 0, "    " + line);
              }
            }
            if ("stack" in modifier) {
              modifier.stack(this[key], stack);
            }
          }
          return stack.join("\n");
        };
        Object.defineProperty(this, "stack", stackDescriptor);
      };
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(errorExError.prototype, Error.prototype);
        Object.setPrototypeOf(errorExError, Error);
      } else {
        util2.inherits(errorExError, Error);
      }
      return errorExError;
    };
    errorEx.append = function(str, def) {
      return {
        message: function(v, message) {
          v = v || def;
          if (v) {
            message[0] += " " + str.replace("%s", v.toString());
          }
          return message;
        }
      };
    };
    errorEx.line = function(str, def) {
      return {
        line: function(v) {
          v = v || def;
          if (v) {
            return str.replace("%s", v.toString());
          }
          return null;
        }
      };
    };
    module2.exports = errorEx;
  }
});

// ../../node_modules/.pnpm/json-parse-even-better-errors@2.3.1/node_modules/json-parse-even-better-errors/index.js
var require_json_parse_even_better_errors = __commonJS({
  "../../node_modules/.pnpm/json-parse-even-better-errors@2.3.1/node_modules/json-parse-even-better-errors/index.js"(exports, module2) {
    "use strict";
    var hexify = (char) => {
      const h = char.charCodeAt(0).toString(16).toUpperCase();
      return "0x" + (h.length % 2 ? "0" : "") + h;
    };
    var parseError = (e, txt, context) => {
      if (!txt) {
        return {
          message: e.message + " while parsing empty string",
          position: 0
        };
      }
      const badToken = e.message.match(/^Unexpected token (.) .*position\s+(\d+)/i);
      const errIdx = badToken ? +badToken[2] : e.message.match(/^Unexpected end of JSON.*/i) ? txt.length - 1 : null;
      const msg = badToken ? e.message.replace(/^Unexpected token ./, `Unexpected token ${JSON.stringify(badToken[1])} (${hexify(badToken[1])})`) : e.message;
      if (errIdx !== null && errIdx !== void 0) {
        const start = errIdx <= context ? 0 : errIdx - context;
        const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
        const slice = (start === 0 ? "" : "...") + txt.slice(start, end) + (end === txt.length ? "" : "...");
        const near = txt === slice ? "" : "near ";
        return {
          message: msg + ` while parsing ${near}${JSON.stringify(slice)}`,
          position: errIdx
        };
      } else {
        return {
          message: msg + ` while parsing '${txt.slice(0, context * 2)}'`,
          position: 0
        };
      }
    };
    var JSONParseError = class extends SyntaxError {
      constructor(er, txt, context, caller) {
        context = context || 20;
        const metadata = parseError(er, txt, context);
        super(metadata.message);
        Object.assign(this, metadata);
        this.code = "EJSONPARSE";
        this.systemError = er;
        Error.captureStackTrace(this, caller || this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
      set name(n) {
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    var kIndent = Symbol.for("indent");
    var kNewline = Symbol.for("newline");
    var formatRE = /^\s*[{\[]((?:\r?\n)+)([\s\t]*)/;
    var emptyRE = /^(?:\{\}|\[\])((?:\r?\n)+)?$/;
    var parseJson = (txt, reviver, context) => {
      const parseText = stripBOM(txt);
      context = context || 20;
      try {
        const [, newline = "\n", indent14 = "  "] = parseText.match(emptyRE) || parseText.match(formatRE) || [, "", ""];
        const result = JSON.parse(parseText, reviver);
        if (result && typeof result === "object") {
          result[kNewline] = newline;
          result[kIndent] = indent14;
        }
        return result;
      } catch (e) {
        if (typeof txt !== "string" && !Buffer.isBuffer(txt)) {
          const isEmptyArray = Array.isArray(txt) && txt.length === 0;
          throw Object.assign(new TypeError(
            `Cannot parse ${isEmptyArray ? "an empty array" : String(txt)}`
          ), {
            code: "EJSONPARSE",
            systemError: e
          });
        }
        throw new JSONParseError(e, parseText, context, parseJson);
      }
    };
    var stripBOM = (txt) => String(txt).replace(/^\uFEFF/, "");
    module2.exports = parseJson;
    parseJson.JSONParseError = JSONParseError;
    parseJson.noExceptions = (txt, reviver) => {
      try {
        return JSON.parse(stripBOM(txt), reviver);
      } catch (e) {
      }
    };
  }
});

// ../../node_modules/.pnpm/lines-and-columns@1.2.4/node_modules/lines-and-columns/build/index.js
var require_build = __commonJS({
  "../../node_modules/.pnpm/lines-and-columns@1.2.4/node_modules/lines-and-columns/build/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.LinesAndColumns = void 0;
    var LF = "\n";
    var CR = "\r";
    var LinesAndColumns = function() {
      function LinesAndColumns2(string) {
        this.string = string;
        var offsets = [0];
        for (var offset = 0; offset < string.length; ) {
          switch (string[offset]) {
            case LF:
              offset += LF.length;
              offsets.push(offset);
              break;
            case CR:
              offset += CR.length;
              if (string[offset] === LF) {
                offset += LF.length;
              }
              offsets.push(offset);
              break;
            default:
              offset++;
              break;
          }
        }
        this.offsets = offsets;
      }
      LinesAndColumns2.prototype.locationForIndex = function(index) {
        if (index < 0 || index > this.string.length) {
          return null;
        }
        var line = 0;
        var offsets = this.offsets;
        while (offsets[line + 1] <= index) {
          line++;
        }
        var column = index - offsets[line];
        return { line, column };
      };
      LinesAndColumns2.prototype.indexForLocation = function(location) {
        var line = location.line, column = location.column;
        if (line < 0 || line >= this.offsets.length) {
          return null;
        }
        if (column < 0 || column > this.lengthOfLine(line)) {
          return null;
        }
        return this.offsets[line] + column;
      };
      LinesAndColumns2.prototype.lengthOfLine = function(line) {
        var offset = this.offsets[line];
        var nextOffset = line === this.offsets.length - 1 ? this.string.length : this.offsets[line + 1];
        return nextOffset - offset;
      };
      return LinesAndColumns2;
    }();
    exports.LinesAndColumns = LinesAndColumns;
    exports["default"] = LinesAndColumns;
  }
});

// ../../node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
  "../../node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports.matchToToken = function(match) {
      var token = { type: "invalid", value: match[0], closed: void 0 };
      if (match[1])
        token.type = "string", token.closed = !!(match[3] || match[4]);
      else if (match[5])
        token.type = "comment";
      else if (match[6])
        token.type = "comment", token.closed = !!match[7];
      else if (match[8])
        token.type = "regex";
      else if (match[9])
        token.type = "number";
      else if (match[10])
        token.type = "name";
      else if (match[11])
        token.type = "punctuator";
      else if (match[12])
        token.type = "whitespace";
      return token;
    };
  }
});

// ../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isIdentifierChar = isIdentifierChar;
    exports.isIdentifierName = isIdentifierName;
    exports.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        pos += set[i];
        if (pos > code)
          return false;
        pos += set[i + 1];
        if (pos >= code)
          return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65)
        return code === 36;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48)
        return code === 36;
      if (code < 58)
        return true;
      if (code < 65)
        return false;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    function isIdentifierName(name) {
      let isFirst = true;
      for (let i = 0; i < name.length; i++) {
        let cp = name.charCodeAt(i);
        if ((cp & 64512) === 55296 && i + 1 < name.length) {
          const trail = name.charCodeAt(++i);
          if ((trail & 64512) === 56320) {
            cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
          }
        }
        if (isFirst) {
          isFirst = false;
          if (!isIdentifierStart(cp)) {
            return false;
          }
        } else if (!isIdentifierChar(cp)) {
          return false;
        }
      }
      return !isFirst;
    }
  }
});

// ../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isKeyword = isKeyword;
    exports.isReservedWord = isReservedWord;
    exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports.isStrictBindReservedWord = isStrictBindReservedWord;
    exports.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
      strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
      strictBind: ["eval", "arguments"]
    };
    var keywords = new Set(reservedWords.keyword);
    var reservedWordsStrictSet = new Set(reservedWords.strict);
    var reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
    function isReservedWord(word, inModule) {
      return inModule && word === "await" || word === "enum";
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
    function isStrictBindReservedWord(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }
    function isKeyword(word) {
      return keywords.has(word);
    }
  }
});

// ../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/@babel+helper-validator-identifier@7.19.1/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "isIdentifierChar", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    });
    Object.defineProperty(exports, "isIdentifierName", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierName;
      }
    });
    Object.defineProperty(exports, "isIdentifierStart", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    });
    Object.defineProperty(exports, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    Object.defineProperty(exports, "isReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  }
});

// ../../node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "../../node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports, module2) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// ../../node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "../../node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js"(exports, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
    }
    var key;
    var convert = module2.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    for (model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
    }
    var channels;
    var labels;
    var model;
    convert.rgb.hsl = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min2 = Math.min(r, g, b);
      var max2 = Math.max(r, g, b);
      var delta = max2 - min2;
      var h;
      var s;
      var l;
      if (max2 === min2) {
        h = 0;
      } else if (r === max2) {
        h = (g - b) / delta;
      } else if (g === max2) {
        h = 2 + (b - r) / delta;
      } else if (b === max2) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      l = (min2 + max2) / 2;
      if (max2 === min2) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max2 + min2);
      } else {
        s = delta / (2 - max2 - min2);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }
    convert.rgb.keyword = function(rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      t1 = 2 * l - t2;
      rgb = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      n = wh + f * (v - wh);
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function(char) {
          return char + char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max2 = Math.max(Math.max(r, g), b);
      var min2 = Math.min(Math.min(r, g), b);
      var chroma = max2 - min2;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min2 / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max2 === r) {
        hue = (g - b) / chroma % 6;
      } else if (max2 === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;
      if (l < 0.5) {
        c = 2 * s * l;
      } else {
        c = 2 * s * (1 - l);
      }
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray2) {
      return [0, 100, gray2[0]];
    };
    convert.gray.cmyk = function(gray2) {
      return [0, 0, 0, gray2[0]];
    };
    convert.gray.lab = function(gray2) {
      return [gray2[0], 0, 0];
    };
    convert.gray.hex = function(gray2) {
      var val = Math.round(gray2[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js
var require_route = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js"(exports, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
          var adjacent = adjacents[i];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path7 = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path7.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path7;
      return fn;
    }
    module2.exports = function(fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js"(exports, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (typeof result === "object") {
          for (var len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function(fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// ../../node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js"(exports, module2) {
    "use strict";
    var colorConvert = require_color_convert();
    var wrapAnsi16 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => function() {
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          gray: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.grey = styles.color.gray;
      for (const groupName of Object.keys(styles)) {
        const group = styles[groupName];
        for (const styleName of Object.keys(group)) {
          const style = group[styleName];
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b) => [r, g, b];
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
      };
      for (let key of Object.keys(colorConvert)) {
        if (typeof colorConvert[key] !== "object") {
          continue;
        }
        const suite = colorConvert[key];
        if (key === "ansi16") {
          key = "ansi";
        }
        if ("ansi16" in suite) {
          styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
        }
      }
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag2 = __commonJS({
  "../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
var require_supports_color2 = __commonJS({
  "../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag2();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream2) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream2 && !stream2.isTTY && forceColor !== true) {
        return 0;
      }
      const min2 = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign2) => sign2 in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min2;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min2;
      }
      return min2;
    }
    function getSupportLevel(stream2) {
      const level = supportsColor(stream2);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// ../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js
var require_templates = __commonJS({
  "../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js"(exports, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, args) {
      const results = [];
      const chunks = args.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        if (!isNaN(chunk)) {
          results.push(Number(chunk));
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk;
      for (const styleName of Object.keys(enabled)) {
        if (Array.isArray(enabled[styleName])) {
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          if (enabled[styleName].length > 0) {
            current = current[styleName].apply(current, enabled[styleName]);
          } else {
            current = current[styleName];
          }
        }
      }
      return current;
    }
    module2.exports = (chalk, tmp) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse2, style, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
          styles.push({ inverse: inverse2, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// ../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js
var require_chalk = __commonJS({
  "../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js"(exports, module2) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    var ansiStyles = require_ansi_styles();
    var stdoutColor = require_supports_color2().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles = /* @__PURE__ */ Object.create(null);
    function applyOptions(obj, options2) {
      options2 = options2 || {};
      const scLevel = stdoutColor ? stdoutColor.level : 0;
      obj.level = options2.level === void 0 ? scLevel : options2.level;
      obj.enabled = "enabled" in options2 ? options2.enabled : obj.level > 0;
    }
    function Chalk(options2) {
      if (!this || !(this instanceof Chalk) || this.template) {
        const chalk = {};
        applyOptions(chalk, options2);
        chalk.template = function() {
          const args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk.template].concat(args));
        };
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
        chalk.template.constructor = Chalk;
        return chalk.template;
      }
      applyOptions(this, options2);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles.blue.open = "\x1B[94m";
    }
    for (const key of Object.keys(ansiStyles)) {
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      styles[key] = {
        get() {
          const codes = ansiStyles[key];
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
        }
      };
    }
    styles.visible = {
      get() {
        return build.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), "g");
    for (const model of Object.keys(ansiStyles.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.color.close,
              closeRe: ansiStyles.color.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.bgColor.close,
              closeRe: ansiStyles.bgColor.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, styles);
    function build(_styles, _empty, key) {
      const builder = function() {
        return applyStyle.apply(builder, arguments);
      };
      builder._styles = _styles;
      builder._empty = _empty;
      const self = this;
      Object.defineProperty(builder, "level", {
        enumerable: true,
        get() {
          return self.level;
        },
        set(level) {
          self.level = level;
        }
      });
      Object.defineProperty(builder, "enabled", {
        enumerable: true,
        get() {
          return self.enabled;
        },
        set(enabled) {
          self.enabled = enabled;
        }
      });
      builder.hasGrey = this.hasGrey || key === "gray" || key === "grey";
      builder.__proto__ = proto;
      return builder;
    }
    function applyStyle() {
      const args = arguments;
      const argsLen = args.length;
      let str = String(arguments[0]);
      if (argsLen === 0) {
        return "";
      }
      if (argsLen > 1) {
        for (let a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!this.enabled || this.level <= 0 || !str) {
        return this._empty ? "" : str;
      }
      const originalDim = ansiStyles.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk, strings) {
      if (!Array.isArray(strings)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      const args = [].slice.call(arguments, 2);
      const parts = [strings.raw[0]];
      for (let i = 1; i < strings.length; i++) {
        parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings.raw[i]));
      }
      return template(chalk, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles);
    module2.exports = Chalk();
    module2.exports.supportsColor = stdoutColor;
    module2.exports.default = module2.exports;
  }
});

// ../../node_modules/.pnpm/@babel+highlight@7.18.6/node_modules/@babel/highlight/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/@babel+highlight@7.18.6/node_modules/@babel/highlight/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = highlight;
    exports.getChalk = getChalk;
    exports.shouldHighlight = shouldHighlight;
    var _jsTokens = require_js_tokens();
    var _helperValidatorIdentifier = require_lib();
    var _chalk = require_chalk();
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    function getDefs(chalk) {
      return {
        keyword: chalk.cyan,
        capitalized: chalk.yellow,
        jsxIdentifier: chalk.yellow,
        punctuator: chalk.yellow,
        number: chalk.magenta,
        string: chalk.green,
        regex: chalk.magenta,
        comment: chalk.grey,
        invalid: chalk.white.bgRed.bold
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET = /^[()[\]{}]$/;
    var tokenize;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType = function(token, offset, text) {
        if (token.type === "name") {
          if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, true) || sometimesKeywords.has(token.value)) {
            return "keyword";
          }
          if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.slice(offset - 2, offset) == "</")) {
            return "jsxIdentifier";
          }
          if (token.value[0] !== token.value[0].toLowerCase()) {
            return "capitalized";
          }
        }
        if (token.type === "punctuator" && BRACKET.test(token.value)) {
          return "bracket";
        }
        if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
          return "punctuator";
        }
        return token.type;
      };
      tokenize = function* (text) {
        let match;
        while (match = _jsTokens.default.exec(text)) {
          const token = _jsTokens.matchToToken(match);
          yield {
            type: getTokenType(token, match.index, text),
            value: token.value
          };
        }
      };
    }
    function highlightTokens(defs, text) {
      let highlighted = "";
      for (const {
        type,
        value
      } of tokenize(text)) {
        const colorize = defs[type];
        if (colorize) {
          highlighted += value.split(NEWLINE).map((str) => colorize(str)).join("\n");
        } else {
          highlighted += value;
        }
      }
      return highlighted;
    }
    function shouldHighlight(options2) {
      return !!_chalk.supportsColor || options2.forceColor;
    }
    function getChalk(options2) {
      return options2.forceColor ? new _chalk.constructor({
        enabled: true,
        level: 1
      }) : _chalk;
    }
    function highlight(code, options2 = {}) {
      if (code !== "" && shouldHighlight(options2)) {
        const chalk = getChalk(options2);
        const defs = getDefs(chalk);
        return highlightTokens(defs, code);
      } else {
        return code;
      }
    }
  }
});

// ../../node_modules/.pnpm/@babel+code-frame@7.21.4/node_modules/@babel/code-frame/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/.pnpm/@babel+code-frame@7.21.4/node_modules/@babel/code-frame/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.codeFrameColumns = codeFrameColumns;
    exports.default = _default;
    var _highlight = require_lib2();
    var deprecationWarningShown = false;
    function getDefs(chalk) {
      return {
        gutter: chalk.grey,
        marker: chalk.red.bold,
        message: chalk.red.bold
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    function getMarkerLines(loc, source, opts) {
      const startLoc = Object.assign({
        column: 0,
        line: -1
      }, loc.start);
      const endLoc = Object.assign({}, startLoc, loc.end);
      const {
        linesAbove = 2,
        linesBelow = 3
      } = opts || {};
      const startLine = startLoc.line;
      const startColumn = startLoc.column;
      const endLine = endLoc.line;
      const endColumn = endLoc.column;
      let start = Math.max(startLine - (linesAbove + 1), 0);
      let end = Math.min(source.length, endLine + linesBelow);
      if (startLine === -1) {
        start = 0;
      }
      if (endLine === -1) {
        end = source.length;
      }
      const lineDiff = endLine - startLine;
      const markerLines = {};
      if (lineDiff) {
        for (let i = 0; i <= lineDiff; i++) {
          const lineNumber = i + startLine;
          if (!startColumn) {
            markerLines[lineNumber] = true;
          } else if (i === 0) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
          } else if (i === lineDiff) {
            markerLines[lineNumber] = [0, endColumn];
          } else {
            const sourceLength = source[lineNumber - i].length;
            markerLines[lineNumber] = [0, sourceLength];
          }
        }
      } else {
        if (startColumn === endColumn) {
          if (startColumn) {
            markerLines[startLine] = [startColumn, 0];
          } else {
            markerLines[startLine] = true;
          }
        } else {
          markerLines[startLine] = [startColumn, endColumn - startColumn];
        }
      }
      return {
        start,
        end,
        markerLines
      };
    }
    function codeFrameColumns(rawLines, loc, opts = {}) {
      const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts);
      const chalk = (0, _highlight.getChalk)(opts);
      const defs = getDefs(chalk);
      const maybeHighlight = (chalkFn, string) => {
        return highlighted ? chalkFn(string) : string;
      };
      const lines = rawLines.split(NEWLINE);
      const {
        start,
        end,
        markerLines
      } = getMarkerLines(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines;
      let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index) => {
        const number = start + 1 + index;
        const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
        const gutter = ` ${paddedNumber} |`;
        const hasMarker = markerLines[number];
        const lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
            const numberOfMarkers = hasMarker[1] || 1;
            markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
            if (lastMarkerLine && opts.message) {
              markerLine += " " + maybeHighlight(defs.message, opts.message);
            }
          }
          return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine].join("");
        } else {
          return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        }
      }).join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (highlighted) {
        return chalk.reset(frame);
      } else {
        return frame;
      }
    }
    function _default(rawLines, lineNumber, colNumber, opts = {}) {
      if (!deprecationWarningShown) {
        deprecationWarningShown = true;
        const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        if (process.emitWarning) {
          process.emitWarning(message, "DeprecationWarning");
        } else {
          const deprecationError = new Error(message);
          deprecationError.name = "DeprecationWarning";
          console.warn(new Error(message));
        }
      }
      colNumber = Math.max(colNumber, 0);
      const location = {
        start: {
          column: colNumber,
          line: lineNumber
        }
      };
      return codeFrameColumns(rawLines, location, opts);
    }
  }
});

// ../../node_modules/.pnpm/parse-json@5.2.0/node_modules/parse-json/index.js
var require_parse_json = __commonJS({
  "../../node_modules/.pnpm/parse-json@5.2.0/node_modules/parse-json/index.js"(exports, module2) {
    "use strict";
    var errorEx = require_error_ex();
    var fallback = require_json_parse_even_better_errors();
    var { default: LinesAndColumns } = require_build();
    var { codeFrameColumns } = require_lib3();
    var JSONError = errorEx("JSONError", {
      fileName: errorEx.append("in %s"),
      codeFrame: errorEx.append("\n\n%s\n")
    });
    var parseJson = (string, reviver, filename) => {
      if (typeof reviver === "string") {
        filename = reviver;
        reviver = null;
      }
      try {
        try {
          return JSON.parse(string, reviver);
        } catch (error) {
          fallback(string, reviver);
          throw error;
        }
      } catch (error) {
        error.message = error.message.replace(/\n/g, "");
        const indexMatch = error.message.match(/in JSON at position (\d+) while parsing/);
        const jsonError = new JSONError(error);
        if (filename) {
          jsonError.fileName = filename;
        }
        if (indexMatch && indexMatch.length > 0) {
          const lines = new LinesAndColumns(string);
          const index = Number(indexMatch[1]);
          const location = lines.locationForIndex(index);
          const codeFrame = codeFrameColumns(
            string,
            { start: { line: location.line + 1, column: location.column + 1 } },
            { highlightCode: true }
          );
          jsonError.codeFrame = codeFrame;
        }
        throw jsonError;
      }
    };
    parseJson.JSONError = JSONError;
    module2.exports = parseJson;
  }
});

// ../../node_modules/.pnpm/semver@5.7.1/node_modules/semver/semver.js
var require_semver = __commonJS({
  "../../node_modules/.pnpm/semver@5.7.1/node_modules/semver/semver.js"(exports, module2) {
    exports = module2.exports = SemVer;
    var debug6;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug6 = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug6 = function() {
      };
    }
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER2 = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug6(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    var i;
    exports.parse = parse;
    function parse(version, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options2.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options2);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, options2) {
      var v = parse(version, options2);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, options2) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options2);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options2.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options2);
      }
      debug6("SemVer", version, options2);
      this.options = options2;
      this.loose = !!options2.loose;
      var m = version.trim().match(options2.loose ? re[LOOSE] : re[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER2 || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER2 || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER2 || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER2) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug6("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug6("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports.Comparator = Comparator;
    function Comparator(comp, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options2.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options2);
      }
      debug6("comparator", comp, options2);
      this.options = options2;
      this.loose = !!options2.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug6("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug6("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options2) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options2);
        return satisfies(this.value, rangeTmp, options2);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options2);
        return satisfies(comp.semver, rangeTmp, options2);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options2) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options2) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options2.loose && range.includePrerelease === !!options2.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options2);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options2);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options2);
      }
      this.options = options2;
      this.loose = !!options2.loose;
      this.includePrerelease = !!options2.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug6("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug6("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options2) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options2);
            });
          });
        });
      });
    };
    exports.toComparators = toComparators;
    function toComparators(range, options2) {
      return new Range(range, options2).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options2) {
      debug6("comp", comp, options2);
      comp = replaceCarets(comp, options2);
      debug6("caret", comp);
      comp = replaceTildes(comp, options2);
      debug6("tildes", comp);
      comp = replaceXRanges(comp, options2);
      debug6("xrange", comp);
      comp = replaceStars(comp, options2);
      debug6("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options2) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options2);
      }).join(" ");
    }
    function replaceTilde(comp, options2) {
      var r = options2.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug6("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug6("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug6("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options2) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options2);
      }).join(" ");
    }
    function replaceCaret(comp, options2) {
      debug6("caret", comp, options2);
      var r = options2.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug6("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug6("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug6("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug6("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options2) {
      debug6("replaceXRanges", comp, options2);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options2);
      }).join(" ");
    }
    function replaceXRange(comp, options2) {
      comp = comp.trim();
      var r = options2.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug6("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug6("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options2) {
      debug6("replaceStars", comp, options2);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options2) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options2.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug6(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, options2) {
      try {
        range = new Range(range, options2);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options2) {
      var max2 = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options2);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max2 || maxSV.compare(v) === -1) {
            max2 = v;
            maxSV = new SemVer(max2, options2);
          }
        }
      });
      return max2;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options2) {
      var min2 = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options2);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min2 || minSV.compare(v) === 1) {
            min2 = v;
            minSV = new SemVer(min2, options2);
          }
        }
      });
      return min2;
    }
    exports.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports.validRange = validRange;
    function validRange(range, options2) {
      try {
        return new Range(range, options2).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, options2) {
      return outside(version, range, "<", options2);
    }
    exports.gtr = gtr;
    function gtr(version, range, options2) {
      return outside(version, range, ">", options2);
    }
    exports.outside = outside;
    function outside(version, range, hilo, options2) {
      version = new SemVer(version, options2);
      range = new Range(range, options2);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options2)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options2)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options2)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, options2) {
      var parsed = parse(version, options2);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, options2) {
      r1 = new Range(r1, options2);
      r2 = new Range(r2, options2);
      return r1.intersects(r2);
    }
    exports.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(re[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// ../../node_modules/.pnpm/spdx-license-ids@3.0.13/node_modules/spdx-license-ids/index.json
var require_spdx_license_ids = __commonJS({
  "../../node_modules/.pnpm/spdx-license-ids@3.0.13/node_modules/spdx-license-ids/index.json"(exports, module2) {
    module2.exports = [
      "0BSD",
      "AAL",
      "ADSL",
      "AFL-1.1",
      "AFL-1.2",
      "AFL-2.0",
      "AFL-2.1",
      "AFL-3.0",
      "AGPL-1.0-only",
      "AGPL-1.0-or-later",
      "AGPL-3.0-only",
      "AGPL-3.0-or-later",
      "AMDPLPA",
      "AML",
      "AMPAS",
      "ANTLR-PD",
      "ANTLR-PD-fallback",
      "APAFML",
      "APL-1.0",
      "APSL-1.0",
      "APSL-1.1",
      "APSL-1.2",
      "APSL-2.0",
      "Abstyles",
      "AdaCore-doc",
      "Adobe-2006",
      "Adobe-Glyph",
      "Afmparse",
      "Aladdin",
      "Apache-1.0",
      "Apache-1.1",
      "Apache-2.0",
      "App-s2p",
      "Arphic-1999",
      "Artistic-1.0",
      "Artistic-1.0-Perl",
      "Artistic-1.0-cl8",
      "Artistic-2.0",
      "BSD-1-Clause",
      "BSD-2-Clause",
      "BSD-2-Clause-Patent",
      "BSD-2-Clause-Views",
      "BSD-3-Clause",
      "BSD-3-Clause-Attribution",
      "BSD-3-Clause-Clear",
      "BSD-3-Clause-LBNL",
      "BSD-3-Clause-Modification",
      "BSD-3-Clause-No-Military-License",
      "BSD-3-Clause-No-Nuclear-License",
      "BSD-3-Clause-No-Nuclear-License-2014",
      "BSD-3-Clause-No-Nuclear-Warranty",
      "BSD-3-Clause-Open-MPI",
      "BSD-4-Clause",
      "BSD-4-Clause-Shortened",
      "BSD-4-Clause-UC",
      "BSD-4.3RENO",
      "BSD-4.3TAHOE",
      "BSD-Advertising-Acknowledgement",
      "BSD-Attribution-HPND-disclaimer",
      "BSD-Protection",
      "BSD-Source-Code",
      "BSL-1.0",
      "BUSL-1.1",
      "Baekmuk",
      "Bahyph",
      "Barr",
      "Beerware",
      "BitTorrent-1.0",
      "BitTorrent-1.1",
      "Bitstream-Charter",
      "Bitstream-Vera",
      "BlueOak-1.0.0",
      "Borceux",
      "Brian-Gladman-3-Clause",
      "C-UDA-1.0",
      "CAL-1.0",
      "CAL-1.0-Combined-Work-Exception",
      "CATOSL-1.1",
      "CC-BY-1.0",
      "CC-BY-2.0",
      "CC-BY-2.5",
      "CC-BY-2.5-AU",
      "CC-BY-3.0",
      "CC-BY-3.0-AT",
      "CC-BY-3.0-DE",
      "CC-BY-3.0-IGO",
      "CC-BY-3.0-NL",
      "CC-BY-3.0-US",
      "CC-BY-4.0",
      "CC-BY-NC-1.0",
      "CC-BY-NC-2.0",
      "CC-BY-NC-2.5",
      "CC-BY-NC-3.0",
      "CC-BY-NC-3.0-DE",
      "CC-BY-NC-4.0",
      "CC-BY-NC-ND-1.0",
      "CC-BY-NC-ND-2.0",
      "CC-BY-NC-ND-2.5",
      "CC-BY-NC-ND-3.0",
      "CC-BY-NC-ND-3.0-DE",
      "CC-BY-NC-ND-3.0-IGO",
      "CC-BY-NC-ND-4.0",
      "CC-BY-NC-SA-1.0",
      "CC-BY-NC-SA-2.0",
      "CC-BY-NC-SA-2.0-DE",
      "CC-BY-NC-SA-2.0-FR",
      "CC-BY-NC-SA-2.0-UK",
      "CC-BY-NC-SA-2.5",
      "CC-BY-NC-SA-3.0",
      "CC-BY-NC-SA-3.0-DE",
      "CC-BY-NC-SA-3.0-IGO",
      "CC-BY-NC-SA-4.0",
      "CC-BY-ND-1.0",
      "CC-BY-ND-2.0",
      "CC-BY-ND-2.5",
      "CC-BY-ND-3.0",
      "CC-BY-ND-3.0-DE",
      "CC-BY-ND-4.0",
      "CC-BY-SA-1.0",
      "CC-BY-SA-2.0",
      "CC-BY-SA-2.0-UK",
      "CC-BY-SA-2.1-JP",
      "CC-BY-SA-2.5",
      "CC-BY-SA-3.0",
      "CC-BY-SA-3.0-AT",
      "CC-BY-SA-3.0-DE",
      "CC-BY-SA-4.0",
      "CC-PDDC",
      "CC0-1.0",
      "CDDL-1.0",
      "CDDL-1.1",
      "CDL-1.0",
      "CDLA-Permissive-1.0",
      "CDLA-Permissive-2.0",
      "CDLA-Sharing-1.0",
      "CECILL-1.0",
      "CECILL-1.1",
      "CECILL-2.0",
      "CECILL-2.1",
      "CECILL-B",
      "CECILL-C",
      "CERN-OHL-1.1",
      "CERN-OHL-1.2",
      "CERN-OHL-P-2.0",
      "CERN-OHL-S-2.0",
      "CERN-OHL-W-2.0",
      "CFITSIO",
      "CMU-Mach",
      "CNRI-Jython",
      "CNRI-Python",
      "CNRI-Python-GPL-Compatible",
      "COIL-1.0",
      "CPAL-1.0",
      "CPL-1.0",
      "CPOL-1.02",
      "CUA-OPL-1.0",
      "Caldera",
      "ClArtistic",
      "Clips",
      "Community-Spec-1.0",
      "Condor-1.1",
      "Cornell-Lossless-JPEG",
      "Crossword",
      "CrystalStacker",
      "Cube",
      "D-FSL-1.0",
      "DL-DE-BY-2.0",
      "DOC",
      "DRL-1.0",
      "DSDP",
      "Dotseqn",
      "ECL-1.0",
      "ECL-2.0",
      "EFL-1.0",
      "EFL-2.0",
      "EPICS",
      "EPL-1.0",
      "EPL-2.0",
      "EUDatagrid",
      "EUPL-1.0",
      "EUPL-1.1",
      "EUPL-1.2",
      "Elastic-2.0",
      "Entessa",
      "ErlPL-1.1",
      "Eurosym",
      "FDK-AAC",
      "FSFAP",
      "FSFUL",
      "FSFULLR",
      "FSFULLRWD",
      "FTL",
      "Fair",
      "Frameworx-1.0",
      "FreeBSD-DOC",
      "FreeImage",
      "GD",
      "GFDL-1.1-invariants-only",
      "GFDL-1.1-invariants-or-later",
      "GFDL-1.1-no-invariants-only",
      "GFDL-1.1-no-invariants-or-later",
      "GFDL-1.1-only",
      "GFDL-1.1-or-later",
      "GFDL-1.2-invariants-only",
      "GFDL-1.2-invariants-or-later",
      "GFDL-1.2-no-invariants-only",
      "GFDL-1.2-no-invariants-or-later",
      "GFDL-1.2-only",
      "GFDL-1.2-or-later",
      "GFDL-1.3-invariants-only",
      "GFDL-1.3-invariants-or-later",
      "GFDL-1.3-no-invariants-only",
      "GFDL-1.3-no-invariants-or-later",
      "GFDL-1.3-only",
      "GFDL-1.3-or-later",
      "GL2PS",
      "GLWTPL",
      "GPL-1.0-only",
      "GPL-1.0-or-later",
      "GPL-2.0-only",
      "GPL-2.0-or-later",
      "GPL-3.0-only",
      "GPL-3.0-or-later",
      "Giftware",
      "Glide",
      "Glulxe",
      "Graphics-Gems",
      "HP-1986",
      "HPND",
      "HPND-Markus-Kuhn",
      "HPND-export-US",
      "HPND-sell-variant",
      "HPND-sell-variant-MIT-disclaimer",
      "HTMLTIDY",
      "HaskellReport",
      "Hippocratic-2.1",
      "IBM-pibs",
      "ICU",
      "IEC-Code-Components-EULA",
      "IJG",
      "IJG-short",
      "IPA",
      "IPL-1.0",
      "ISC",
      "ImageMagick",
      "Imlib2",
      "Info-ZIP",
      "Intel",
      "Intel-ACPI",
      "Interbase-1.0",
      "JPL-image",
      "JPNIC",
      "JSON",
      "Jam",
      "JasPer-2.0",
      "Kazlib",
      "Knuth-CTAN",
      "LAL-1.2",
      "LAL-1.3",
      "LGPL-2.0-only",
      "LGPL-2.0-or-later",
      "LGPL-2.1-only",
      "LGPL-2.1-or-later",
      "LGPL-3.0-only",
      "LGPL-3.0-or-later",
      "LGPLLR",
      "LOOP",
      "LPL-1.0",
      "LPL-1.02",
      "LPPL-1.0",
      "LPPL-1.1",
      "LPPL-1.2",
      "LPPL-1.3a",
      "LPPL-1.3c",
      "LZMA-SDK-9.11-to-9.20",
      "LZMA-SDK-9.22",
      "Latex2e",
      "Leptonica",
      "LiLiQ-P-1.1",
      "LiLiQ-R-1.1",
      "LiLiQ-Rplus-1.1",
      "Libpng",
      "Linux-OpenIB",
      "Linux-man-pages-copyleft",
      "MIT",
      "MIT-0",
      "MIT-CMU",
      "MIT-Modern-Variant",
      "MIT-Wu",
      "MIT-advertising",
      "MIT-enna",
      "MIT-feh",
      "MIT-open-group",
      "MITNFA",
      "MPL-1.0",
      "MPL-1.1",
      "MPL-2.0",
      "MPL-2.0-no-copyleft-exception",
      "MS-LPL",
      "MS-PL",
      "MS-RL",
      "MTLL",
      "MakeIndex",
      "Martin-Birgmeier",
      "Minpack",
      "MirOS",
      "Motosoto",
      "MulanPSL-1.0",
      "MulanPSL-2.0",
      "Multics",
      "Mup",
      "NAIST-2003",
      "NASA-1.3",
      "NBPL-1.0",
      "NCGL-UK-2.0",
      "NCSA",
      "NGPL",
      "NICTA-1.0",
      "NIST-PD",
      "NIST-PD-fallback",
      "NLOD-1.0",
      "NLOD-2.0",
      "NLPL",
      "NOSL",
      "NPL-1.0",
      "NPL-1.1",
      "NPOSL-3.0",
      "NRL",
      "NTP",
      "NTP-0",
      "Naumen",
      "Net-SNMP",
      "NetCDF",
      "Newsletr",
      "Nokia",
      "Noweb",
      "O-UDA-1.0",
      "OCCT-PL",
      "OCLC-2.0",
      "ODC-By-1.0",
      "ODbL-1.0",
      "OFFIS",
      "OFL-1.0",
      "OFL-1.0-RFN",
      "OFL-1.0-no-RFN",
      "OFL-1.1",
      "OFL-1.1-RFN",
      "OFL-1.1-no-RFN",
      "OGC-1.0",
      "OGDL-Taiwan-1.0",
      "OGL-Canada-2.0",
      "OGL-UK-1.0",
      "OGL-UK-2.0",
      "OGL-UK-3.0",
      "OGTSL",
      "OLDAP-1.1",
      "OLDAP-1.2",
      "OLDAP-1.3",
      "OLDAP-1.4",
      "OLDAP-2.0",
      "OLDAP-2.0.1",
      "OLDAP-2.1",
      "OLDAP-2.2",
      "OLDAP-2.2.1",
      "OLDAP-2.2.2",
      "OLDAP-2.3",
      "OLDAP-2.4",
      "OLDAP-2.5",
      "OLDAP-2.6",
      "OLDAP-2.7",
      "OLDAP-2.8",
      "OML",
      "OPL-1.0",
      "OPUBL-1.0",
      "OSET-PL-2.1",
      "OSL-1.0",
      "OSL-1.1",
      "OSL-2.0",
      "OSL-2.1",
      "OSL-3.0",
      "OpenPBS-2.3",
      "OpenSSL",
      "PDDL-1.0",
      "PHP-3.0",
      "PHP-3.01",
      "PSF-2.0",
      "Parity-6.0.0",
      "Parity-7.0.0",
      "Plexus",
      "PolyForm-Noncommercial-1.0.0",
      "PolyForm-Small-Business-1.0.0",
      "PostgreSQL",
      "Python-2.0",
      "Python-2.0.1",
      "QPL-1.0",
      "QPL-1.0-INRIA-2004",
      "Qhull",
      "RHeCos-1.1",
      "RPL-1.1",
      "RPL-1.5",
      "RPSL-1.0",
      "RSA-MD",
      "RSCPL",
      "Rdisc",
      "Ruby",
      "SAX-PD",
      "SCEA",
      "SGI-B-1.0",
      "SGI-B-1.1",
      "SGI-B-2.0",
      "SHL-0.5",
      "SHL-0.51",
      "SISSL",
      "SISSL-1.2",
      "SMLNJ",
      "SMPPL",
      "SNIA",
      "SPL-1.0",
      "SSH-OpenSSH",
      "SSH-short",
      "SSPL-1.0",
      "SWL",
      "Saxpath",
      "SchemeReport",
      "Sendmail",
      "Sendmail-8.23",
      "SimPL-2.0",
      "Sleepycat",
      "Spencer-86",
      "Spencer-94",
      "Spencer-99",
      "SugarCRM-1.1.3",
      "SunPro",
      "Symlinks",
      "TAPR-OHL-1.0",
      "TCL",
      "TCP-wrappers",
      "TMate",
      "TORQUE-1.1",
      "TOSL",
      "TPDL",
      "TPL-1.0",
      "TTWL",
      "TU-Berlin-1.0",
      "TU-Berlin-2.0",
      "UCAR",
      "UCL-1.0",
      "UPL-1.0",
      "Unicode-DFS-2015",
      "Unicode-DFS-2016",
      "Unicode-TOU",
      "Unlicense",
      "VOSTROM",
      "VSL-1.0",
      "Vim",
      "W3C",
      "W3C-19980720",
      "W3C-20150513",
      "WTFPL",
      "Watcom-1.0",
      "Wsuipa",
      "X11",
      "X11-distribute-modifications-variant",
      "XFree86-1.1",
      "XSkat",
      "Xerox",
      "Xnet",
      "YPL-1.0",
      "YPL-1.1",
      "ZPL-1.1",
      "ZPL-2.0",
      "ZPL-2.1",
      "Zed",
      "Zend-2.0",
      "Zimbra-1.3",
      "Zimbra-1.4",
      "Zlib",
      "blessing",
      "bzip2-1.0.6",
      "checkmk",
      "copyleft-next-0.3.0",
      "copyleft-next-0.3.1",
      "curl",
      "diffmark",
      "dvipdfm",
      "eGenix",
      "etalab-2.0",
      "gSOAP-1.3b",
      "gnuplot",
      "iMatix",
      "libpng-2.0",
      "libselinux-1.0",
      "libtiff",
      "libutil-David-Nugent",
      "mpi-permissive",
      "mpich2",
      "mplus",
      "psfrag",
      "psutils",
      "snprintf",
      "w3m",
      "xinetd",
      "xlock",
      "xpp",
      "zlib-acknowledgement"
    ];
  }
});

// ../../node_modules/.pnpm/spdx-exceptions@2.3.0/node_modules/spdx-exceptions/index.json
var require_spdx_exceptions = __commonJS({
  "../../node_modules/.pnpm/spdx-exceptions@2.3.0/node_modules/spdx-exceptions/index.json"(exports, module2) {
    module2.exports = [
      "389-exception",
      "Autoconf-exception-2.0",
      "Autoconf-exception-3.0",
      "Bison-exception-2.2",
      "Bootloader-exception",
      "Classpath-exception-2.0",
      "CLISP-exception-2.0",
      "DigiRule-FOSS-exception",
      "eCos-exception-2.0",
      "Fawkes-Runtime-exception",
      "FLTK-exception",
      "Font-exception-2.0",
      "freertos-exception-2.0",
      "GCC-exception-2.0",
      "GCC-exception-3.1",
      "gnu-javamail-exception",
      "GPL-3.0-linking-exception",
      "GPL-3.0-linking-source-exception",
      "GPL-CC-1.0",
      "i2p-gpl-java-exception",
      "Libtool-exception",
      "Linux-syscall-note",
      "LLVM-exception",
      "LZMA-exception",
      "mif-exception",
      "Nokia-Qt-exception-1.1",
      "OCaml-LGPL-linking-exception",
      "OCCT-exception-1.0",
      "OpenJDK-assembly-exception-1.0",
      "openvpn-openssl-exception",
      "PS-or-PDF-font-exception-20170817",
      "Qt-GPL-exception-1.0",
      "Qt-LGPL-exception-1.1",
      "Qwt-exception-1.0",
      "Swift-exception",
      "u-boot-exception-2.0",
      "Universal-FOSS-exception-1.0",
      "WxWindows-exception-3.1"
    ];
  }
});

// ../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/scan.js
var require_scan = __commonJS({
  "../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/scan.js"(exports, module2) {
    "use strict";
    var licenses = [].concat(require_spdx_license_ids()).concat(require_spdx_license_ids());
    var exceptions = require_spdx_exceptions();
    module2.exports = function(source) {
      var index = 0;
      function hasMore() {
        return index < source.length;
      }
      function read(value) {
        if (value instanceof RegExp) {
          var chars = source.slice(index);
          var match = chars.match(value);
          if (match) {
            index += match[0].length;
            return match[0];
          }
        } else {
          if (source.indexOf(value, index) === index) {
            index += value.length;
            return value;
          }
        }
      }
      function skipWhitespace() {
        read(/[ ]*/);
      }
      function operator() {
        var string;
        var possibilities = ["WITH", "AND", "OR", "(", ")", ":", "+"];
        for (var i = 0; i < possibilities.length; i++) {
          string = read(possibilities[i]);
          if (string) {
            break;
          }
        }
        if (string === "+" && index > 1 && source[index - 2] === " ") {
          throw new Error("Space before `+`");
        }
        return string && {
          type: "OPERATOR",
          string
        };
      }
      function idstring() {
        return read(/[A-Za-z0-9-.]+/);
      }
      function expectIdstring() {
        var string = idstring();
        if (!string) {
          throw new Error("Expected idstring at offset " + index);
        }
        return string;
      }
      function documentRef() {
        if (read("DocumentRef-")) {
          var string = expectIdstring();
          return { type: "DOCUMENTREF", string };
        }
      }
      function licenseRef() {
        if (read("LicenseRef-")) {
          var string = expectIdstring();
          return { type: "LICENSEREF", string };
        }
      }
      function identifier() {
        var begin = index;
        var string = idstring();
        if (licenses.indexOf(string) !== -1) {
          return {
            type: "LICENSE",
            string
          };
        } else if (exceptions.indexOf(string) !== -1) {
          return {
            type: "EXCEPTION",
            string
          };
        }
        index = begin;
      }
      function parseToken() {
        return operator() || documentRef() || licenseRef() || identifier();
      }
      var tokens = [];
      while (hasMore()) {
        skipWhitespace();
        if (!hasMore()) {
          break;
        }
        var token = parseToken();
        if (!token) {
          throw new Error("Unexpected `" + source[index] + "` at offset " + index);
        }
        tokens.push(token);
      }
      return tokens;
    };
  }
});

// ../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/parse.js
var require_parse2 = __commonJS({
  "../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/parse.js"(exports, module2) {
    "use strict";
    module2.exports = function(tokens) {
      var index = 0;
      function hasMore() {
        return index < tokens.length;
      }
      function token() {
        return hasMore() ? tokens[index] : null;
      }
      function next() {
        if (!hasMore()) {
          throw new Error();
        }
        index++;
      }
      function parseOperator(operator) {
        var t = token();
        if (t && t.type === "OPERATOR" && operator === t.string) {
          next();
          return t.string;
        }
      }
      function parseWith() {
        if (parseOperator("WITH")) {
          var t = token();
          if (t && t.type === "EXCEPTION") {
            next();
            return t.string;
          }
          throw new Error("Expected exception after `WITH`");
        }
      }
      function parseLicenseRef() {
        var begin = index;
        var string = "";
        var t = token();
        if (t.type === "DOCUMENTREF") {
          next();
          string += "DocumentRef-" + t.string + ":";
          if (!parseOperator(":")) {
            throw new Error("Expected `:` after `DocumentRef-...`");
          }
        }
        t = token();
        if (t.type === "LICENSEREF") {
          next();
          string += "LicenseRef-" + t.string;
          return { license: string };
        }
        index = begin;
      }
      function parseLicense() {
        var t = token();
        if (t && t.type === "LICENSE") {
          next();
          var node2 = { license: t.string };
          if (parseOperator("+")) {
            node2.plus = true;
          }
          var exception = parseWith();
          if (exception) {
            node2.exception = exception;
          }
          return node2;
        }
      }
      function parseParenthesizedExpression() {
        var left = parseOperator("(");
        if (!left) {
          return;
        }
        var expr = parseExpression();
        if (!parseOperator(")")) {
          throw new Error("Expected `)`");
        }
        return expr;
      }
      function parseAtom() {
        return parseParenthesizedExpression() || parseLicenseRef() || parseLicense();
      }
      function makeBinaryOpParser(operator, nextParser) {
        return function parseBinaryOp() {
          var left = nextParser();
          if (!left) {
            return;
          }
          if (!parseOperator(operator)) {
            return left;
          }
          var right = parseBinaryOp();
          if (!right) {
            throw new Error("Expected expression");
          }
          return {
            left,
            conjunction: operator.toLowerCase(),
            right
          };
        };
      }
      var parseAnd = makeBinaryOpParser("AND", parseAtom);
      var parseExpression = makeBinaryOpParser("OR", parseAnd);
      var node = parseExpression();
      if (!node || hasMore()) {
        throw new Error("Syntax error");
      }
      return node;
    };
  }
});

// ../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/index.js
var require_spdx_expression_parse = __commonJS({
  "../../node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/index.js"(exports, module2) {
    "use strict";
    var scan = require_scan();
    var parse = require_parse2();
    module2.exports = function(source) {
      return parse(scan(source));
    };
  }
});

// ../../node_modules/.pnpm/spdx-correct@3.1.1/node_modules/spdx-correct/index.js
var require_spdx_correct = __commonJS({
  "../../node_modules/.pnpm/spdx-correct@3.1.1/node_modules/spdx-correct/index.js"(exports, module2) {
    var parse = require_spdx_expression_parse();
    var spdxLicenseIds = require_spdx_license_ids();
    function valid(string) {
      try {
        parse(string);
        return true;
      } catch (error) {
        return false;
      }
    }
    var transpositions = [
      ["APGL", "AGPL"],
      ["Gpl", "GPL"],
      ["GLP", "GPL"],
      ["APL", "Apache"],
      ["ISD", "ISC"],
      ["GLP", "GPL"],
      ["IST", "ISC"],
      ["Claude", "Clause"],
      [" or later", "+"],
      [" International", ""],
      ["GNU", "GPL"],
      ["GUN", "GPL"],
      ["+", ""],
      ["GNU GPL", "GPL"],
      ["GNU/GPL", "GPL"],
      ["GNU GLP", "GPL"],
      ["GNU General Public License", "GPL"],
      ["Gnu public license", "GPL"],
      ["GNU Public License", "GPL"],
      ["GNU GENERAL PUBLIC LICENSE", "GPL"],
      ["MTI", "MIT"],
      ["Mozilla Public License", "MPL"],
      ["Universal Permissive License", "UPL"],
      ["WTH", "WTF"],
      ["-License", ""]
    ];
    var TRANSPOSED = 0;
    var CORRECT = 1;
    var transforms = [
      function(argument) {
        return argument.toUpperCase();
      },
      function(argument) {
        return argument.trim();
      },
      function(argument) {
        return argument.replace(/\./g, "");
      },
      function(argument) {
        return argument.replace(/\s+/g, "");
      },
      function(argument) {
        return argument.replace(/\s+/g, "-");
      },
      function(argument) {
        return argument.replace("v", "-");
      },
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1");
      },
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1.0");
      },
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2");
      },
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2.0");
      },
      function(argument) {
        return argument[0].toUpperCase() + argument.slice(1);
      },
      function(argument) {
        return argument.replace("/", "-");
      },
      function(argument) {
        return argument.replace(/\s*V\s*(\d)/, "-$1").replace(/(\d)$/, "$1.0");
      },
      function(argument) {
        if (argument.indexOf("3.0") !== -1) {
          return argument + "-or-later";
        } else {
          return argument + "-only";
        }
      },
      function(argument) {
        return argument + "only";
      },
      function(argument) {
        return argument.replace(/(\d)$/, "-$1.0");
      },
      function(argument) {
        return argument.replace(/(-| )?(\d)$/, "-$2-Clause");
      },
      function(argument) {
        return argument.replace(/(-| )clause(-| )(\d)/, "-$3-Clause");
      },
      function(argument) {
        return argument.replace(/\b(Modified|New|Revised)(-| )?BSD((-| )License)?/i, "BSD-3-Clause");
      },
      function(argument) {
        return argument.replace(/\bSimplified(-| )?BSD((-| )License)?/i, "BSD-2-Clause");
      },
      function(argument) {
        return argument.replace(/\b(Free|Net)(-| )?BSD((-| )License)?/i, "BSD-2-Clause-$1BSD");
      },
      function(argument) {
        return argument.replace(/\bClear(-| )?BSD((-| )License)?/i, "BSD-3-Clause-Clear");
      },
      function(argument) {
        return argument.replace(/\b(Old|Original)(-| )?BSD((-| )License)?/i, "BSD-4-Clause");
      },
      function(argument) {
        return "CC-" + argument;
      },
      function(argument) {
        return "CC-" + argument + "-4.0";
      },
      function(argument) {
        return argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "");
      },
      function(argument) {
        return "CC-" + argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "") + "-4.0";
      }
    ];
    var licensesWithVersions = spdxLicenseIds.map(function(id) {
      var match = /^(.*)-\d+\.\d+$/.exec(id);
      return match ? [match[0], match[1]] : [id, null];
    }).reduce(function(objectMap, item) {
      var key = item[1];
      objectMap[key] = objectMap[key] || [];
      objectMap[key].push(item[0]);
      return objectMap;
    }, {});
    var licensesWithOneVersion = Object.keys(licensesWithVersions).map(function makeEntries(key) {
      return [key, licensesWithVersions[key]];
    }).filter(function identifySoleVersions(item) {
      return item[1].length === 1 && item[0] !== null && item[0] !== "APL";
    }).map(function createLastResorts(item) {
      return [item[0], item[1][0]];
    });
    licensesWithVersions = void 0;
    var lastResorts = [
      ["UNLI", "Unlicense"],
      ["WTF", "WTFPL"],
      ["2 CLAUSE", "BSD-2-Clause"],
      ["2-CLAUSE", "BSD-2-Clause"],
      ["3 CLAUSE", "BSD-3-Clause"],
      ["3-CLAUSE", "BSD-3-Clause"],
      ["AFFERO", "AGPL-3.0-or-later"],
      ["AGPL", "AGPL-3.0-or-later"],
      ["APACHE", "Apache-2.0"],
      ["ARTISTIC", "Artistic-2.0"],
      ["Affero", "AGPL-3.0-or-later"],
      ["BEER", "Beerware"],
      ["BOOST", "BSL-1.0"],
      ["BSD", "BSD-2-Clause"],
      ["CDDL", "CDDL-1.1"],
      ["ECLIPSE", "EPL-1.0"],
      ["FUCK", "WTFPL"],
      ["GNU", "GPL-3.0-or-later"],
      ["LGPL", "LGPL-3.0-or-later"],
      ["GPLV1", "GPL-1.0-only"],
      ["GPL-1", "GPL-1.0-only"],
      ["GPLV2", "GPL-2.0-only"],
      ["GPL-2", "GPL-2.0-only"],
      ["GPL", "GPL-3.0-or-later"],
      ["MIT +NO-FALSE-ATTRIBS", "MITNFA"],
      ["MIT", "MIT"],
      ["MPL", "MPL-2.0"],
      ["X11", "X11"],
      ["ZLIB", "Zlib"]
    ].concat(licensesWithOneVersion);
    var SUBSTRING = 0;
    var IDENTIFIER = 1;
    var validTransformation = function(identifier) {
      for (var i = 0; i < transforms.length; i++) {
        var transformed = transforms[i](identifier).trim();
        if (transformed !== identifier && valid(transformed)) {
          return transformed;
        }
      }
      return null;
    };
    var validLastResort = function(identifier) {
      var upperCased = identifier.toUpperCase();
      for (var i = 0; i < lastResorts.length; i++) {
        var lastResort = lastResorts[i];
        if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
          return lastResort[IDENTIFIER];
        }
      }
      return null;
    };
    var anyCorrection = function(identifier, check) {
      for (var i = 0; i < transpositions.length; i++) {
        var transposition = transpositions[i];
        var transposed = transposition[TRANSPOSED];
        if (identifier.indexOf(transposed) > -1) {
          var corrected = identifier.replace(
            transposed,
            transposition[CORRECT]
          );
          var checked = check(corrected);
          if (checked !== null) {
            return checked;
          }
        }
      }
      return null;
    };
    module2.exports = function(identifier, options2) {
      options2 = options2 || {};
      var upgrade = options2.upgrade === void 0 ? true : !!options2.upgrade;
      function postprocess(value) {
        return upgrade ? upgradeGPLs(value) : value;
      }
      var validArugment = typeof identifier === "string" && identifier.trim().length !== 0;
      if (!validArugment) {
        throw Error("Invalid argument. Expected non-empty string.");
      }
      identifier = identifier.trim();
      if (valid(identifier)) {
        return postprocess(identifier);
      }
      var noPlus = identifier.replace(/\+$/, "").trim();
      if (valid(noPlus)) {
        return postprocess(noPlus);
      }
      var transformed = validTransformation(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, function(argument) {
        if (valid(argument)) {
          return argument;
        }
        return validTransformation(argument);
      });
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = validLastResort(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, validLastResort);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      return null;
    };
    function upgradeGPLs(value) {
      if ([
        "GPL-1.0",
        "LGPL-1.0",
        "AGPL-1.0",
        "GPL-2.0",
        "LGPL-2.0",
        "AGPL-2.0",
        "LGPL-2.1"
      ].indexOf(value) !== -1) {
        return value + "-only";
      } else if ([
        "GPL-1.0+",
        "GPL-2.0+",
        "GPL-3.0+",
        "LGPL-2.0+",
        "LGPL-2.1+",
        "LGPL-3.0+",
        "AGPL-1.0+",
        "AGPL-3.0+"
      ].indexOf(value) !== -1) {
        return value.replace(/\+$/, "-or-later");
      } else if (["GPL-3.0", "LGPL-3.0", "AGPL-3.0"].indexOf(value) !== -1) {
        return value + "-or-later";
      } else {
        return value;
      }
    }
  }
});

// ../../node_modules/.pnpm/validate-npm-package-license@3.0.4/node_modules/validate-npm-package-license/index.js
var require_validate_npm_package_license = __commonJS({
  "../../node_modules/.pnpm/validate-npm-package-license@3.0.4/node_modules/validate-npm-package-license/index.js"(exports, module2) {
    var parse = require_spdx_expression_parse();
    var correct = require_spdx_correct();
    var genericWarning = 'license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>"';
    var fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;
    function startsWith(prefix, string) {
      return string.slice(0, prefix.length) === prefix;
    }
    function usesLicenseRef(ast) {
      if (ast.hasOwnProperty("license")) {
        var license = ast.license;
        return startsWith("LicenseRef", license) || startsWith("DocumentRef", license);
      } else {
        return usesLicenseRef(ast.left) || usesLicenseRef(ast.right);
      }
    }
    module2.exports = function(argument) {
      var ast;
      try {
        ast = parse(argument);
      } catch (e) {
        var match;
        if (argument === "UNLICENSED" || argument === "UNLICENCED") {
          return {
            validForOldPackages: true,
            validForNewPackages: true,
            unlicensed: true
          };
        } else if (match = fileReferenceRE.exec(argument)) {
          return {
            validForOldPackages: true,
            validForNewPackages: true,
            inFile: match[1]
          };
        } else {
          var result = {
            validForOldPackages: false,
            validForNewPackages: false,
            warnings: [genericWarning]
          };
          if (argument.trim().length !== 0) {
            var corrected = correct(argument);
            if (corrected) {
              result.warnings.push(
                'license is similar to the valid expression "' + corrected + '"'
              );
            }
          }
          return result;
        }
      }
      if (usesLicenseRef(ast)) {
        return {
          validForNewPackages: false,
          validForOldPackages: false,
          spdx: true,
          warnings: [genericWarning]
        };
      } else {
        return {
          validForNewPackages: true,
          validForOldPackages: true,
          spdx: true
        };
      }
    };
  }
});

// ../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/git-host-info.js
var require_git_host_info = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/git-host-info.js"(exports, module2) {
    "use strict";
    var gitHosts = module2.exports = {
      github: {
        "protocols": ["git", "http", "git+ssh", "git+https", "ssh", "https"],
        "domain": "github.com",
        "treepath": "tree",
        "filetemplate": "https://{auth@}raw.githubusercontent.com/{user}/{project}/{committish}/{path}",
        "bugstemplate": "https://{domain}/{user}/{project}/issues",
        "gittemplate": "git://{auth@}{domain}/{user}/{project}.git{#committish}",
        "tarballtemplate": "https://codeload.{domain}/{user}/{project}/tar.gz/{committish}"
      },
      bitbucket: {
        "protocols": ["git+ssh", "git+https", "ssh", "https"],
        "domain": "bitbucket.org",
        "treepath": "src",
        "tarballtemplate": "https://{domain}/{user}/{project}/get/{committish}.tar.gz"
      },
      gitlab: {
        "protocols": ["git+ssh", "git+https", "ssh", "https"],
        "domain": "gitlab.com",
        "treepath": "tree",
        "bugstemplate": "https://{domain}/{user}/{project}/issues",
        "httpstemplate": "git+https://{auth@}{domain}/{user}/{projectPath}.git{#committish}",
        "tarballtemplate": "https://{domain}/{user}/{project}/repository/archive.tar.gz?ref={committish}",
        "pathmatch": /^[/]([^/]+)[/]((?!.*(\/-\/|\/repository\/archive\.tar\.gz\?=.*|\/repository\/[^/]+\/archive.tar.gz$)).*?)(?:[.]git|[/])?$/
      },
      gist: {
        "protocols": ["git", "git+ssh", "git+https", "ssh", "https"],
        "domain": "gist.github.com",
        "pathmatch": /^[/](?:([^/]+)[/])?([a-z0-9]{32,})(?:[.]git)?$/,
        "filetemplate": "https://gist.githubusercontent.com/{user}/{project}/raw{/committish}/{path}",
        "bugstemplate": "https://{domain}/{project}",
        "gittemplate": "git://{domain}/{project}.git{#committish}",
        "sshtemplate": "git@{domain}:/{project}.git{#committish}",
        "sshurltemplate": "git+ssh://git@{domain}/{project}.git{#committish}",
        "browsetemplate": "https://{domain}/{project}{/committish}",
        "browsefiletemplate": "https://{domain}/{project}{/committish}{#path}",
        "docstemplate": "https://{domain}/{project}{/committish}",
        "httpstemplate": "git+https://{domain}/{project}.git{#committish}",
        "shortcuttemplate": "{type}:{project}{#committish}",
        "pathtemplate": "{project}{#committish}",
        "tarballtemplate": "https://codeload.github.com/gist/{project}/tar.gz/{committish}",
        "hashformat": function(fragment) {
          return "file-" + formatHashFragment(fragment);
        }
      }
    };
    var gitHostDefaults = {
      "sshtemplate": "git@{domain}:{user}/{project}.git{#committish}",
      "sshurltemplate": "git+ssh://git@{domain}/{user}/{project}.git{#committish}",
      "browsetemplate": "https://{domain}/{user}/{project}{/tree/committish}",
      "browsefiletemplate": "https://{domain}/{user}/{project}/{treepath}/{committish}/{path}{#fragment}",
      "docstemplate": "https://{domain}/{user}/{project}{/tree/committish}#readme",
      "httpstemplate": "git+https://{auth@}{domain}/{user}/{project}.git{#committish}",
      "filetemplate": "https://{domain}/{user}/{project}/raw/{committish}/{path}",
      "shortcuttemplate": "{type}:{user}/{project}{#committish}",
      "pathtemplate": "{user}/{project}{#committish}",
      "pathmatch": /^[/]([^/]+)[/]([^/]+?)(?:[.]git|[/])?$/,
      "hashformat": formatHashFragment
    };
    Object.keys(gitHosts).forEach(function(name) {
      Object.keys(gitHostDefaults).forEach(function(key) {
        if (gitHosts[name][key])
          return;
        gitHosts[name][key] = gitHostDefaults[key];
      });
      gitHosts[name].protocols_re = RegExp("^(" + gitHosts[name].protocols.map(function(protocol) {
        return protocol.replace(/([\\+*{}()[\]$^|])/g, "\\$1");
      }).join("|") + "):$");
    });
    function formatHashFragment(fragment) {
      return fragment.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
    }
  }
});

// ../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/git-host.js
var require_git_host = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/git-host.js"(exports, module2) {
    "use strict";
    var gitHosts = require_git_host_info();
    var extend = Object.assign || function _extend(target, source) {
      if (source === null || typeof source !== "object")
        return target;
      var keys = Object.keys(source);
      var i = keys.length;
      while (i--) {
        target[keys[i]] = source[keys[i]];
      }
      return target;
    };
    module2.exports = GitHost;
    function GitHost(type, user, auth, project, committish, defaultRepresentation, opts) {
      var gitHostInfo = this;
      gitHostInfo.type = type;
      Object.keys(gitHosts[type]).forEach(function(key) {
        gitHostInfo[key] = gitHosts[type][key];
      });
      gitHostInfo.user = user;
      gitHostInfo.auth = auth;
      gitHostInfo.project = project;
      gitHostInfo.committish = committish;
      gitHostInfo.default = defaultRepresentation;
      gitHostInfo.opts = opts || {};
    }
    GitHost.prototype.hash = function() {
      return this.committish ? "#" + this.committish : "";
    };
    GitHost.prototype._fill = function(template, opts) {
      if (!template)
        return;
      var vars = extend({}, opts);
      vars.path = vars.path ? vars.path.replace(/^[/]+/g, "") : "";
      opts = extend(extend({}, this.opts), opts);
      var self = this;
      Object.keys(this).forEach(function(key) {
        if (self[key] != null && vars[key] == null)
          vars[key] = self[key];
      });
      var rawAuth = vars.auth;
      var rawcommittish = vars.committish;
      var rawFragment = vars.fragment;
      var rawPath = vars.path;
      var rawProject = vars.project;
      Object.keys(vars).forEach(function(key) {
        var value = vars[key];
        if ((key === "path" || key === "project") && typeof value === "string") {
          vars[key] = value.split("/").map(function(pathComponent) {
            return encodeURIComponent(pathComponent);
          }).join("/");
        } else {
          vars[key] = encodeURIComponent(value);
        }
      });
      vars["auth@"] = rawAuth ? rawAuth + "@" : "";
      vars["#fragment"] = rawFragment ? "#" + this.hashformat(rawFragment) : "";
      vars.fragment = vars.fragment ? vars.fragment : "";
      vars["#path"] = rawPath ? "#" + this.hashformat(rawPath) : "";
      vars["/path"] = vars.path ? "/" + vars.path : "";
      vars.projectPath = rawProject.split("/").map(encodeURIComponent).join("/");
      if (opts.noCommittish) {
        vars["#committish"] = "";
        vars["/tree/committish"] = "";
        vars["/committish"] = "";
        vars.committish = "";
      } else {
        vars["#committish"] = rawcommittish ? "#" + rawcommittish : "";
        vars["/tree/committish"] = vars.committish ? "/" + vars.treepath + "/" + vars.committish : "";
        vars["/committish"] = vars.committish ? "/" + vars.committish : "";
        vars.committish = vars.committish || "master";
      }
      var res = template;
      Object.keys(vars).forEach(function(key) {
        res = res.replace(new RegExp("[{]" + key + "[}]", "g"), vars[key]);
      });
      if (opts.noGitPlus) {
        return res.replace(/^git[+]/, "");
      } else {
        return res;
      }
    };
    GitHost.prototype.ssh = function(opts) {
      return this._fill(this.sshtemplate, opts);
    };
    GitHost.prototype.sshurl = function(opts) {
      return this._fill(this.sshurltemplate, opts);
    };
    GitHost.prototype.browse = function(P2, F, opts) {
      if (typeof P2 === "string") {
        if (typeof F !== "string") {
          opts = F;
          F = null;
        }
        return this._fill(this.browsefiletemplate, extend({
          fragment: F,
          path: P2
        }, opts));
      } else {
        return this._fill(this.browsetemplate, P2);
      }
    };
    GitHost.prototype.docs = function(opts) {
      return this._fill(this.docstemplate, opts);
    };
    GitHost.prototype.bugs = function(opts) {
      return this._fill(this.bugstemplate, opts);
    };
    GitHost.prototype.https = function(opts) {
      return this._fill(this.httpstemplate, opts);
    };
    GitHost.prototype.git = function(opts) {
      return this._fill(this.gittemplate, opts);
    };
    GitHost.prototype.shortcut = function(opts) {
      return this._fill(this.shortcuttemplate, opts);
    };
    GitHost.prototype.path = function(opts) {
      return this._fill(this.pathtemplate, opts);
    };
    GitHost.prototype.tarball = function(opts_) {
      var opts = extend({}, opts_, { noCommittish: false });
      return this._fill(this.tarballtemplate, opts);
    };
    GitHost.prototype.file = function(P2, opts) {
      return this._fill(this.filetemplate, extend({ path: P2 }, opts));
    };
    GitHost.prototype.getDefaultRepresentation = function() {
      return this.default;
    };
    GitHost.prototype.toString = function(opts) {
      if (this.default && typeof this[this.default] === "function")
        return this[this.default](opts);
      return this.sshurl(opts);
    };
  }
});

// ../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/index.js
var require_hosted_git_info = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@2.8.9/node_modules/hosted-git-info/index.js"(exports, module2) {
    "use strict";
    var url = require("url");
    var gitHosts = require_git_host_info();
    var GitHost = module2.exports = require_git_host();
    var protocolToRepresentationMap = {
      "git+ssh:": "sshurl",
      "git+https:": "https",
      "ssh:": "sshurl",
      "git:": "git"
    };
    function protocolToRepresentation(protocol) {
      return protocolToRepresentationMap[protocol] || protocol.slice(0, -1);
    }
    var authProtocols = {
      "git:": true,
      "https:": true,
      "git+https:": true,
      "http:": true,
      "git+http:": true
    };
    var cache = {};
    module2.exports.fromUrl = function(giturl, opts) {
      if (typeof giturl !== "string")
        return;
      var key = giturl + JSON.stringify(opts || {});
      if (!(key in cache)) {
        cache[key] = fromUrl(giturl, opts);
      }
      return cache[key];
    };
    function fromUrl(giturl, opts) {
      if (giturl == null || giturl === "")
        return;
      var url2 = fixupUnqualifiedGist(
        isGitHubShorthand(giturl) ? "github:" + giturl : giturl
      );
      var parsed = parseGitUrl(url2);
      var shortcutMatch = url2.match(/^([^:]+):(?:[^@]+@)?(?:([^/]*)\/)?([^#]+)/);
      var matches = Object.keys(gitHosts).map(function(gitHostName) {
        try {
          var gitHostInfo = gitHosts[gitHostName];
          var auth = null;
          if (parsed.auth && authProtocols[parsed.protocol]) {
            auth = parsed.auth;
          }
          var committish = parsed.hash ? decodeURIComponent(parsed.hash.substr(1)) : null;
          var user = null;
          var project = null;
          var defaultRepresentation = null;
          if (shortcutMatch && shortcutMatch[1] === gitHostName) {
            user = shortcutMatch[2] && decodeURIComponent(shortcutMatch[2]);
            project = decodeURIComponent(shortcutMatch[3].replace(/\.git$/, ""));
            defaultRepresentation = "shortcut";
          } else {
            if (parsed.host && parsed.host !== gitHostInfo.domain && parsed.host.replace(/^www[.]/, "") !== gitHostInfo.domain)
              return;
            if (!gitHostInfo.protocols_re.test(parsed.protocol))
              return;
            if (!parsed.path)
              return;
            var pathmatch = gitHostInfo.pathmatch;
            var matched = parsed.path.match(pathmatch);
            if (!matched)
              return;
            if (matched[1] !== null && matched[1] !== void 0) {
              user = decodeURIComponent(matched[1].replace(/^:/, ""));
            }
            project = decodeURIComponent(matched[2]);
            defaultRepresentation = protocolToRepresentation(parsed.protocol);
          }
          return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
        } catch (ex) {
          if (ex instanceof URIError) {
          } else
            throw ex;
        }
      }).filter(function(gitHostInfo) {
        return gitHostInfo;
      });
      if (matches.length !== 1)
        return;
      return matches[0];
    }
    function isGitHubShorthand(arg) {
      return /^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(arg);
    }
    function fixupUnqualifiedGist(giturl) {
      var parsed = url.parse(giturl);
      if (parsed.protocol === "gist:" && parsed.host && !parsed.path) {
        return parsed.protocol + "/" + parsed.host;
      } else {
        return giturl;
      }
    }
    function parseGitUrl(giturl) {
      var matched = giturl.match(/^([^@]+)@([^:/]+):[/]?((?:[^/]+[/])?[^/]+?)(?:[.]git)?(#.*)?$/);
      if (!matched) {
        var legacy = url.parse(giturl);
        if (legacy.auth && typeof url.URL === "function") {
          var authmatch = giturl.match(/[^@]+@[^:/]+/);
          if (authmatch) {
            var whatwg = new url.URL(authmatch[0]);
            legacy.auth = whatwg.username || "";
            if (whatwg.password)
              legacy.auth += ":" + whatwg.password;
          }
        }
        return legacy;
      }
      return {
        protocol: "git+ssh:",
        slashes: true,
        auth: matched[1],
        host: matched[2],
        port: null,
        hostname: matched[2],
        hash: matched[4],
        search: null,
        query: null,
        pathname: "/" + matched[3],
        path: "/" + matched[3],
        href: "git+ssh://" + matched[1] + "@" + matched[2] + "/" + matched[3] + (matched[4] || "")
      };
    }
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/homedir.js"(exports, module2) {
    "use strict";
    var os = require("os");
    module2.exports = os.homedir || function homedir() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/caller.js"(exports, module2) {
    module2.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// ../../node_modules/.pnpm/path-parse@1.0.7/node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "../../node_modules/.pnpm/path-parse@1.0.7/node_modules/path-parse/index.js"(exports, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module2.exports = win32.parse;
    else
      module2.exports = posix.parse;
    module2.exports.posix = posix.parse;
    module2.exports.win32 = win32.parse;
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/node-modules-paths.js"(exports, module2) {
    var path7 = require("path");
    var parse = path7.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths2 = [absoluteStart];
      var parsed = parse(absoluteStart);
      while (parsed.dir !== paths2[paths2.length - 1]) {
        paths2.push(parsed.dir);
        parsed = parse(parsed.dir);
      }
      return paths2.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path7.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module2.exports = function nodeModulesPaths(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/normalize-options.js"(exports, module2) {
    module2.exports = function(x, opts) {
      return opts || {};
    };
  }
});

// ../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// ../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// ../../node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// ../../node_modules/.pnpm/is-core-module@2.11.0/node_modules/is-core-module/core.json
var require_core2 = __commonJS({
  "../../node_modules/.pnpm/is-core-module@2.11.0/node_modules/is-core-module/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// ../../node_modules/.pnpm/is-core-module@2.11.0/node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "../../node_modules/.pnpm/is-core-module@2.11.0/node_modules/is-core-module/index.js"(exports, module2) {
    "use strict";
    var has = require_src2();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core2();
    module2.exports = function isCore(x, nodeVersion) {
      return has(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/async.js"(exports, module2) {
    var fs7 = require("fs");
    var getHomedir = require_homedir();
    var path7 = require("path");
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs7.realpath && typeof fs7.realpath.native === "function" ? fs7.realpath.native : fs7.realpath;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path7.join(homedir, ".node_modules"),
        path7.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs7.stat(file, function(err, stat) {
        if (!err) {
          return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultIsDir = function isDirectory(dir, cb) {
      fs7.stat(dir, function(err, stat) {
        if (!err) {
          return cb(null, stat.isDirectory());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultRealpath = function realpath(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT")
          cb(realpathErr);
        else
          cb(null, realpathErr ? x : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath, x, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
      } else {
        cb(null, x);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile2, pkgfile, cb) {
      readFile2(pkgfile, function(readFileErr, body) {
        if (readFileErr)
          cb(readFileErr);
        else {
          try {
            var pkg2 = JSON.parse(body);
            cb(null, pkg2);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path7.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolve(x, options2, callback) {
      var cb = callback;
      var opts = options2;
      if (typeof options2 === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x !== "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var readFile2 = opts.readFile || fs7.readFile;
      var realpath = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path7.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path7.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err2, realStart) {
          if (err2)
            cb(err2);
          else
            init2(realStart);
        }
      );
      var res;
      function init2(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          res = path7.resolve(basedir2, x);
          if (x === "." || x === ".." || x.slice(-1) === "/")
            res += "/";
          if (/\/$/.test(x) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else
            loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x)) {
          return cb(null, x);
        } else
          loadNodeModules(x, basedir2, function(err2, n, pkg2) {
            if (err2)
              cb(err2);
            else if (n) {
              return maybeRealpath(realpath, n, opts, function(err3, realN) {
                if (err3) {
                  cb(err3);
                } else {
                  cb(null, realN, pkg2);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function onfile(err2, m, pkg2) {
        if (err2)
          cb(err2);
        else if (m)
          cb(null, m, pkg2);
        else
          loadAsDirectory(res, function(err3, d, pkg3) {
            if (err3)
              cb(err3);
            else if (d) {
              maybeRealpath(realpath, d, opts, function(err4, realD) {
                if (err4) {
                  cb(err4);
                } else {
                  cb(null, realD, pkg3);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0)
            return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0];
          var pkg2 = loadPackage;
          if (pkg2)
            onpkg(null, pkg2);
          else
            loadpkg(path7.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            pkg2 = pkg_;
            if (err2)
              return cb2(err2);
            if (dir && pkg2 && opts.pathFilter) {
              var rfile = path7.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r = opts.pathFilter(pkg2, x3, rel);
              if (r)
                return load(
                  [""].concat(extensions.slice()),
                  path7.resolve(dir, r),
                  pkg2
                );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2)
              return cb2(err2);
            if (ex)
              return cb2(null, file, pkg2);
            load(exts2.slice(1), x3, pkg2);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/")
          return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return loadpkg(path7.dirname(dir), cb2);
          var pkgfile = path7.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex)
              return loadpkg(path7.dirname(dir), cb2);
            readPackage(readFile2, pkgfile, function(err3, pkgParam) {
              if (err3)
                cb2(err3);
              var pkg2 = pkgParam;
              if (pkg2 && opts.packageFilter) {
                pkg2 = opts.packageFilter(pkg2, pkgfile);
              }
              cb2(null, pkg2, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return cb2(unwrapErr);
          var pkgfile = path7.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2)
              return cb2(err2);
            if (!ex)
              return loadAsFile(path7.join(x2, "index"), fpkg, cb2);
            readPackage(readFile2, pkgfile, function(err3, pkgParam) {
              if (err3)
                return cb2(err3);
              var pkg2 = pkgParam;
              if (pkg2 && opts.packageFilter) {
                pkg2 = opts.packageFilter(pkg2, pkgfile);
              }
              if (pkg2 && pkg2.main) {
                if (typeof pkg2.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg2.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg2.main === "." || pkg2.main === "./") {
                  pkg2.main = "index";
                }
                loadAsFile(path7.resolve(x2, pkg2.main), pkg2, function(err4, m, pkg3) {
                  if (err4)
                    return cb2(err4);
                  if (m)
                    return cb2(null, m, pkg3);
                  if (!pkg3)
                    return loadAsFile(path7.join(x2, "index"), pkg3, cb2);
                  var dir = path7.resolve(x2, pkg3.main);
                  loadAsDirectory(dir, pkg3, function(err5, n, pkg4) {
                    if (err5)
                      return cb2(err5);
                    if (n)
                      return cb2(null, n, pkg4);
                    loadAsFile(path7.join(x2, "index"), pkg4, cb2);
                  });
                });
                return;
              }
              loadAsFile(path7.join(x2, "/index"), pkg2, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0)
          return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path7.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2)
            return cb2(err2);
          if (!isdir2)
            return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m, pkg2) {
          if (err2)
            return cb2(err2);
          if (m)
            return cb2(null, m, pkg2);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n, pkg2) {
          if (err2)
            return cb2(err2);
          if (n)
            return cb2(null, n, pkg2);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/core.json
var require_core3 = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/core.js
var require_core4 = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/core.js"(exports, module2) {
    "use strict";
    var isCoreModule = require_is_core_module();
    var data = require_core3();
    var core = {};
    for (mod2 in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod2)) {
        core[mod2] = isCoreModule(mod2);
      }
    }
    var mod2;
    module2.exports = core;
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/is-core.js"(exports, module2) {
    var isCoreModule = require_is_core_module();
    module2.exports = function isCore(x) {
      return isCoreModule(x);
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/lib/sync.js"(exports, module2) {
    var isCore = require_is_core_module();
    var fs7 = require("fs");
    var path7 = require("path");
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs7.realpathSync && typeof fs7.realpathSync.native === "function" ? fs7.realpathSync.native : fs7.realpathSync;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path7.join(homedir, ".node_modules"),
        path7.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat = fs7.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    };
    var defaultIsDir = function isDirectory(dir) {
      try {
        var stat = fs7.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && stat.isDirectory();
    };
    var defaultRealpathSync = function realpathSync(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync, x, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
      }
      return x;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync, pkgfile) {
      var body = readFileSync(pkgfile);
      try {
        var pkg2 = JSON.parse(body);
        return pkg2;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path7.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolveSync(x, options2) {
      if (typeof x !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x, options2);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync = opts.readFileSync || fs7.readFileSync;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var realpathSync = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path7.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path7.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path7.resolve(absoluteStart, x);
        if (x === "." || x === ".." || x.slice(-1) === "/")
          res += "/";
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m)
          return maybeRealpathSync(realpathSync, m, opts);
      } else if (includeCoreModules && isCore(x)) {
        return x;
      } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n)
          return maybeRealpathSync(realpathSync, n, opts);
      }
      var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      err.code = "MODULE_NOT_FOUND";
      throw err;
      function loadAsFileSync(x2) {
        var pkg2 = loadpkg(path7.dirname(x2));
        if (pkg2 && pkg2.dir && pkg2.pkg && opts.pathFilter) {
          var rfile = path7.relative(pkg2.dir, x2);
          var r = opts.pathFilter(pkg2.pkg, x2, rfile);
          if (r) {
            x2 = path7.resolve(pkg2.dir, r);
          }
        }
        if (isFile(x2)) {
          return x2;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/")
          return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return;
        var pkgfile = path7.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path7.dirname(dir));
        }
        var pkg2 = readPackageSync(readFileSync, pkgfile);
        if (pkg2 && opts.packageFilter) {
          pkg2 = opts.packageFilter(pkg2, dir);
        }
        return { pkg: pkg2, dir };
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path7.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg2 = readPackageSync(readFileSync, pkgfile);
          } catch (e) {
          }
          if (pkg2 && opts.packageFilter) {
            pkg2 = opts.packageFilter(pkg2, x2);
          }
          if (pkg2 && pkg2.main) {
            if (typeof pkg2.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg2.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg2.main === "." || pkg2.main === "./") {
              pkg2.main = "index";
            }
            try {
              var m2 = loadAsFileSync(path7.resolve(x2, pkg2.main));
              if (m2)
                return m2;
              var n2 = loadAsDirectorySync(path7.resolve(x2, pkg2.main));
              if (n2)
                return n2;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path7.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        var dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path7.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2)
              return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2)
              return n2;
          }
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/index.js
var require_resolve = __commonJS({
  "../../node_modules/.pnpm/resolve@1.22.2/node_modules/resolve/index.js"(exports, module2) {
    var async = require_async();
    async.core = require_core4();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module2.exports = async;
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/extract_description.js
var require_extract_description = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/extract_description.js"(exports, module2) {
    module2.exports = extractDescription;
    function extractDescription(d) {
      if (!d)
        return;
      if (d === "ERROR: No README data found!")
        return;
      d = d.trim().split("\n");
      for (var s = 0; d[s] && d[s].trim().match(/^(#|$)/); s++)
        ;
      var l = d.length;
      for (var e = s + 1; e < l && d[e].trim(); e++)
        ;
      return d.slice(s, e).join(" ").trim();
    }
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/typos.json
var require_typos = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/typos.json"(exports, module2) {
    module2.exports = {
      topLevel: {
        dependancies: "dependencies",
        dependecies: "dependencies",
        depdenencies: "dependencies",
        devEependencies: "devDependencies",
        depends: "dependencies",
        "dev-dependencies": "devDependencies",
        devDependences: "devDependencies",
        devDepenencies: "devDependencies",
        devdependencies: "devDependencies",
        repostitory: "repository",
        repo: "repository",
        prefereGlobal: "preferGlobal",
        hompage: "homepage",
        hampage: "homepage",
        autohr: "author",
        autor: "author",
        contributers: "contributors",
        publicationConfig: "publishConfig",
        script: "scripts"
      },
      bugs: { web: "url", name: "url" },
      script: { server: "start", tests: "test" }
    };
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/fixer.js
var require_fixer = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/fixer.js"(exports, module2) {
    var semver = require_semver();
    var validateLicense = require_validate_npm_package_license();
    var hostedGitInfo = require_hosted_git_info();
    var isBuiltinModule = require_resolve().isCore;
    var depTypes = ["dependencies", "devDependencies", "optionalDependencies"];
    var extractDescription = require_extract_description();
    var url = require("url");
    var typos = require_typos();
    var fixer = module2.exports = {
      warn: function() {
      },
      fixRepositoryField: function(data) {
        if (data.repositories) {
          this.warn("repositories");
          data.repository = data.repositories[0];
        }
        if (!data.repository)
          return this.warn("missingRepository");
        if (typeof data.repository === "string") {
          data.repository = {
            type: "git",
            url: data.repository
          };
        }
        var r = data.repository.url || "";
        if (r) {
          var hosted = hostedGitInfo.fromUrl(r);
          if (hosted) {
            r = data.repository.url = hosted.getDefaultRepresentation() == "shortcut" ? hosted.https() : hosted.toString();
          }
        }
        if (r.match(/github.com\/[^\/]+\/[^\/]+\.git\.git$/)) {
          this.warn("brokenGitUrl", r);
        }
      },
      fixTypos: function(data) {
        Object.keys(typos.topLevel).forEach(function(d) {
          if (data.hasOwnProperty(d)) {
            this.warn("typo", d, typos.topLevel[d]);
          }
        }, this);
      },
      fixScriptsField: function(data) {
        if (!data.scripts)
          return;
        if (typeof data.scripts !== "object") {
          this.warn("nonObjectScripts");
          delete data.scripts;
          return;
        }
        Object.keys(data.scripts).forEach(function(k) {
          if (typeof data.scripts[k] !== "string") {
            this.warn("nonStringScript");
            delete data.scripts[k];
          } else if (typos.script[k] && !data.scripts[typos.script[k]]) {
            this.warn("typo", k, typos.script[k], "scripts");
          }
        }, this);
      },
      fixFilesField: function(data) {
        var files = data.files;
        if (files && !Array.isArray(files)) {
          this.warn("nonArrayFiles");
          delete data.files;
        } else if (data.files) {
          data.files = data.files.filter(function(file) {
            if (!file || typeof file !== "string") {
              this.warn("invalidFilename", file);
              return false;
            } else {
              return true;
            }
          }, this);
        }
      },
      fixBinField: function(data) {
        if (!data.bin)
          return;
        if (typeof data.bin === "string") {
          var b = {};
          var match;
          if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
            b[match[1]] = data.bin;
          } else {
            b[data.name] = data.bin;
          }
          data.bin = b;
        }
      },
      fixManField: function(data) {
        if (!data.man)
          return;
        if (typeof data.man === "string") {
          data.man = [data.man];
        }
      },
      fixBundleDependenciesField: function(data) {
        var bdd = "bundledDependencies";
        var bd = "bundleDependencies";
        if (data[bdd] && !data[bd]) {
          data[bd] = data[bdd];
          delete data[bdd];
        }
        if (data[bd] && !Array.isArray(data[bd])) {
          this.warn("nonArrayBundleDependencies");
          delete data[bd];
        } else if (data[bd]) {
          data[bd] = data[bd].filter(function(bd2) {
            if (!bd2 || typeof bd2 !== "string") {
              this.warn("nonStringBundleDependency", bd2);
              return false;
            } else {
              if (!data.dependencies) {
                data.dependencies = {};
              }
              if (!data.dependencies.hasOwnProperty(bd2)) {
                this.warn("nonDependencyBundleDependency", bd2);
                data.dependencies[bd2] = "*";
              }
              return true;
            }
          }, this);
        }
      },
      fixDependencies: function(data, strict) {
        var loose = !strict;
        objectifyDeps(data, this.warn);
        addOptionalDepsToDeps(data, this.warn);
        this.fixBundleDependenciesField(data);
        ["dependencies", "devDependencies"].forEach(function(deps) {
          if (!(deps in data))
            return;
          if (!data[deps] || typeof data[deps] !== "object") {
            this.warn("nonObjectDependencies", deps);
            delete data[deps];
            return;
          }
          Object.keys(data[deps]).forEach(function(d) {
            var r = data[deps][d];
            if (typeof r !== "string") {
              this.warn("nonStringDependency", d, JSON.stringify(r));
              delete data[deps][d];
            }
            var hosted = hostedGitInfo.fromUrl(data[deps][d]);
            if (hosted)
              data[deps][d] = hosted.toString();
          }, this);
        }, this);
      },
      fixModulesField: function(data) {
        if (data.modules) {
          this.warn("deprecatedModules");
          delete data.modules;
        }
      },
      fixKeywordsField: function(data) {
        if (typeof data.keywords === "string") {
          data.keywords = data.keywords.split(/,\s+/);
        }
        if (data.keywords && !Array.isArray(data.keywords)) {
          delete data.keywords;
          this.warn("nonArrayKeywords");
        } else if (data.keywords) {
          data.keywords = data.keywords.filter(function(kw) {
            if (typeof kw !== "string" || !kw) {
              this.warn("nonStringKeyword");
              return false;
            } else {
              return true;
            }
          }, this);
        }
      },
      fixVersionField: function(data, strict) {
        var loose = !strict;
        if (!data.version) {
          data.version = "";
          return true;
        }
        if (!semver.valid(data.version, loose)) {
          throw new Error('Invalid version: "' + data.version + '"');
        }
        data.version = semver.clean(data.version, loose);
        return true;
      },
      fixPeople: function(data) {
        modifyPeople(data, unParsePerson);
        modifyPeople(data, parsePerson);
      },
      fixNameField: function(data, options2) {
        if (typeof options2 === "boolean")
          options2 = { strict: options2 };
        else if (typeof options2 === "undefined")
          options2 = {};
        var strict = options2.strict;
        if (!data.name && !strict) {
          data.name = "";
          return;
        }
        if (typeof data.name !== "string") {
          throw new Error("name field must be a string.");
        }
        if (!strict)
          data.name = data.name.trim();
        ensureValidName(data.name, strict, options2.allowLegacyCase);
        if (isBuiltinModule(data.name))
          this.warn("conflictingName", data.name);
      },
      fixDescriptionField: function(data) {
        if (data.description && typeof data.description !== "string") {
          this.warn("nonStringDescription");
          delete data.description;
        }
        if (data.readme && !data.description)
          data.description = extractDescription(data.readme);
        if (data.description === void 0)
          delete data.description;
        if (!data.description)
          this.warn("missingDescription");
      },
      fixReadmeField: function(data) {
        if (!data.readme) {
          this.warn("missingReadme");
          data.readme = "ERROR: No README data found!";
        }
      },
      fixBugsField: function(data) {
        if (!data.bugs && data.repository && data.repository.url) {
          var hosted = hostedGitInfo.fromUrl(data.repository.url);
          if (hosted && hosted.bugs()) {
            data.bugs = { url: hosted.bugs() };
          }
        } else if (data.bugs) {
          var emailRe = /^.+@.*\..+$/;
          if (typeof data.bugs == "string") {
            if (emailRe.test(data.bugs))
              data.bugs = { email: data.bugs };
            else if (url.parse(data.bugs).protocol)
              data.bugs = { url: data.bugs };
            else
              this.warn("nonEmailUrlBugsString");
          } else {
            bugsTypos(data.bugs, this.warn);
            var oldBugs = data.bugs;
            data.bugs = {};
            if (oldBugs.url) {
              if (typeof oldBugs.url == "string" && url.parse(oldBugs.url).protocol)
                data.bugs.url = oldBugs.url;
              else
                this.warn("nonUrlBugsUrlField");
            }
            if (oldBugs.email) {
              if (typeof oldBugs.email == "string" && emailRe.test(oldBugs.email))
                data.bugs.email = oldBugs.email;
              else
                this.warn("nonEmailBugsEmailField");
            }
          }
          if (!data.bugs.email && !data.bugs.url) {
            delete data.bugs;
            this.warn("emptyNormalizedBugs");
          }
        }
      },
      fixHomepageField: function(data) {
        if (!data.homepage && data.repository && data.repository.url) {
          var hosted = hostedGitInfo.fromUrl(data.repository.url);
          if (hosted && hosted.docs())
            data.homepage = hosted.docs();
        }
        if (!data.homepage)
          return;
        if (typeof data.homepage !== "string") {
          this.warn("nonUrlHomepage");
          return delete data.homepage;
        }
        if (!url.parse(data.homepage).protocol) {
          data.homepage = "http://" + data.homepage;
        }
      },
      fixLicenseField: function(data) {
        if (!data.license) {
          return this.warn("missingLicense");
        } else {
          if (typeof data.license !== "string" || data.license.length < 1 || data.license.trim() === "") {
            this.warn("invalidLicense");
          } else {
            if (!validateLicense(data.license).validForNewPackages)
              this.warn("invalidLicense");
          }
        }
      }
    };
    function isValidScopedPackageName(spec) {
      if (spec.charAt(0) !== "@")
        return false;
      var rest = spec.slice(1).split("/");
      if (rest.length !== 2)
        return false;
      return rest[0] && rest[1] && rest[0] === encodeURIComponent(rest[0]) && rest[1] === encodeURIComponent(rest[1]);
    }
    function isCorrectlyEncodedName(spec) {
      return !spec.match(/[\/@\s\+%:]/) && spec === encodeURIComponent(spec);
    }
    function ensureValidName(name, strict, allowLegacyCase) {
      if (name.charAt(0) === "." || !(isValidScopedPackageName(name) || isCorrectlyEncodedName(name)) || strict && !allowLegacyCase && name !== name.toLowerCase() || name.toLowerCase() === "node_modules" || name.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name));
      }
    }
    function modifyPeople(data, fn) {
      if (data.author)
        data.author = fn(data.author);
      ["maintainers", "contributors"].forEach(function(set) {
        if (!Array.isArray(data[set]))
          return;
        data[set] = data[set].map(fn);
      });
      return data;
    }
    function unParsePerson(person) {
      if (typeof person === "string")
        return person;
      var name = person.name || "";
      var u = person.url || person.web;
      var url2 = u ? " (" + u + ")" : "";
      var e = person.email || person.mail;
      var email = e ? " <" + e + ">" : "";
      return name + email + url2;
    }
    function parsePerson(person) {
      if (typeof person !== "string")
        return person;
      var name = person.match(/^([^\(<]+)/);
      var url2 = person.match(/\(([^\)]+)\)/);
      var email = person.match(/<([^>]+)>/);
      var obj = {};
      if (name && name[0].trim())
        obj.name = name[0].trim();
      if (email)
        obj.email = email[1];
      if (url2)
        obj.url = url2[1];
      return obj;
    }
    function addOptionalDepsToDeps(data, warn) {
      var o = data.optionalDependencies;
      if (!o)
        return;
      var d = data.dependencies || {};
      Object.keys(o).forEach(function(k) {
        d[k] = o[k];
      });
      data.dependencies = d;
    }
    function depObjectify(deps, type, warn) {
      if (!deps)
        return {};
      if (typeof deps === "string") {
        deps = deps.trim().split(/[\n\r\s\t ,]+/);
      }
      if (!Array.isArray(deps))
        return deps;
      warn("deprecatedArrayDependencies", type);
      var o = {};
      deps.filter(function(d) {
        return typeof d === "string";
      }).forEach(function(d) {
        d = d.trim().split(/(:?[@\s><=])/);
        var dn = d.shift();
        var dv = d.join("");
        dv = dv.trim();
        dv = dv.replace(/^@/, "");
        o[dn] = dv;
      });
      return o;
    }
    function objectifyDeps(data, warn) {
      depTypes.forEach(function(type) {
        if (!data[type])
          return;
        data[type] = depObjectify(data[type], type, warn);
      });
    }
    function bugsTypos(bugs, warn) {
      if (!bugs)
        return;
      Object.keys(bugs).forEach(function(k) {
        if (typos.bugs[k]) {
          warn("typo", k, typos.bugs[k], "bugs");
          bugs[typos.bugs[k]] = bugs[k];
          delete bugs[k];
        }
      });
    }
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/warning_messages.json
var require_warning_messages = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/warning_messages.json"(exports, module2) {
    module2.exports = {
      repositories: "'repositories' (plural) Not supported. Please pick one as the 'repository' field",
      missingRepository: "No repository field.",
      brokenGitUrl: "Probably broken git url: %s",
      nonObjectScripts: "scripts must be an object",
      nonStringScript: "script values must be string commands",
      nonArrayFiles: "Invalid 'files' member",
      invalidFilename: "Invalid filename in 'files' list: %s",
      nonArrayBundleDependencies: "Invalid 'bundleDependencies' list. Must be array of package names",
      nonStringBundleDependency: "Invalid bundleDependencies member: %s",
      nonDependencyBundleDependency: "Non-dependency in bundleDependencies: %s",
      nonObjectDependencies: "%s field must be an object",
      nonStringDependency: "Invalid dependency: %s %s",
      deprecatedArrayDependencies: "specifying %s as array is deprecated",
      deprecatedModules: "modules field is deprecated",
      nonArrayKeywords: "keywords should be an array of strings",
      nonStringKeyword: "keywords should be an array of strings",
      conflictingName: "%s is also the name of a node core module.",
      nonStringDescription: "'description' field should be a string",
      missingDescription: "No description",
      missingReadme: "No README data",
      missingLicense: "No license field.",
      nonEmailUrlBugsString: "Bug string field must be url, email, or {email,url}",
      nonUrlBugsUrlField: "bugs.url field must be a string url. Deleted.",
      nonEmailBugsEmailField: "bugs.email field must be a string email. Deleted.",
      emptyNormalizedBugs: "Normalized value of bugs field is an empty object. Deleted.",
      nonUrlHomepage: "homepage field must be a string url. Deleted.",
      invalidLicense: "license should be a valid SPDX license expression",
      typo: "%s should probably be %s."
    };
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/make_warning.js
var require_make_warning = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/make_warning.js"(exports, module2) {
    var util2 = require("util");
    var messages = require_warning_messages();
    module2.exports = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      var warningName = args.shift();
      if (warningName == "typo") {
        return makeTypoWarning.apply(null, args);
      } else {
        var msgTemplate = messages[warningName] ? messages[warningName] : warningName + ": '%s'";
        args.unshift(msgTemplate);
        return util2.format.apply(null, args);
      }
    };
    function makeTypoWarning(providedName, probableName, field) {
      if (field) {
        providedName = field + "['" + providedName + "']";
        probableName = field + "['" + probableName + "']";
      }
      return util2.format(messages.typo, providedName, probableName);
    }
  }
});

// ../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/normalize.js
var require_normalize = __commonJS({
  "../../node_modules/.pnpm/normalize-package-data@2.5.0/node_modules/normalize-package-data/lib/normalize.js"(exports, module2) {
    module2.exports = normalize;
    var fixer = require_fixer();
    normalize.fixer = fixer;
    var makeWarning = require_make_warning();
    var fieldsToFix = [
      "name",
      "version",
      "description",
      "repository",
      "modules",
      "scripts",
      "files",
      "bin",
      "man",
      "bugs",
      "keywords",
      "readme",
      "homepage",
      "license"
    ];
    var otherThingsToFix = ["dependencies", "people", "typos"];
    var thingsToFix = fieldsToFix.map(function(fieldName) {
      return ucFirst(fieldName) + "Field";
    });
    thingsToFix = thingsToFix.concat(otherThingsToFix);
    function normalize(data, warn, strict) {
      if (warn === true)
        warn = null, strict = true;
      if (!strict)
        strict = false;
      if (!warn || data.private)
        warn = function(msg) {
        };
      if (data.scripts && data.scripts.install === "node-gyp rebuild" && !data.scripts.preinstall) {
        data.gypfile = true;
      }
      fixer.warn = function() {
        warn(makeWarning.apply(null, arguments));
      };
      thingsToFix.forEach(function(thingName) {
        fixer["fix" + ucFirst(thingName)](data, strict);
      });
      data._id = data.name + "@" + data.version;
    }
    function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
});

// ../../node_modules/.pnpm/read-pkg@5.2.0/node_modules/read-pkg/index.js
var require_read_pkg = __commonJS({
  "../../node_modules/.pnpm/read-pkg@5.2.0/node_modules/read-pkg/index.js"(exports, module2) {
    "use strict";
    var { promisify: promisify3 } = require("util");
    var fs7 = require("fs");
    var path7 = require("path");
    var parseJson = require_parse_json();
    var readFileAsync = promisify3(fs7.readFile);
    module2.exports = async (options2) => {
      options2 = {
        cwd: process.cwd(),
        normalize: true,
        ...options2
      };
      const filePath = path7.resolve(options2.cwd, "package.json");
      const json = parseJson(await readFileAsync(filePath, "utf8"));
      if (options2.normalize) {
        require_normalize()(json);
      }
      return json;
    };
    module2.exports.sync = (options2) => {
      options2 = {
        cwd: process.cwd(),
        normalize: true,
        ...options2
      };
      const filePath = path7.resolve(options2.cwd, "package.json");
      const json = parseJson(fs7.readFileSync(filePath, "utf8"));
      if (options2.normalize) {
        require_normalize()(json);
      }
      return json;
    };
  }
});

// ../../node_modules/.pnpm/read-pkg-up@7.0.1/node_modules/read-pkg-up/index.js
var require_read_pkg_up = __commonJS({
  "../../node_modules/.pnpm/read-pkg-up@7.0.1/node_modules/read-pkg-up/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var findUp2 = require_find_up2();
    var readPkg = require_read_pkg();
    module2.exports = async (options2) => {
      const filePath = await findUp2("package.json", options2);
      if (!filePath) {
        return;
      }
      return {
        packageJson: await readPkg({ ...options2, cwd: path7.dirname(filePath) }),
        path: filePath
      };
    };
    module2.exports.sync = (options2) => {
      const filePath = findUp2.sync("package.json", options2);
      if (!filePath) {
        return;
      }
      return {
        packageJson: readPkg.sync({ ...options2, cwd: path7.dirname(filePath) }),
        path: filePath
      };
    };
  }
});

// ../../node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/package.json
var require_package2 = __commonJS({
  "../../node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// ../../node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/lib/main.js
var require_main2 = __commonJS({
  "../../node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs7 = require("fs");
    var path7 = require("path");
    var os = require("os");
    var packageJson = require_package2();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path7.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config2(options2) {
      let dotenvPath = path7.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug6 = Boolean(options2 && options2.debug);
      const override = Boolean(options2 && options2.override);
      if (options2) {
        if (options2.path != null) {
          dotenvPath = _resolveHome(options2.path);
        }
        if (options2.encoding != null) {
          encoding = options2.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs7.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug6) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug6) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config: config2,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// ../../node_modules/.pnpm/universalify@2.0.0/node_modules/universalify/index.js
var require_universalify = __commonJS({
  "../../node_modules/.pnpm/universalify@2.0.0/node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function")
          fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(
              this,
              ...args,
              (err, res) => err != null ? reject(err) : resolve(res)
            );
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, args);
        else
          fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs7) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs7);
      }
      if (!fs7.lutimes) {
        patchLutimes(fs7);
      }
      fs7.chown = chownFix(fs7.chown);
      fs7.fchown = chownFix(fs7.fchown);
      fs7.lchown = chownFix(fs7.lchown);
      fs7.chmod = chmodFix(fs7.chmod);
      fs7.fchmod = chmodFix(fs7.fchmod);
      fs7.lchmod = chmodFix(fs7.lchmod);
      fs7.chownSync = chownFixSync(fs7.chownSync);
      fs7.fchownSync = chownFixSync(fs7.fchownSync);
      fs7.lchownSync = chownFixSync(fs7.lchownSync);
      fs7.chmodSync = chmodFixSync(fs7.chmodSync);
      fs7.fchmodSync = chmodFixSync(fs7.fchmodSync);
      fs7.lchmodSync = chmodFixSync(fs7.lchmodSync);
      fs7.stat = statFix(fs7.stat);
      fs7.fstat = statFix(fs7.fstat);
      fs7.lstat = statFix(fs7.lstat);
      fs7.statSync = statFixSync(fs7.statSync);
      fs7.fstatSync = statFixSync(fs7.fstatSync);
      fs7.lstatSync = statFixSync(fs7.lstatSync);
      if (fs7.chmod && !fs7.lchmod) {
        fs7.lchmod = function(path7, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs7.lchmodSync = function() {
        };
      }
      if (fs7.chown && !fs7.lchown) {
        fs7.lchown = function(path7, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs7.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs7.rename = typeof fs7.rename !== "function" ? fs7.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs7.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs7.rename);
      }
      fs7.read = typeof fs7.read !== "function" ? fs7.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs7, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs7, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs7.read);
      fs7.readSync = typeof fs7.readSync !== "function" ? fs7.readSync : function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs7, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs7.readSync);
      function patchLchmod(fs8) {
        fs8.lchmod = function(path7, mode, callback) {
          fs8.open(
            path7,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs8.fchmod(fd, mode, function(err2) {
                fs8.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            }
          );
        };
        fs8.lchmodSync = function(path7, mode) {
          var fd = fs8.openSync(path7, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs8.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs8.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs8.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs8) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs8.futimes) {
          fs8.lutimes = function(path7, at, mt, cb) {
            fs8.open(path7, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs8.futimes(fd, at, mt, function(er2) {
                fs8.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs8.lutimesSync = function(path7, at, mt) {
            var fd = fs8.openSync(path7, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs8.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs8.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs8.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs8.futimes) {
          fs8.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs8.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs7, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs7, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs7, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs7, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options2, cb) {
          if (typeof options2 === "function") {
            cb = options2;
            options2 = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options2 ? orig.call(fs7, target, options2, callback) : orig.call(fs7, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options2) {
          var stats = options2 ? orig.call(fs7, target, options2) : orig.call(fs7, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs7) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path7, options2) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path7, options2);
        Stream.call(this);
        var self = this;
        this.path = path7;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options2 = options2 || {};
        var keys = Object.keys(options2);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options2[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs7.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path7, options2) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path7, options2);
        Stream.call(this);
        this.path = path7;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options2 = options2 || {};
        var keys = Object.keys(options2);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options2[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs7.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone2;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone2(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs7 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone2 = require_clone();
    var util2 = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug6 = noop;
    if (util2.debuglog)
      debug6 = util2.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug6 = function() {
        var m = util2.format.apply(util2, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs7[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs7, queue);
      fs7.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs7, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs7.close);
      fs7.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs7, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs7.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug6(fs7[gracefulQueue]);
          require("assert").equal(fs7[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs7[gracefulQueue]);
    }
    module2.exports = patch(clone2(fs7));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs7.__patched) {
      module2.exports = patch(fs7);
      fs7.__patched = true;
    }
    function patch(fs8) {
      polyfills(fs8);
      fs8.gracefulify = patch;
      fs8.createReadStream = createReadStream;
      fs8.createWriteStream = createWriteStream;
      var fs$readFile = fs8.readFile;
      fs8.readFile = readFile2;
      function readFile2(path7, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$readFile(path7, options2, cb);
        function go$readFile(path8, options3, cb2, startTime) {
          return fs$readFile(path8, options3, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path8, options3, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs8.writeFile;
      fs8.writeFile = writeFile;
      function writeFile(path7, data, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$writeFile(path7, data, options2, cb);
        function go$writeFile(path8, data2, options3, cb2, startTime) {
          return fs$writeFile(path8, data2, options3, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path8, data2, options3, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs8.appendFile;
      if (fs$appendFile)
        fs8.appendFile = appendFile;
      function appendFile(path7, data, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$appendFile(path7, data, options2, cb);
        function go$appendFile(path8, data2, options3, cb2, startTime) {
          return fs$appendFile(path8, data2, options3, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path8, data2, options3, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs8.copyFile;
      if (fs$copyFile)
        fs8.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs8.readdir;
      fs8.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path7, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path8, options3, cb2, startTime) {
          return fs$readdir(path8, fs$readdirCallback(
            path8,
            options3,
            cb2,
            startTime
          ));
        } : function go$readdir2(path8, options3, cb2, startTime) {
          return fs$readdir(path8, options3, fs$readdirCallback(
            path8,
            options3,
            cb2,
            startTime
          ));
        };
        return go$readdir(path7, options2, cb);
        function fs$readdirCallback(path8, options3, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path8, options3, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs8);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs8.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs8.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs8, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs8, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs8, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs8, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path7, options2) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path7, options2) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path7, options2) {
        return new fs8.ReadStream(path7, options2);
      }
      function createWriteStream(path7, options2) {
        return new fs8.WriteStream(path7, options2);
      }
      var fs$open = fs8.open;
      fs8.open = open;
      function open(path7, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path7, flags, mode, cb);
        function go$open(path8, flags2, mode2, cb2, startTime) {
          return fs$open(path8, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path8, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs8;
    }
    function enqueue(elem) {
      debug6("ENQUEUE", elem[0].name, elem[1]);
      fs7[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs7[gracefulQueue].length; ++i) {
        if (fs7[gracefulQueue][i].length > 2) {
          fs7[gracefulQueue][i][3] = now;
          fs7[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs7[gracefulQueue].length === 0)
        return;
      var elem = fs7[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug6("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug6("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug6("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs7[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs7 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs7[key] === "function";
    });
    Object.assign(exports, fs7);
    api.forEach((method2) => {
      exports[method2] = u(fs7[method2]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs7.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs7.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs7.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs7.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs7.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs7.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs7.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs7.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs7.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs7.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs7.realpath.native === "function") {
      exports.realpath.native = u(fs7.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path7.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module2) {
    "use strict";
    var fs7 = require_fs();
    var { checkPath } = require_utils();
    var getMode = (options2) => {
      const defaults = { mode: 511 };
      if (typeof options2 === "number")
        return options2;
      return { ...defaults, ...options2 }.mode;
    };
    module2.exports.makeDir = async (dir, options2) => {
      checkPath(dir);
      return fs7.mkdir(dir, {
        mode: getMode(options2),
        recursive: true
      });
    };
    module2.exports.makeDirSync = (dir, options2) => {
      checkPath(dir);
      return fs7.mkdirSync(dir, {
        mode: getMode(options2),
        recursive: true
      });
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/path-exists/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs7 = require_fs();
    function pathExists(path7) {
      return fs7.access(path7).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs7.existsSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    function utimesMillis(path7, atime, mtime, callback) {
      fs7.open(path7, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs7.futimes(fd, atime, mtime, (futimesErr) => {
          fs7.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path7, atime, mtime) {
      const fd = fs7.openSync(path7, "r+");
      fs7.futimesSync(fd, atime, mtime);
      return fs7.closeSync(fd);
    }
    module2.exports = {
      utimesMillis,
      utimesMillisSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/stat.js"(exports, module2) {
    "use strict";
    var fs7 = require_fs();
    var path7 = require("path");
    var util2 = require("util");
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs7.stat(file, { bigint: true }) : (file) => fs7.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs7.statSync(file, { bigint: true }) : (file) => fs7.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, opts, cb) {
      util2.callbackify(getStats)(src, dest, opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path7.basename(src);
            const destBaseName = path7.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true });
            }
            return cb(new Error("Source and destination must not be the same."));
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path7.basename(src);
          const destBaseName = path7.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path7.resolve(path7.dirname(src));
      const destParent = path7.resolve(path7.dirname(dest));
      if (destParent === srcParent || destParent === path7.parse(destParent).root)
        return cb();
      fs7.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT")
            return cb();
          return cb(err);
        }
        if (areIdentical(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path7.resolve(path7.dirname(src));
      const destParent = path7.resolve(path7.dirname(dest));
      if (destParent === srcParent || destParent === path7.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs7.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path7.resolve(src).split(path7.sep).filter((i) => i);
      const destArr = path7.resolve(dest).split(path7.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    var path7 = require("path");
    var mkdirs = require_mkdirs().mkdirs;
    var pathExists = require_path_exists2().pathExists;
    var utimesMillis = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          runFilter(src, dest, opts, (err3, include) => {
            if (err3)
              return cb(err3);
            if (!include)
              return cb();
            checkParentDir(destStat, src, dest, opts, cb);
          });
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path7.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return getStats(destStat, src, dest, opts, cb);
        mkdirs(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return getStats(destStat, src, dest, opts, cb);
        });
      });
    }
    function runFilter(src, dest, opts, cb) {
      if (!opts.filter)
        return cb(null, true);
      Promise.resolve(opts.filter(src, dest)).then((include) => cb(null, include), (error) => cb(error));
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs7.stat : fs7.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
        else if (srcStat.isSocket())
          return cb(new Error(`Cannot copy a socket file: ${src}`));
        else if (srcStat.isFIFO())
          return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
        return cb(new Error(`Unknown file: ${src}`));
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs7.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      fs7.copyFile(src, dest, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps)
          return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
        return setDestMode(dest, srcStat.mode, cb);
      });
    }
    function handleTimestampsAndMode(srcMode, src, dest, cb) {
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, (err) => {
          if (err)
            return cb(err);
          return setDestTimestampsAndMode(srcMode, src, dest, cb);
        });
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 128, cb);
    }
    function setDestTimestampsAndMode(srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, (err) => {
        if (err)
          return cb(err);
        return setDestMode(dest, srcMode, cb);
      });
    }
    function setDestMode(dest, srcMode, cb) {
      return fs7.chmod(dest, srcMode, cb);
    }
    function setDestTimestamps(src, dest, cb) {
      fs7.stat(src, (err, updatedSrcStat) => {
        if (err)
          return cb(err);
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcMode, src, dest, opts, cb) {
      fs7.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return setDestMode(dest, srcMode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs7.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path7.join(src, item);
      const destItem = path7.join(dest, item);
      runFilter(srcItem, destItem, opts, (err, include) => {
        if (err)
          return cb(err);
        if (!include)
          return copyDirItems(items, src, dest, opts, cb);
        stat.checkPaths(srcItem, destItem, "copy", opts, (err2, stats) => {
          if (err2)
            return cb(err2);
          const { destStat } = stats;
          getStats(destStat, srcItem, destItem, opts, (err3) => {
            if (err3)
              return cb(err3);
            return copyDirItems(items, src, dest, opts, cb);
          });
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs7.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path7.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs7.symlink(resolvedSrc, dest, cb);
        } else {
          fs7.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs7.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path7.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs7.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs7.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    var path7 = require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path7.dirname(dest);
      if (!fs7.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs7.statSync : fs7.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs7.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs7.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs7.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs7.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs7.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs7.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path7.join(src, item);
      const destItem = path7.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem))
        return;
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs7.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path7.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs7.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs7.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs7.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path7.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs7.unlinkSync(dest);
      return fs7.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    var u = require_universalify().fromCallback;
    function remove(path7, callback) {
      fs7.rm(path7, { recursive: true, force: true }, callback);
    }
    function removeSync(path7) {
      fs7.rmSync(path7, { recursive: true, force: true });
    }
    module2.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs7 = require_fs();
    var path7 = require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs7.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path7.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs7.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path7.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path7 = require("path");
    var fs7 = require_graceful_fs();
    var mkdir = require_mkdirs();
    function createFile(file, callback) {
      function makeFile() {
        fs7.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs7.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path7.dirname(file);
        fs7.stat(dir, (err2, stats2) => {
          if (err2) {
            if (err2.code === "ENOENT") {
              return mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeFile();
              });
            }
            return callback(err2);
          }
          if (stats2.isDirectory())
            makeFile();
          else {
            fs7.readdir(dir, (err3) => {
              if (err3)
                return callback(err3);
            });
          }
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs7.statSync(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path7.dirname(file);
      try {
        if (!fs7.statSync(dir).isDirectory()) {
          fs7.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs7.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path7 = require("path");
    var fs7 = require_graceful_fs();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists2().pathExists;
    var { areIdentical } = require_stat();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs7.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs7.lstat(dstpath, (_, dstStat) => {
        fs7.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          if (dstStat && areIdentical(srcStat, dstStat))
            return callback(null);
          const dir = path7.dirname(dstpath);
          pathExists(dir, (err2, dirExists) => {
            if (err2)
              return callback(err2);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err3) => {
              if (err3)
                return callback(err3);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs7.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs7.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path7.dirname(dstpath);
      const dirExists = fs7.existsSync(dir);
      if (dirExists)
        return fs7.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs7.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var fs7 = require_graceful_fs();
    var pathExists = require_path_exists2().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path7.isAbsolute(srcpath)) {
        return fs7.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          });
        });
      } else {
        const dstdir = path7.dirname(dstpath);
        const relativeToDst = path7.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists4) => {
          if (err)
            return callback(err);
          if (exists4) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            });
          } else {
            return fs7.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path7.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists4;
      if (path7.isAbsolute(srcpath)) {
        exists4 = fs7.existsSync(srcpath);
        if (!exists4)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      } else {
        const dstdir = path7.dirname(dstpath);
        const relativeToDst = path7.join(dstdir, srcpath);
        exists4 = fs7.existsSync(relativeToDst);
        if (exists4) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          };
        } else {
          exists4 = fs7.existsSync(srcpath);
          if (!exists4)
            throw new Error("relative srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: path7.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs7.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs7.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path7 = require("path");
    var fs7 = require_fs();
    var _mkdirs = require_mkdirs();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists2().pathExists;
    var { areIdentical } = require_stat();
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs7.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs7.stat(srcpath),
            fs7.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat))
              return callback(null);
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else
          _createSymlink(srcpath, dstpath, type, callback);
      });
    }
    function _createSymlink(srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err)
          return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err2, type2) => {
          if (err2)
            return callback(err2);
          const dir = path7.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return fs7.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              fs7.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs7.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs7.statSync(srcpath);
        const dstStat = fs7.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path7.dirname(dstpath);
      const exists4 = fs7.existsSync(dir);
      if (exists4)
        return fs7.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs7.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module2.exports = {
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// ../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js"(exports, module2) {
    function stringify2(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module2.exports = { stringify: stringify2, stripBom };
  }
});

// ../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js"(exports, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    var universalify = require_universalify();
    var { stringify: stringify2, stripBom } = require_utils2();
    async function _readFile(file, options2 = {}) {
      if (typeof options2 === "string") {
        options2 = { encoding: options2 };
      }
      const fs7 = options2.fs || _fs;
      const shouldThrow = "throws" in options2 ? options2.throws : true;
      let data = await universalify.fromCallback(fs7.readFile)(file, options2);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options2 ? options2.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile2 = universalify.fromPromise(_readFile);
    function readFileSync(file, options2 = {}) {
      if (typeof options2 === "string") {
        options2 = { encoding: options2 };
      }
      const fs7 = options2.fs || _fs;
      const shouldThrow = "throws" in options2 ? options2.throws : true;
      try {
        let content = fs7.readFileSync(file, options2);
        content = stripBom(content);
        return JSON.parse(content, options2.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options2 = {}) {
      const fs7 = options2.fs || _fs;
      const str = stringify2(obj, options2);
      await universalify.fromCallback(fs7.writeFile)(file, str, options2);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options2 = {}) {
      const fs7 = options2.fs || _fs;
      const str = stringify2(obj, options2);
      return fs7.writeFileSync(file, str, options2);
    }
    var jsonfile = {
      readFile: readFile2,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/jsonfile.js"(exports, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/output-file/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs7 = require_graceful_fs();
    var path7 = require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists2().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path7.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs7.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs7.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path7.dirname(file);
      if (fs7.existsSync(dir)) {
        return fs7.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs7.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    "use strict";
    var { stringify: stringify2 } = require_utils2();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options2 = {}) {
      const str = stringify2(data, options2);
      await outputFile(file, str, options2);
    }
    module2.exports = outputJson;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    "use strict";
    var { stringify: stringify2 } = require_utils2();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options2) {
      const str = stringify2(data, options2);
      outputFileSync(file, str, options2);
    }
    module2.exports = outputJsonSync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    var path7 = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs().mkdirp;
    var pathExists = require_path_exists2().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          if (isParentRoot(dest))
            return doRename(src, dest, overwrite, isChangingCase, cb);
          mkdirp(path7.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, isChangingCase, cb);
          });
        });
      });
    }
    function isParentRoot(dest) {
      const parent = path7.dirname(dest);
      const parsedPath = path7.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase)
        return rename(src, dest, overwrite, cb);
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs7.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move-sync.js"(exports, module2) {
    "use strict";
    var fs7 = require_graceful_fs();
    var path7 = require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path7.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path7.dirname(dest);
      const parsedPath = path7.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs7.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs7.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/index.js
var require_lib4 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      ...require_fs(),
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists2(),
      ...require_remove()
    };
  }
});

// ../../node_modules/.pnpm/commondir@1.0.1/node_modules/commondir/index.js
var require_commondir = __commonJS({
  "../../node_modules/.pnpm/commondir@1.0.1/node_modules/commondir/index.js"(exports, module2) {
    var path7 = require("path");
    module2.exports = function(basedir, relfiles) {
      if (relfiles) {
        var files = relfiles.map(function(r) {
          return path7.resolve(basedir, r);
        });
      } else {
        var files = basedir;
      }
      var res = files.slice(1).reduce(function(ps, file) {
        if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
          throw new Error("relative path without a basedir");
        }
        var xs = file.split(/\/+|\\+/);
        for (var i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++)
          ;
        return ps.slice(0, i);
      }, files[0].split(/\/+|\\+/));
      return res.length > 1 ? res.join("/") : "/";
    };
  }
});

// ../../node_modules/.pnpm/pkg-dir@4.2.0/node_modules/pkg-dir/index.js
var require_pkg_dir = __commonJS({
  "../../node_modules/.pnpm/pkg-dir@4.2.0/node_modules/pkg-dir/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var findUp2 = require_find_up2();
    var pkgDir = async (cwd) => {
      const filePath = await findUp2("package.json", { cwd });
      return filePath && path7.dirname(filePath);
    };
    module2.exports = pkgDir;
    module2.exports.default = pkgDir;
    module2.exports.sync = (cwd) => {
      const filePath = findUp2.sync("package.json", { cwd });
      return filePath && path7.dirname(filePath);
    };
  }
});

// ../../node_modules/.pnpm/semver@6.3.0/node_modules/semver/semver.js
var require_semver2 = __commonJS({
  "../../node_modules/.pnpm/semver@6.3.0/node_modules/semver/semver.js"(exports, module2) {
    exports = module2.exports = SemVer;
    var debug6;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug6 = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug6 = function() {
      };
    }
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER2 = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.tokens = {};
    var R = 0;
    function tok(n) {
      t[n] = R++;
    }
    tok("NUMERICIDENTIFIER");
    src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    tok("NUMERICIDENTIFIERLOOSE");
    src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    tok("NONNUMERICIDENTIFIER");
    src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    tok("MAINVERSION");
    src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")";
    tok("MAINVERSIONLOOSE");
    src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
    tok("PRERELEASEIDENTIFIER");
    src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
    tok("PRERELEASEIDENTIFIERLOOSE");
    src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
    tok("PRERELEASE");
    src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
    tok("PRERELEASELOOSE");
    src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
    tok("BUILDIDENTIFIER");
    src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    tok("BUILD");
    src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
    tok("FULL");
    tok("FULLPLAIN");
    src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
    src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
    tok("LOOSEPLAIN");
    src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
    tok("LOOSE");
    src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
    tok("GTLT");
    src[t.GTLT] = "((?:<|>)?=?)";
    tok("XRANGEIDENTIFIERLOOSE");
    src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    tok("XRANGEIDENTIFIER");
    src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
    tok("XRANGEPLAIN");
    src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?";
    tok("XRANGEPLAINLOOSE");
    src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?";
    tok("XRANGE");
    src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
    tok("XRANGELOOSE");
    src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
    tok("COERCE");
    src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    tok("COERCERTL");
    re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
    tok("LONETILDE");
    src[t.LONETILDE] = "(?:~>?)";
    tok("TILDETRIM");
    src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
    re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    tok("TILDE");
    src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
    tok("TILDELOOSE");
    src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
    tok("LONECARET");
    src[t.LONECARET] = "(?:\\^)";
    tok("CARETTRIM");
    src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
    re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    tok("CARET");
    src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
    tok("CARETLOOSE");
    src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
    tok("COMPARATORLOOSE");
    src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
    tok("COMPARATOR");
    src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
    tok("COMPARATORTRIM");
    src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
    re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    tok("HYPHENRANGE");
    src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$";
    tok("HYPHENRANGELOOSE");
    src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$";
    tok("STAR");
    src[t.STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug6(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    var i;
    exports.parse = parse;
    function parse(version, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options2.loose ? re[t.LOOSE] : re[t.FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options2);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, options2) {
      var v = parse(version, options2);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, options2) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options2);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options2.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options2);
      }
      debug6("SemVer", version, options2);
      this.options = options2;
      this.loose = !!options2.loose;
      var m = version.trim().match(options2.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER2 || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER2 || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER2 || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER2) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug6("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug6("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.compareBuild = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      var i2 = 0;
      do {
        var a = this.build[i2];
        var b = other.build[i2];
        debug6("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.compareBuild = compareBuild;
    function compareBuild(a, b, loose) {
      var versionA = new SemVer(a, loose);
      var versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compareBuild(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compareBuild(b, a, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports.Comparator = Comparator;
    function Comparator(comp, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options2.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options2);
      }
      debug6("comparator", comp, options2);
      this.options = options2;
      this.loose = !!options2.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug6("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug6("Comparator.test", version, this.options.loose);
      if (this.semver === ANY || version === ANY) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options2) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        rangeTmp = new Range(comp.value, options2);
        return satisfies(this.value, rangeTmp, options2);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        rangeTmp = new Range(this.value, options2);
        return satisfies(comp.semver, rangeTmp, options2);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options2) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options2) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, options2) {
      if (!options2 || typeof options2 !== "object") {
        options2 = {
          loose: !!options2,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options2.loose && range.includePrerelease === !!options2.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options2);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options2);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options2);
      }
      this.options = options2;
      this.loose = !!options2.loose;
      this.includePrerelease = !!options2.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug6("hyphen replace", range);
      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug6("comparator trim", range, re[t.COMPARATORTRIM]);
      range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
      range = range.replace(re[t.CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options2) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return isSatisfiable(thisComparators, options2) && range.set.some(function(rangeComparators) {
          return isSatisfiable(rangeComparators, options2) && thisComparators.every(function(thisComparator) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options2);
            });
          });
        });
      });
    };
    function isSatisfiable(comparators, options2) {
      var result = true;
      var remainingComparators = comparators.slice();
      var testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every(function(otherComparator) {
          return testComparator.intersects(otherComparator, options2);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    }
    exports.toComparators = toComparators;
    function toComparators(range, options2) {
      return new Range(range, options2).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options2) {
      debug6("comp", comp, options2);
      comp = replaceCarets(comp, options2);
      debug6("caret", comp);
      comp = replaceTildes(comp, options2);
      debug6("tildes", comp);
      comp = replaceXRanges(comp, options2);
      debug6("xrange", comp);
      comp = replaceStars(comp, options2);
      debug6("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options2) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options2);
      }).join(" ");
    }
    function replaceTilde(comp, options2) {
      var r = options2.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug6("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug6("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug6("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options2) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options2);
      }).join(" ");
    }
    function replaceCaret(comp, options2) {
      debug6("caret", comp, options2);
      var r = options2.loose ? re[t.CARETLOOSE] : re[t.CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug6("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug6("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug6("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug6("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options2) {
      debug6("replaceXRanges", comp, options2);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options2);
      }).join(" ");
    }
    function replaceXRange(comp, options2) {
      comp = comp.trim();
      var r = options2.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug6("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options2.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p + pr;
        } else if (xm) {
          ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
        }
        debug6("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options2) {
      debug6("replaceStars", comp, options2);
      return comp.trim().replace(re[t.STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options2) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options2.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug6(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, options2) {
      try {
        range = new Range(range, options2);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options2) {
      var max2 = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options2);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max2 || maxSV.compare(v) === -1) {
            max2 = v;
            maxSV = new SemVer(max2, options2);
          }
        }
      });
      return max2;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options2) {
      var min2 = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options2);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min2 || minSV.compare(v) === 1) {
            min2 = v;
            minSV = new SemVer(min2, options2);
          }
        }
      });
      return min2;
    }
    exports.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports.validRange = validRange;
    function validRange(range, options2) {
      try {
        return new Range(range, options2).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, options2) {
      return outside(version, range, "<", options2);
    }
    exports.gtr = gtr;
    function gtr(version, range, options2) {
      return outside(version, range, ">", options2);
    }
    exports.outside = outside;
    function outside(version, range, hilo, options2) {
      version = new SemVer(version, options2);
      range = new Range(range, options2);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options2)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options2)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options2)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, options2) {
      var parsed = parse(version, options2);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, options2) {
      r1 = new Range(r1, options2);
      r2 = new Range(r2, options2);
      return r1.intersects(r2);
    }
    exports.coerce = coerce;
    function coerce(version, options2) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options2 = options2 || {};
      var match = null;
      if (!options2.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        var next;
        while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        re[t.COERCERTL].lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options2);
    }
  }
});

// ../../node_modules/.pnpm/make-dir@3.1.0/node_modules/make-dir/index.js
var require_make_dir2 = __commonJS({
  "../../node_modules/.pnpm/make-dir@3.1.0/node_modules/make-dir/index.js"(exports, module2) {
    "use strict";
    var fs7 = require("fs");
    var path7 = require("path");
    var { promisify: promisify3 } = require("util");
    var semver = require_semver2();
    var useNativeRecursiveOption = semver.satisfies(process.version, ">=10.12.0");
    var checkPath = (pth) => {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path7.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
    var processOptions = (options2) => {
      const defaults = {
        mode: 511,
        fs: fs7
      };
      return {
        ...defaults,
        ...options2
      };
    };
    var permissionError = (pth) => {
      const error = new Error(`operation not permitted, mkdir '${pth}'`);
      error.code = "EPERM";
      error.errno = -4048;
      error.path = pth;
      error.syscall = "mkdir";
      return error;
    };
    var makeDir = async (input, options2) => {
      checkPath(input);
      options2 = processOptions(options2);
      const mkdir = promisify3(options2.fs.mkdir);
      const stat = promisify3(options2.fs.stat);
      if (useNativeRecursiveOption && options2.fs.mkdir === fs7.mkdir) {
        const pth = path7.resolve(input);
        await mkdir(pth, {
          mode: options2.mode,
          recursive: true
        });
        return pth;
      }
      const make = async (pth) => {
        try {
          await mkdir(pth, options2.mode);
          return pth;
        } catch (error) {
          if (error.code === "EPERM") {
            throw error;
          }
          if (error.code === "ENOENT") {
            if (path7.dirname(pth) === pth) {
              throw permissionError(pth);
            }
            if (error.message.includes("null bytes")) {
              throw error;
            }
            await make(path7.dirname(pth));
            return make(pth);
          }
          try {
            const stats = await stat(pth);
            if (!stats.isDirectory()) {
              throw new Error("The path is not a directory");
            }
          } catch (_) {
            throw error;
          }
          return pth;
        }
      };
      return make(path7.resolve(input));
    };
    module2.exports = makeDir;
    module2.exports.sync = (input, options2) => {
      checkPath(input);
      options2 = processOptions(options2);
      if (useNativeRecursiveOption && options2.fs.mkdirSync === fs7.mkdirSync) {
        const pth = path7.resolve(input);
        fs7.mkdirSync(pth, {
          mode: options2.mode,
          recursive: true
        });
        return pth;
      }
      const make = (pth) => {
        try {
          options2.fs.mkdirSync(pth, options2.mode);
        } catch (error) {
          if (error.code === "EPERM") {
            throw error;
          }
          if (error.code === "ENOENT") {
            if (path7.dirname(pth) === pth) {
              throw permissionError(pth);
            }
            if (error.message.includes("null bytes")) {
              throw error;
            }
            make(path7.dirname(pth));
            return make(pth);
          }
          try {
            if (!options2.fs.statSync(pth).isDirectory()) {
              throw new Error("The path is not a directory");
            }
          } catch (_) {
            throw error;
          }
        }
        return pth;
      };
      return make(path7.resolve(input));
    };
  }
});

// ../../node_modules/.pnpm/find-cache-dir@3.3.2/node_modules/find-cache-dir/index.js
var require_find_cache_dir = __commonJS({
  "../../node_modules/.pnpm/find-cache-dir@3.3.2/node_modules/find-cache-dir/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var fs7 = require("fs");
    var commonDir = require_commondir();
    var pkgDir = require_pkg_dir();
    var makeDir = require_make_dir2();
    var { env, cwd } = process;
    var isWritable = (path8) => {
      try {
        fs7.accessSync(path8, fs7.constants.W_OK);
        return true;
      } catch (_) {
        return false;
      }
    };
    function useDirectory(directory, options2) {
      if (options2.create) {
        makeDir.sync(directory);
      }
      if (options2.thunk) {
        return (...arguments_) => path7.join(directory, ...arguments_);
      }
      return directory;
    }
    function getNodeModuleDirectory(directory) {
      const nodeModules = path7.join(directory, "node_modules");
      if (!isWritable(nodeModules) && (fs7.existsSync(nodeModules) || !isWritable(path7.join(directory)))) {
        return;
      }
      return nodeModules;
    }
    module2.exports = (options2 = {}) => {
      if (env.CACHE_DIR && !["true", "false", "1", "0"].includes(env.CACHE_DIR)) {
        return useDirectory(path7.join(env.CACHE_DIR, options2.name), options2);
      }
      let { cwd: directory = cwd() } = options2;
      if (options2.files) {
        directory = commonDir(directory, options2.files);
      }
      directory = pkgDir.sync(directory);
      if (!directory) {
        return;
      }
      const nodeModules = getNodeModuleDirectory(directory);
      if (!nodeModules) {
        return void 0;
      }
      return useDirectory(path7.join(directory, "node_modules", ".cache", options2.name), options2);
    };
  }
});

// ../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js
var require_indent_string = __commonJS({
  "../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js"(exports, module2) {
    "use strict";
    module2.exports = (string, count = 1, options2) => {
      options2 = {
        indent: " ",
        includeEmptyLines: false,
        ...options2
      };
      if (typeof string !== "string") {
        throw new TypeError(
          `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
        );
      }
      if (typeof count !== "number") {
        throw new TypeError(
          `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
        );
      }
      if (typeof options2.indent !== "string") {
        throw new TypeError(
          `Expected \`options.indent\` to be a \`string\`, got \`${typeof options2.indent}\``
        );
      }
      if (count === 0) {
        return string;
      }
      const regex = options2.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
      return string.replace(regex, options2.indent.repeat(count));
    };
  }
});

// ../../node_modules/.pnpm/pluralize@8.0.0/node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "../../node_modules/.pnpm/pluralize@8.0.0/node_modules/pluralize/pluralize.js"(exports, module2) {
    (function(root, pluralize3) {
      if (typeof require === "function" && typeof exports === "object" && typeof module2 === "object") {
        module2.exports = pluralize3();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize3();
        });
      } else {
        root.pluralize = pluralize3();
      }
    })(exports, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token)
          return token;
        if (word === word.toLowerCase())
          return token.toLowerCase();
        if (word === word.toUpperCase())
          return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word))
            return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token))
            return true;
          if (replaceMap.hasOwnProperty(token))
            return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize3(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize3.singular(word) : pluralize3.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize3.plural = replaceWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize3.isPlural = checkWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize3.singular = replaceWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize3.isSingular = checkWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize3.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize3.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize3.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize3.addPluralRule(word, "$0");
        pluralize3.addSingularRule(word, "$0");
      };
      pluralize3.addIrregularRule = function(single, plural) {
        plural = plural.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural;
        irregularPlurals[plural] = single;
      };
      [
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        ["genus", "genera"],
        ["viscus", "viscera"],
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize3.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize3.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize3.addSingularRule(rule[0], rule[1]);
      });
      [
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        /[^aeiou]ese$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /o[iu]s$/i,
        /pox$/i,
        /sheep$/i
      ].forEach(pluralize3.addUncountableRule);
      return pluralize3;
    });
  }
});

// ../../node_modules/.pnpm/js-levenshtein@1.1.6/node_modules/js-levenshtein/index.js
var require_js_levenshtein = __commonJS({
  "../../node_modules/.pnpm/js-levenshtein@1.1.6/node_modules/js-levenshtein/index.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1 ? d0 > d2 ? d2 + 1 : d0 + 1 : bx === ay ? d1 : d1 + 1;
      }
      return function(a, b) {
        if (a === b) {
          return 0;
        }
        if (a.length > b.length) {
          var tmp = a;
          a = b;
          b = tmp;
        }
        var la = a.length;
        var lb = b.length;
        while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
          la--;
          lb--;
        }
        var offset = 0;
        while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
          offset++;
        }
        la -= offset;
        lb -= offset;
        if (la === 0 || lb < 3) {
          return lb;
        }
        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;
        var vector = [];
        for (y = 0; y < la; y++) {
          vector.push(y + 1);
          vector.push(a.charCodeAt(offset + y));
        }
        var len = vector.length - 1;
        for (; x < lb - 3; ) {
          bx0 = b.charCodeAt(offset + (d0 = x));
          bx1 = b.charCodeAt(offset + (d1 = x + 1));
          bx2 = b.charCodeAt(offset + (d2 = x + 2));
          bx3 = b.charCodeAt(offset + (d3 = x + 3));
          dd = x += 4;
          for (y = 0; y < len; y += 2) {
            dy = vector[y];
            ay = vector[y + 1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd = _min(d2, d3, dd, bx3, ay);
            vector[y] = dd;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
          }
        }
        for (; x < lb; ) {
          bx0 = b.charCodeAt(offset + (d0 = x));
          dd = ++x;
          for (y = 0; y < len; y += 2) {
            dy = vector[y];
            vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
            d0 = dy;
          }
        }
        return dd;
      };
    }();
  }
});

// ../../node_modules/.pnpm/env-paths@2.2.1/node_modules/env-paths/index.js
var require_env_paths = __commonJS({
  "../../node_modules/.pnpm/env-paths@2.2.1/node_modules/env-paths/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var os = require("os");
    var homedir = os.homedir();
    var tmpdir = os.tmpdir();
    var { env } = process;
    var macos = (name) => {
      const library = path7.join(homedir, "Library");
      return {
        data: path7.join(library, "Application Support", name),
        config: path7.join(library, "Preferences", name),
        cache: path7.join(library, "Caches", name),
        log: path7.join(library, "Logs", name),
        temp: path7.join(tmpdir, name)
      };
    };
    var windows = (name) => {
      const appData = env.APPDATA || path7.join(homedir, "AppData", "Roaming");
      const localAppData = env.LOCALAPPDATA || path7.join(homedir, "AppData", "Local");
      return {
        data: path7.join(localAppData, name, "Data"),
        config: path7.join(appData, name, "Config"),
        cache: path7.join(localAppData, name, "Cache"),
        log: path7.join(localAppData, name, "Log"),
        temp: path7.join(tmpdir, name)
      };
    };
    var linux = (name) => {
      const username = path7.basename(homedir);
      return {
        data: path7.join(env.XDG_DATA_HOME || path7.join(homedir, ".local", "share"), name),
        config: path7.join(env.XDG_CONFIG_HOME || path7.join(homedir, ".config"), name),
        cache: path7.join(env.XDG_CACHE_HOME || path7.join(homedir, ".cache"), name),
        log: path7.join(env.XDG_STATE_HOME || path7.join(homedir, ".local", "state"), name),
        temp: path7.join(tmpdir, username, name)
      };
    };
    var envPaths = (name, options2) => {
      if (typeof name !== "string") {
        throw new TypeError(`Expected string, got ${typeof name}`);
      }
      options2 = Object.assign({ suffix: "nodejs" }, options2);
      if (options2.suffix) {
        name += `-${options2.suffix}`;
      }
      if (process.platform === "darwin") {
        return macos(name);
      }
      if (process.platform === "win32") {
        return windows(name);
      }
      return linux(name);
    };
    module2.exports = envPaths;
    module2.exports.default = envPaths;
  }
});

// ../../node_modules/.pnpm/path-exists@3.0.0/node_modules/path-exists/index.js
var require_path_exists3 = __commonJS({
  "../../node_modules/.pnpm/path-exists@3.0.0/node_modules/path-exists/index.js"(exports, module2) {
    "use strict";
    var fs7 = require("fs");
    module2.exports = (fp) => new Promise((resolve) => {
      fs7.access(fp, (err) => {
        resolve(!err);
      });
    });
    module2.exports.sync = (fp) => {
      try {
        fs7.accessSync(fp);
        return true;
      } catch (err) {
        return false;
      }
    };
  }
});

// ../../node_modules/.pnpm/p-locate@3.0.0/node_modules/p-locate/index.js
var require_p_locate3 = __commonJS({
  "../../node_modules/.pnpm/p-locate@3.0.0/node_modules/p-locate/index.js"(exports, module2) {
    "use strict";
    var pLimit = require_p_limit2();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = (el, tester) => Promise.resolve(el).then(tester);
    var finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
    module2.exports = (iterable, tester, opts) => {
      opts = Object.assign({
        concurrency: Infinity,
        preserveOrder: true
      }, opts);
      const limit = pLimit(opts.concurrency);
      const items = [...iterable].map((el) => [el, limit(testElement, el, tester)]);
      const checkLimit = pLimit(opts.preserveOrder ? 1 : Infinity);
      return Promise.all(items.map((el) => checkLimit(finder, el))).then(() => {
      }).catch((err) => err instanceof EndError ? err.value : Promise.reject(err));
    };
  }
});

// ../../node_modules/.pnpm/locate-path@3.0.0/node_modules/locate-path/index.js
var require_locate_path3 = __commonJS({
  "../../node_modules/.pnpm/locate-path@3.0.0/node_modules/locate-path/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var pathExists = require_path_exists3();
    var pLocate = require_p_locate3();
    module2.exports = (iterable, options2) => {
      options2 = Object.assign({
        cwd: process.cwd()
      }, options2);
      return pLocate(iterable, (el) => pathExists(path7.resolve(options2.cwd, el)), options2);
    };
    module2.exports.sync = (iterable, options2) => {
      options2 = Object.assign({
        cwd: process.cwd()
      }, options2);
      for (const el of iterable) {
        if (pathExists.sync(path7.resolve(options2.cwd, el))) {
          return el;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@3.0.0/node_modules/find-up/index.js
var require_find_up3 = __commonJS({
  "../../node_modules/.pnpm/find-up@3.0.0/node_modules/find-up/index.js"(exports, module2) {
    "use strict";
    var path7 = require("path");
    var locatePath = require_locate_path3();
    module2.exports = (filename, opts = {}) => {
      const startDir = path7.resolve(opts.cwd || "");
      const { root } = path7.parse(startDir);
      const filenames = [].concat(filename);
      return new Promise((resolve) => {
        (function find(dir) {
          locatePath(filenames, { cwd: dir }).then((file) => {
            if (file) {
              resolve(path7.join(dir, file));
            } else if (dir === root) {
              resolve(null);
            } else {
              find(path7.dirname(dir));
            }
          });
        })(startDir);
      });
    };
    module2.exports.sync = (filename, opts = {}) => {
      let dir = path7.resolve(opts.cwd || "");
      const { root } = path7.parse(dir);
      const filenames = [].concat(filename);
      while (true) {
        const file = locatePath.sync(filenames, { cwd: dir });
        if (file) {
          return path7.join(dir, file);
        }
        if (dir === root) {
          return null;
        }
        dir = path7.dirname(dir);
      }
    };
  }
});

// ../../node_modules/.pnpm/pkg-up@3.1.0/node_modules/pkg-up/index.js
var require_pkg_up = __commonJS({
  "../../node_modules/.pnpm/pkg-up@3.1.0/node_modules/pkg-up/index.js"(exports, module2) {
    "use strict";
    var findUp2 = require_find_up3();
    module2.exports = async ({ cwd } = {}) => findUp2("package.json", { cwd });
    module2.exports.sync = ({ cwd } = {}) => findUp2.sync("package.json", { cwd });
  }
});

// package.json
var require_package3 = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "@prisma/client",
      version: "4.16.2",
      description: "Prisma Client is an auto-generated, type-safe and modern JavaScript/TypeScript ORM for Node.js that's tailored to your data. Supports MySQL, PostgreSQL, MariaDB, SQLite databases.",
      keywords: [
        "orm",
        "prisma2",
        "prisma",
        "client",
        "query",
        "database",
        "sql",
        "postgres",
        "postgresql",
        "mysql",
        "sqlite",
        "mariadb",
        "mssql",
        "typescript",
        "query-builder"
      ],
      main: "index.js",
      browser: "index-browser.js",
      types: "index.d.ts",
      license: "Apache-2.0",
      engines: {
        node: ">=14.17"
      },
      homepage: "https://www.prisma.io",
      repository: {
        type: "git",
        url: "https://github.com/prisma/prisma.git",
        directory: "packages/client"
      },
      author: "Tim Suchanek <suchanek@prisma.io>",
      bugs: "https://github.com/prisma/prisma/issues",
      scripts: {
        dev: "DEV=true node -r esbuild-register helpers/build.ts",
        build: "node -r esbuild-register helpers/build.ts",
        test: "jest --silent",
        "test:e2e": "node -r esbuild-register tests/e2e/_utils/run.ts",
        "test:functional": "node -r esbuild-register helpers/functional-test/run-tests.ts",
        "test:memory": "node -r esbuild-register helpers/memory-tests.ts",
        "test:functional:code": "node -r esbuild-register helpers/functional-test/run-tests.ts --no-types",
        "test:functional:types": "node -r esbuild-register helpers/functional-test/run-tests.ts --types-only",
        "test-notypes": "jest --testPathIgnorePatterns src/__tests__/types/types.test.ts",
        generate: "node scripts/postinstall.js",
        postinstall: "node scripts/postinstall.js",
        prepublishOnly: "pnpm run build",
        "new-test": "NODE_OPTIONS='-r ts-node/register' yo ./helpers/generator-test/index.ts"
      },
      files: [
        "README.md",
        "runtime",
        "!runtime/*.map",
        "scripts",
        "generator-build",
        "edge.js",
        "edge.d.ts",
        "index.js",
        "index.d.ts",
        "index-browser.js",
        "extension.js",
        "extension.d.ts"
      ],
      devDependencies: {
        "@codspeed/benchmark.js-plugin": "1.1.0",
        "@faker-js/faker": "8.0.2",
        "@fast-check/jest": "1.6.2",
        "@jest/create-cache-key-function": "29.5.0",
        "@jest/globals": "29.5.0",
        "@jest/test-sequencer": "29.5.0",
        "@opentelemetry/api": "1.4.1",
        "@opentelemetry/context-async-hooks": "1.13.0",
        "@opentelemetry/instrumentation": "0.39.1",
        "@opentelemetry/resources": "1.13.0",
        "@opentelemetry/sdk-trace-base": "1.13.0",
        "@opentelemetry/semantic-conventions": "1.13.0",
        "@prisma/debug": "workspace:*",
        "@prisma/engines": "workspace:*",
        "@prisma/fetch-engine": "workspace:*",
        "@prisma/generator-helper": "workspace:*",
        "@prisma/get-platform": "workspace:*",
        "@prisma/instrumentation": "workspace:*",
        "@prisma/internals": "workspace:*",
        "@prisma/migrate": "workspace:*",
        "@prisma/mini-proxy": "0.7.0",
        "@swc-node/register": "1.6.5",
        "@swc/core": "1.3.64",
        "@swc/jest": "0.2.26",
        "@timsuchanek/copy": "1.4.5",
        "@types/debug": "4.1.8",
        "@types/fs-extra": "9.0.13",
        "@types/jest": "29.5.2",
        "@types/js-levenshtein": "1.1.1",
        "@types/mssql": "8.1.2",
        "@types/node": "18.16.16",
        "@types/pg": "8.10.2",
        "@types/yeoman-generator": "5.2.11",
        arg: "5.0.2",
        benchmark: "2.1.4",
        "ci-info": "3.8.0",
        "decimal.js": "10.4.3",
        "env-paths": "2.2.1",
        esbuild: "0.15.13",
        execa: "5.1.1",
        "expect-type": "0.16.0",
        "flat-map-polyfill": "0.3.8",
        "fs-extra": "11.1.1",
        "get-own-enumerable-property-symbols": "3.0.2",
        "get-stream": "6.0.1",
        globby: "11.1.0",
        "indent-string": "4.0.0",
        "is-obj": "2.0.0",
        "is-regexp": "2.1.0",
        jest: "29.5.0",
        "jest-junit": "16.0.0",
        "jest-serializer-ansi-escapes": "2.0.1",
        "jest-snapshot": "29.5.0",
        "js-levenshtein": "1.1.6",
        kleur: "4.1.5",
        klona: "2.0.6",
        "lz-string": "1.5.0",
        mariadb: "3.1.2",
        memfs: "3.5.3",
        mssql: "9.1.1",
        "new-github-issue-url": "0.2.1",
        "node-fetch": "2.6.11",
        "p-retry": "4.6.2",
        pg: "8.9.0",
        "pkg-up": "3.1.0",
        pluralize: "8.0.0",
        resolve: "1.22.2",
        rimraf: "3.0.2",
        "simple-statistics": "7.8.3",
        "sort-keys": "4.2.0",
        "source-map-support": "0.5.21",
        "sql-template-tag": "5.0.3",
        "stacktrace-parser": "0.1.10",
        "strip-ansi": "6.0.1",
        "strip-indent": "3.0.0",
        "ts-node": "10.9.1",
        "ts-pattern": "4.3.0",
        tsd: "0.28.1",
        typescript: "4.9.5",
        undici: "5.22.1",
        "yeoman-generator": "5.9.0",
        yo: "4.3.1",
        zx: "7.2.2"
      },
      peerDependencies: {
        prisma: "*"
      },
      peerDependenciesMeta: {
        prisma: {
          optional: true
        }
      },
      dependencies: {
        "@prisma/engines-version": "4.16.1-1.4bc8b6e1b66cb932731fb1bdbbc550d1e010de81"
      },
      sideEffects: false
    };
  }
});

// ../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/array-species-create.js
var require_array_species_create = __commonJS({
  "../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/array-species-create.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    exports.default = arraySpeciesCreate;
    function arraySpeciesCreate(originalArray, length) {
      var isArray = Array.isArray(originalArray);
      if (!isArray) {
        return Array(length);
      }
      var C = Object.getPrototypeOf(originalArray).constructor;
      if (C) {
        if ((typeof C === "undefined" ? "undefined" : _typeof(C)) === "object" || typeof C === "function") {
          C = C[Symbol.species.toString()];
          C = C !== null ? C : void 0;
        }
        if (C === void 0) {
          return Array(length);
        }
        if (typeof C !== "function") {
          throw TypeError("invalid constructor");
        }
        var result = new C(length);
        return result;
      }
    }
  }
});

// ../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flatten-into-array.js
var require_flatten_into_array = __commonJS({
  "../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flatten-into-array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = flattenIntoArray;
    function flattenIntoArray(target, source, start, depth, mapperFunction, thisArg) {
      var mapperFunctionProvied = mapperFunction !== void 0;
      var targetIndex = start;
      var sourceIndex = 0;
      var sourceLen = source.length;
      while (sourceIndex < sourceLen) {
        var p = sourceIndex;
        var exists4 = !!source[p];
        if (exists4 === true) {
          var element = source[p];
          if (element) {
            if (mapperFunctionProvied) {
              element = mapperFunction.call(thisArg, element, sourceIndex, target);
            }
            var spreadable = Object.getOwnPropertySymbols(element).includes(Symbol.isConcatSpreadable) || Array.isArray(element);
            if (spreadable === true && depth > 0) {
              var nextIndex = flattenIntoArray(target, element, targetIndex, depth - 1);
              targetIndex = nextIndex;
            } else {
              if (!Number.isSafeInteger(targetIndex)) {
                throw TypeError();
              }
              target[targetIndex] = element;
            }
          }
        }
        targetIndex += 1;
        sourceIndex += 1;
      }
      return targetIndex;
    }
  }
});

// ../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flatten.js
var require_flatten = __commonJS({
  "../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flatten.js"() {
    "use strict";
    var _arraySpeciesCreate = require_array_species_create();
    var _arraySpeciesCreate2 = _interopRequireDefault(_arraySpeciesCreate);
    var _flattenIntoArray = require_flatten_into_array();
    var _flattenIntoArray2 = _interopRequireDefault(_flattenIntoArray);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    if (!Object.prototype.hasOwnProperty.call(Array.prototype, "flatten")) {
      Array.prototype.flatten = function flatten(depth) {
        var o = Object(this);
        var a = (0, _arraySpeciesCreate2.default)(o, this.length);
        var depthNum = depth !== void 0 ? Number(depth) : Infinity;
        (0, _flattenIntoArray2.default)(a, o, 0, depthNum);
        return a.filter(function(e) {
          return e !== void 0;
        });
      };
    }
  }
});

// ../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flat-map.js
var require_flat_map = __commonJS({
  "../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/flat-map.js"() {
    "use strict";
    var _flattenIntoArray = require_flatten_into_array();
    var _flattenIntoArray2 = _interopRequireDefault(_flattenIntoArray);
    var _arraySpeciesCreate = require_array_species_create();
    var _arraySpeciesCreate2 = _interopRequireDefault(_arraySpeciesCreate);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    if (!Object.prototype.hasOwnProperty.call(Array.prototype, "flatMap")) {
      Array.prototype.flatMap = function flatMap(callbackFn, thisArg) {
        var o = Object(this);
        if (!callbackFn || typeof callbackFn.call !== "function") {
          throw TypeError("callbackFn must be callable.");
        }
        var t = thisArg !== void 0 ? thisArg : void 0;
        var a = (0, _arraySpeciesCreate2.default)(o, o.length);
        (0, _flattenIntoArray2.default)(
          a,
          o,
          0,
          1,
          callbackFn,
          t
        );
        return a.filter(function(x) {
          return x !== void 0;
        }, a);
      };
    }
  }
});

// src/generation/ts-builders/KeyType.ts
var KeyType_exports = {};
__export(KeyType_exports, {
  KeyType: () => KeyType,
  keyType: () => keyType
});
function keyType(baseType, key) {
  return new KeyType(baseType, key);
}
var KeyType;
var init_KeyType = __esm({
  "src/generation/ts-builders/KeyType.ts"() {
    "use strict";
    init_TypeBuilder();
    KeyType = class extends TypeBuilder {
      constructor(baseType, key) {
        super();
        this.baseType = baseType;
        this.key = key;
      }
      write(writer) {
        this.baseType.writeIndexed(writer);
        writer.write("[").write(`"${this.key}"`).write("]");
      }
    };
  }
});

// src/generation/ts-builders/TypeBuilder.ts
var TypeBuilder;
var init_TypeBuilder = __esm({
  "src/generation/ts-builders/TypeBuilder.ts"() {
    "use strict";
    TypeBuilder = class {
      constructor() {
        this.needsParenthesisWhenIndexed = false;
      }
      subKey(key) {
        const { KeyType: KeyType2 } = (init_KeyType(), __toCommonJS(KeyType_exports));
        return new KeyType2(this, key);
      }
      writeIndexed(writer) {
        if (this.needsParenthesisWhenIndexed) {
          writer.write("(");
        }
        writer.write(this);
        if (this.needsParenthesisWhenIndexed) {
          writer.write(")");
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/ci-info@3.8.0/node_modules/ci-info/vendors.json
var require_vendors = __commonJS({
  "../../node_modules/.pnpm/ci-info@3.8.0/node_modules/ci-info/vendors.json"(exports, module2) {
    module2.exports = [
      {
        name: "Appcircle",
        constant: "APPCIRCLE",
        env: "AC_APPCIRCLE"
      },
      {
        name: "AppVeyor",
        constant: "APPVEYOR",
        env: "APPVEYOR",
        pr: "APPVEYOR_PULL_REQUEST_NUMBER"
      },
      {
        name: "AWS CodeBuild",
        constant: "CODEBUILD",
        env: "CODEBUILD_BUILD_ARN"
      },
      {
        name: "Azure Pipelines",
        constant: "AZURE_PIPELINES",
        env: "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",
        pr: "SYSTEM_PULLREQUEST_PULLREQUESTID"
      },
      {
        name: "Bamboo",
        constant: "BAMBOO",
        env: "bamboo_planKey"
      },
      {
        name: "Bitbucket Pipelines",
        constant: "BITBUCKET",
        env: "BITBUCKET_COMMIT",
        pr: "BITBUCKET_PR_ID"
      },
      {
        name: "Bitrise",
        constant: "BITRISE",
        env: "BITRISE_IO",
        pr: "BITRISE_PULL_REQUEST"
      },
      {
        name: "Buddy",
        constant: "BUDDY",
        env: "BUDDY_WORKSPACE_ID",
        pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
      },
      {
        name: "Buildkite",
        constant: "BUILDKITE",
        env: "BUILDKITE",
        pr: {
          env: "BUILDKITE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "CircleCI",
        constant: "CIRCLE",
        env: "CIRCLECI",
        pr: "CIRCLE_PULL_REQUEST"
      },
      {
        name: "Cirrus CI",
        constant: "CIRRUS",
        env: "CIRRUS_CI",
        pr: "CIRRUS_PR"
      },
      {
        name: "Codefresh",
        constant: "CODEFRESH",
        env: "CF_BUILD_ID",
        pr: {
          any: [
            "CF_PULL_REQUEST_NUMBER",
            "CF_PULL_REQUEST_ID"
          ]
        }
      },
      {
        name: "Codemagic",
        constant: "CODEMAGIC",
        env: "CM_BUILD_ID",
        pr: "CM_PULL_REQUEST"
      },
      {
        name: "Codeship",
        constant: "CODESHIP",
        env: {
          CI_NAME: "codeship"
        }
      },
      {
        name: "Drone",
        constant: "DRONE",
        env: "DRONE",
        pr: {
          DRONE_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "dsari",
        constant: "DSARI",
        env: "DSARI"
      },
      {
        name: "Expo Application Services",
        constant: "EAS",
        env: "EAS_BUILD"
      },
      {
        name: "Gerrit",
        constant: "GERRIT",
        env: "GERRIT_PROJECT"
      },
      {
        name: "GitHub Actions",
        constant: "GITHUB_ACTIONS",
        env: "GITHUB_ACTIONS",
        pr: {
          GITHUB_EVENT_NAME: "pull_request"
        }
      },
      {
        name: "GitLab CI",
        constant: "GITLAB",
        env: "GITLAB_CI",
        pr: "CI_MERGE_REQUEST_ID"
      },
      {
        name: "GoCD",
        constant: "GOCD",
        env: "GO_PIPELINE_LABEL"
      },
      {
        name: "Google Cloud Build",
        constant: "GOOGLE_CLOUD_BUILD",
        env: "BUILDER_OUTPUT"
      },
      {
        name: "Harness CI",
        constant: "HARNESS",
        env: "HARNESS_BUILD_ID"
      },
      {
        name: "Heroku",
        constant: "HEROKU",
        env: {
          env: "NODE",
          includes: "/app/.heroku/node/bin/node"
        }
      },
      {
        name: "Hudson",
        constant: "HUDSON",
        env: "HUDSON_URL"
      },
      {
        name: "Jenkins",
        constant: "JENKINS",
        env: [
          "JENKINS_URL",
          "BUILD_ID"
        ],
        pr: {
          any: [
            "ghprbPullId",
            "CHANGE_ID"
          ]
        }
      },
      {
        name: "LayerCI",
        constant: "LAYERCI",
        env: "LAYERCI",
        pr: "LAYERCI_PULL_REQUEST"
      },
      {
        name: "Magnum CI",
        constant: "MAGNUM",
        env: "MAGNUM"
      },
      {
        name: "Netlify CI",
        constant: "NETLIFY",
        env: "NETLIFY",
        pr: {
          env: "PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Nevercode",
        constant: "NEVERCODE",
        env: "NEVERCODE",
        pr: {
          env: "NEVERCODE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "ReleaseHub",
        constant: "RELEASEHUB",
        env: "RELEASE_BUILD_ID"
      },
      {
        name: "Render",
        constant: "RENDER",
        env: "RENDER",
        pr: {
          IS_PULL_REQUEST: "true"
        }
      },
      {
        name: "Sail CI",
        constant: "SAIL",
        env: "SAILCI",
        pr: "SAIL_PULL_REQUEST_NUMBER"
      },
      {
        name: "Screwdriver",
        constant: "SCREWDRIVER",
        env: "SCREWDRIVER",
        pr: {
          env: "SD_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Semaphore",
        constant: "SEMAPHORE",
        env: "SEMAPHORE",
        pr: "PULL_REQUEST_NUMBER"
      },
      {
        name: "Shippable",
        constant: "SHIPPABLE",
        env: "SHIPPABLE",
        pr: {
          IS_PULL_REQUEST: "true"
        }
      },
      {
        name: "Solano CI",
        constant: "SOLANO",
        env: "TDDIUM",
        pr: "TDDIUM_PR_ID"
      },
      {
        name: "Sourcehut",
        constant: "SOURCEHUT",
        env: {
          CI_NAME: "sourcehut"
        }
      },
      {
        name: "Strider CD",
        constant: "STRIDER",
        env: "STRIDER"
      },
      {
        name: "TaskCluster",
        constant: "TASKCLUSTER",
        env: [
          "TASK_ID",
          "RUN_ID"
        ]
      },
      {
        name: "TeamCity",
        constant: "TEAMCITY",
        env: "TEAMCITY_VERSION"
      },
      {
        name: "Travis CI",
        constant: "TRAVIS",
        env: "TRAVIS",
        pr: {
          env: "TRAVIS_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Vercel",
        constant: "VERCEL",
        env: {
          any: [
            "NOW_BUILDER",
            "VERCEL"
          ]
        }
      },
      {
        name: "Visual Studio App Center",
        constant: "APPCENTER",
        env: "APPCENTER_BUILD_ID"
      },
      {
        name: "Woodpecker",
        constant: "WOODPECKER",
        env: {
          CI: "woodpecker"
        },
        pr: {
          CI_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "Xcode Cloud",
        constant: "XCODE_CLOUD",
        env: "CI_XCODE_PROJECT",
        pr: "CI_PULL_REQUEST_NUMBER"
      },
      {
        name: "Xcode Server",
        constant: "XCODE_SERVER",
        env: "XCS"
      }
    ];
  }
});

// ../../node_modules/.pnpm/ci-info@3.8.0/node_modules/ci-info/index.js
var require_ci_info = __commonJS({
  "../../node_modules/.pnpm/ci-info@3.8.0/node_modules/ci-info/index.js"(exports) {
    "use strict";
    var vendors = require_vendors();
    var env = process.env;
    Object.defineProperty(exports, "_vendors", {
      value: vendors.map(function(v) {
        return v.constant;
      })
    });
    exports.name = null;
    exports.isPR = null;
    vendors.forEach(function(vendor) {
      const envs = Array.isArray(vendor.env) ? vendor.env : [vendor.env];
      const isCI = envs.every(function(obj) {
        return checkEnv(obj);
      });
      exports[vendor.constant] = isCI;
      if (!isCI) {
        return;
      }
      exports.name = vendor.name;
      switch (typeof vendor.pr) {
        case "string":
          exports.isPR = !!env[vendor.pr];
          break;
        case "object":
          if ("env" in vendor.pr) {
            exports.isPR = vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne;
          } else if ("any" in vendor.pr) {
            exports.isPR = vendor.pr.any.some(function(key) {
              return !!env[key];
            });
          } else {
            exports.isPR = checkEnv(vendor.pr);
          }
          break;
        default:
          exports.isPR = null;
      }
    });
    exports.isCI = !!(env.CI !== "false" && (env.BUILD_ID || env.BUILD_NUMBER || env.CI || env.CI_APP_ID || env.CI_BUILD_ID || env.CI_BUILD_NUMBER || env.CI_NAME || env.CONTINUOUS_INTEGRATION || env.RUN_ID || exports.name || false));
    function checkEnv(obj) {
      if (typeof obj === "string")
        return !!env[obj];
      if ("env" in obj) {
        return env[obj.env] && env[obj.env].includes(obj.includes);
      }
      if ("any" in obj) {
        return obj.any.some(function(k) {
          return !!env[k];
        });
      }
      return Object.keys(obj).every(function(k) {
        return env[k] === obj[k];
      });
    }
  }
});

// ../../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "../../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js"(exports, module2) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// src/generation/generator.ts
var generator_exports = {};
__export(generator_exports, {
  dmmfToTypes: () => dmmfToTypes,
  externalToInternalDmmf: () => externalToInternalDmmf
});
module.exports = __toCommonJS(generator_exports);

// ../debug/src/index.ts
var import_debug = __toESM(require_src());
var MAX_LOGS = 100;
var debugArgsHistory = [];
if (typeof process !== "undefined" && typeof process.stderr?.write !== "function") {
  import_debug.default.log = console.debug ?? console.log;
}
function debugCall(namespace) {
  const debugNamespace = (0, import_debug.default)(namespace);
  const call = Object.assign((...args) => {
    debugNamespace.log = call.log;
    if (args.length !== 0) {
      debugArgsHistory.push([namespace, ...args]);
    }
    if (debugArgsHistory.length > MAX_LOGS) {
      debugArgsHistory.shift();
    }
    return debugNamespace("", ...args);
  }, debugNamespace);
  return call;
}
var Debug = Object.assign(debugCall, import_debug.default);
var src_default = Debug;

// src/generation/generator.ts
var import_engines_version = __toESM(require_engines_version());

// ../generator-helper/src/dmmf.ts
var DMMF;
((DMMF2) => {
  let ModelAction;
  ((ModelAction2) => {
    ModelAction2["findUnique"] = "findUnique";
    ModelAction2["findUniqueOrThrow"] = "findUniqueOrThrow";
    ModelAction2["findFirst"] = "findFirst";
    ModelAction2["findFirstOrThrow"] = "findFirstOrThrow";
    ModelAction2["findMany"] = "findMany";
    ModelAction2["create"] = "create";
    ModelAction2["createMany"] = "createMany";
    ModelAction2["update"] = "update";
    ModelAction2["updateMany"] = "updateMany";
    ModelAction2["upsert"] = "upsert";
    ModelAction2["delete"] = "delete";
    ModelAction2["deleteMany"] = "deleteMany";
    ModelAction2["groupBy"] = "groupBy";
    ModelAction2["count"] = "count";
    ModelAction2["aggregate"] = "aggregate";
    ModelAction2["findRaw"] = "findRaw";
    ModelAction2["aggregateRaw"] = "aggregateRaw";
  })(ModelAction = DMMF2.ModelAction || (DMMF2.ModelAction = {}));
})(DMMF || (DMMF = {}));

// ../generator-helper/src/byline.ts
var import_stream = __toESM(require("stream"));
var import_util = __toESM(require("util"));
function byline(readStream, options2) {
  return createStream(readStream, options2);
}
function createStream(readStream, options2) {
  if (readStream) {
    return createLineStream(readStream, options2);
  } else {
    return new LineStream(options2);
  }
}
function createLineStream(readStream, options2) {
  if (!readStream) {
    throw new Error("expected readStream");
  }
  if (!readStream.readable) {
    throw new Error("readStream must be readable");
  }
  const ls = new LineStream(options2);
  readStream.pipe(ls);
  return ls;
}
function LineStream(options2) {
  import_stream.default.Transform.call(this, options2);
  options2 = options2 || {};
  this._readableState.objectMode = true;
  this._lineBuffer = [];
  this._keepEmptyLines = options2.keepEmptyLines || false;
  this._lastChunkEndedWithCR = false;
  this.on("pipe", function(src) {
    if (!this.encoding) {
      if (src instanceof import_stream.default.Readable) {
        this.encoding = src._readableState.encoding;
      }
    }
  });
}
import_util.default.inherits(LineStream, import_stream.default.Transform);
LineStream.prototype._transform = function(chunk, encoding, done) {
  encoding = encoding || "utf8";
  if (Buffer.isBuffer(chunk)) {
    if (encoding == "buffer") {
      chunk = chunk.toString();
      encoding = "utf8";
    } else {
      chunk = chunk.toString(encoding);
    }
  }
  this._chunkEncoding = encoding;
  const lines = chunk.split(/\r\n|\r|\n/g);
  if (this._lastChunkEndedWithCR && chunk[0] == "\n") {
    lines.shift();
  }
  if (this._lineBuffer.length > 0) {
    this._lineBuffer[this._lineBuffer.length - 1] += lines[0];
    lines.shift();
  }
  this._lastChunkEndedWithCR = chunk[chunk.length - 1] == "\r";
  this._lineBuffer = this._lineBuffer.concat(lines);
  this._pushBuffer(encoding, 1, done);
};
LineStream.prototype._pushBuffer = function(encoding, keep, done) {
  while (this._lineBuffer.length > keep) {
    const line = this._lineBuffer.shift();
    if (this._keepEmptyLines || line.length > 0) {
      if (!this.push(this._reencode(line, encoding))) {
        const self = this;
        setImmediate(function() {
          self._pushBuffer(encoding, keep, done);
        });
        return;
      }
    }
  }
  done();
};
LineStream.prototype._flush = function(done) {
  this._pushBuffer(this._chunkEncoding, 0, done);
};
LineStream.prototype._reencode = function(line, chunkEncoding) {
  if (this.encoding && this.encoding != chunkEncoding) {
    return Buffer.from(line, chunkEncoding).toString(this.encoding);
  } else if (this.encoding) {
    return line;
  } else {
    return Buffer.from(line, chunkEncoding);
  }
};

// ../generator-helper/src/generatorHandler.ts
function generatorHandler(handler) {
  byline(process.stdin).on("data", async (line) => {
    const json = JSON.parse(String(line));
    if (json.method === "generate" && json.params) {
      try {
        const result = await handler.onGenerate(json.params);
        respond({
          jsonrpc: "2.0",
          result,
          id: json.id
        });
      } catch (_e) {
        const e = _e;
        respond({
          jsonrpc: "2.0",
          error: {
            code: -32e3,
            message: e.message,
            data: {
              stack: e.stack
            }
          },
          id: json.id
        });
      }
    }
    if (json.method === "getManifest") {
      if (handler.onManifest) {
        try {
          const manifest = handler.onManifest(json.params);
          respond({
            jsonrpc: "2.0",
            result: {
              manifest
            },
            id: json.id
          });
        } catch (_e) {
          const e = _e;
          respond({
            jsonrpc: "2.0",
            error: {
              code: -32e3,
              message: e.message,
              data: {
                stack: e.stack
              }
            },
            id: json.id
          });
        }
      } else {
        respond({
          jsonrpc: "2.0",
          result: {
            manifest: null
          },
          id: json.id
        });
      }
    }
  });
  process.stdin.resume();
}
function respond(response) {
  console.error(JSON.stringify(response));
}

// ../../node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);

// ../internals/src/utils/getEnvPaths.ts
var import_find_up = __toESM(require_find_up());
var import_fs3 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));

// ../internals/src/cli/getSchema.ts
var import_execa = __toESM(require_execa());
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_read_pkg_up = __toESM(require_read_pkg_up());
var import_util2 = require("util");
var exists = (0, import_util2.promisify)(import_fs.default.exists);
function getSchemaPathFromPackageJsonSync(cwd) {
  const pkgJson = import_read_pkg_up.default.sync({ cwd });
  const schemaPathFromPkgJson = pkgJson?.packageJson?.prisma?.schema;
  if (!schemaPathFromPkgJson || !pkgJson) {
    return null;
  }
  if (typeof schemaPathFromPkgJson !== "string") {
    throw new Error(
      `Provided schema path \`${schemaPathFromPkgJson}\` from \`${import_path.default.relative(
        cwd,
        pkgJson.path
      )}\` must be of type string`
    );
  }
  const absoluteSchemaPath = import_path.default.isAbsolute(schemaPathFromPkgJson) ? schemaPathFromPkgJson : import_path.default.resolve(import_path.default.dirname(pkgJson.path), schemaPathFromPkgJson);
  if (import_fs.default.existsSync(absoluteSchemaPath) === false) {
    throw new Error(
      `Provided schema path \`${import_path.default.relative(cwd, absoluteSchemaPath)}\` from \`${import_path.default.relative(
        cwd,
        pkgJson.path
      )}\` doesn't exist.`
    );
  }
  return absoluteSchemaPath;
}

// ../internals/src/utils/tryLoadEnvs.ts
var import_dotenv = __toESM(require_main2());
var import_fs2 = __toESM(require("fs"));
var debug2 = src_default("prisma:tryLoadEnv");
function exists2(p) {
  return Boolean(p && import_fs2.default.existsSync(p));
}

// ../internals/src/utils/getEnvPaths.ts
var debug3 = src_default("prisma:loadEnv");
function getEnvPaths(schemaPath2, opts = { cwd: process.cwd() }) {
  const rootEnvPath = getProjectRootEnvPath({ cwd: opts.cwd }) ?? null;
  const schemaEnvPathFromArgs = schemaPathToEnvPath(schemaPath2);
  const schemaEnvPathFromPkgJson = schemaPathToEnvPath(readSchemaPathFromPkgJson());
  const schemaEnvPaths = [
    schemaEnvPathFromArgs,
    schemaEnvPathFromPkgJson,
    "./prisma/.env",
    "./.env"
  ];
  const schemaEnvPath = schemaEnvPaths.find(exists2);
  return { rootEnvPath, schemaEnvPath };
}
function readSchemaPathFromPkgJson() {
  try {
    return getSchemaPathFromPackageJsonSync(process.cwd());
  } catch {
    return null;
  }
}
function getProjectRootEnvPath(opts) {
  const pkgJsonPath = import_find_up.default.sync((dir) => {
    const pkgPath = import_path2.default.join(dir, "package.json");
    if (import_find_up.default.sync.exists(pkgPath)) {
      try {
        const pkg2 = JSON.parse(import_fs3.default.readFileSync(pkgPath, "utf8"));
        if (pkg2["name"] !== ".prisma/client") {
          debug3(`project root found at ${pkgPath}`);
          return pkgPath;
        }
      } catch (e) {
        debug3(`skipping package.json at ${pkgPath}`);
      }
    }
    return void 0;
  }, opts);
  if (!pkgJsonPath) {
    return null;
  }
  const candidate = import_path2.default.join(import_path2.default.dirname(pkgJsonPath), ".env");
  if (!import_fs3.default.existsSync(candidate)) {
    return null;
  }
  return candidate;
}
function schemaPathToEnvPath(schemaPath2) {
  if (!schemaPath2)
    return null;
  return import_path2.default.join(import_path2.default.dirname(schemaPath2), ".env");
}

// ../internals/src/client/getClientEngineType.ts
var DEFAULT_CLIENT_ENGINE_TYPE = "library" /* Library */;
function getClientEngineType(generatorConfig) {
  const engineTypeFromEnvVar = getEngineTypeFromEnvVar();
  if (engineTypeFromEnvVar)
    return engineTypeFromEnvVar;
  if (generatorConfig?.config.engineType === "library" /* Library */) {
    return "library" /* Library */;
  } else if (generatorConfig?.config.engineType === "binary" /* Binary */) {
    return "binary" /* Binary */;
  } else {
    return DEFAULT_CLIENT_ENGINE_TYPE;
  }
}
function getEngineTypeFromEnvVar() {
  const engineType = process.env.PRISMA_CLIENT_ENGINE_TYPE;
  if (engineType === "library" /* Library */) {
    return "library" /* Library */;
  } else if (engineType === "binary" /* Binary */) {
    return "binary" /* Binary */;
  } else {
    return void 0;
  }
}

// ../internals/src/utils/parseEnvValue.ts
function parseEnvValue(object) {
  if (object.fromEnvVar && object.fromEnvVar != "null") {
    const value = process.env[object.fromEnvVar];
    if (!value) {
      throw new Error(
        `Attempted to load provider value using \`env(${object.fromEnvVar})\` but it was not present. Please ensure that ${dim(
          object.fromEnvVar
        )} is present in your Environment Variables`
      );
    }
    return value;
  }
  return object.value;
}

// ../internals/src/client/getQueryEngineProtocol.ts
function getQueryEngineProtocol(generatorConfig) {
  const fromEnv = process.env.PRISMA_ENGINE_PROTOCOL;
  if (fromEnv === "json" || fromEnv == "graphql") {
    return fromEnv;
  }
  if (fromEnv !== void 0) {
    throw new Error(`Invalid PRISMA_ENGINE_PROTOCOL env variable value. Expected 'graphql' or 'json', got '${fromEnv}'`);
  }
  if (generatorConfig?.previewFeatures?.includes("jsonProtocol")) {
    return "json";
  }
  return "graphql";
}

// ../get-platform/src/getNodeAPIName.ts
var NODE_API_QUERY_ENGINE_URL_BASE = "libquery_engine";
function getNodeAPIName(platform, type) {
  const isUrl = type === "url";
  if (platform.includes("windows")) {
    return isUrl ? `query_engine.dll.node` : `query_engine-${platform}.dll.node`;
  } else if (platform.includes("darwin")) {
    return isUrl ? `${NODE_API_QUERY_ENGINE_URL_BASE}.dylib.node` : `${NODE_API_QUERY_ENGINE_URL_BASE}-${platform}.dylib.node`;
  } else {
    return isUrl ? `${NODE_API_QUERY_ENGINE_URL_BASE}.so.node` : `${NODE_API_QUERY_ENGINE_URL_BASE}-${platform}.so.node`;
  }
}

// ../fetch-engine/src/utils.ts
var import_find_cache_dir = __toESM(require_find_cache_dir());
var import_fs4 = __toESM(require("fs"));
var debug4 = src_default("prisma:cache-dir");
async function overwriteFile(sourcePath, targetPath) {
  await removeFileIfExists(targetPath);
  await import_fs4.default.promises.copyFile(sourcePath, targetPath);
}
async function removeFileIfExists(filePath) {
  try {
    await import_fs4.default.promises.unlink(filePath);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
}

// ../internals/src/utils/assertNever.ts
function assertNever(arg, errorMessage) {
  throw new Error(errorMessage);
}

// ../internals/src/utils/path.ts
var import_path3 = __toESM(require("path"));
function pathToPosix(filePath) {
  if (import_path3.default.sep === import_path3.default.posix.sep) {
    return filePath;
  }
  return filePath.split(import_path3.default.sep).join(import_path3.default.posix.sep);
}

// ../internals/src/utils/setClassName.ts
function setClassName(classObject, name) {
  Object.defineProperty(classObject, "name", {
    value: name,
    configurable: true
  });
}

// src/runtime/externalToInternalDmmf.ts
var import_pluralize = __toESM(require_pluralize());

// ../../node_modules/.pnpm/decimal.js@10.4.3/node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  precision: 20,
  rounding: 4,
  modulo: 1,
  toExpNeg: -7,
  toExpPos: 21,
  minE: -EXP_LIMIT,
  maxE: EXP_LIMIT,
  crypto: false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n--;
    if (n < 0)
      n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0)
        ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, "lt");
}
function min() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);

// src/runtime/utils/common.ts
var import_indent_string = __toESM(require_indent_string());
var import_js_levenshtein = __toESM(require_js_levenshtein());

// src/runtime/object-enums.ts
var objectEnumNames = ["JsonNullValueInput", "NullableJsonNullValueInput", "JsonNullValueFilter"];
var secret = Symbol();
var representations = /* @__PURE__ */ new WeakMap();
var ObjectEnumValue = class {
  constructor(arg) {
    if (arg === secret) {
      representations.set(this, `Prisma.${this._getName()}`);
    } else {
      representations.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
    }
  }
  _getName() {
    return this.constructor.name;
  }
  toString() {
    return representations.get(this);
  }
};
var NullTypesEnumValue = class extends ObjectEnumValue {
  _getNamespace() {
    return "NullTypes";
  }
};
var DbNull = class extends NullTypesEnumValue {
};
setClassName2(DbNull, "DbNull");
var JsonNull = class extends NullTypesEnumValue {
};
setClassName2(JsonNull, "JsonNull");
var AnyNull = class extends NullTypesEnumValue {
};
setClassName2(AnyNull, "AnyNull");
var objectEnumValues = {
  classes: {
    DbNull,
    JsonNull,
    AnyNull
  },
  instances: {
    DbNull: new DbNull(secret),
    JsonNull: new JsonNull(secret),
    AnyNull: new AnyNull(secret)
  }
};
function setClassName2(classObject, name) {
  Object.defineProperty(classObject, "name", {
    value: name,
    configurable: true
  });
}

// src/runtime/utils/common.ts
var keyBy = (collection, prop) => {
  const acc = {};
  for (const obj of collection) {
    const key = obj[prop];
    acc[key] = obj;
  }
  return acc;
};
var ScalarTypeTable = {
  String: true,
  Int: true,
  Float: true,
  Boolean: true,
  Long: true,
  DateTime: true,
  ID: true,
  UUID: true,
  Json: true,
  Bytes: true,
  Decimal: true,
  BigInt: true
};
var needNamespace = {
  Json: "JsonValue",
  Decimal: "Decimal"
};
function needsNamespace(fieldType, dmmf2) {
  if (typeof fieldType === "string") {
    if (dmmf2.datamodelEnumMap[fieldType]) {
      return false;
    }
    if (GraphQLScalarToJSTypeTable[fieldType]) {
      return Boolean(needNamespace[fieldType]);
    }
  }
  return true;
}
var GraphQLScalarToJSTypeTable = {
  String: "string",
  Int: "number",
  Float: "number",
  Boolean: "boolean",
  Long: "number",
  DateTime: ["Date", "string"],
  ID: "string",
  UUID: "string",
  Json: "JsonValue",
  Bytes: "Buffer",
  Decimal: ["Decimal", "DecimalJsLike", "number", "string"],
  BigInt: ["bigint", "number"]
};
var JSOutputTypeToInputType = {
  JsonValue: "InputJsonValue"
};
function argIsInputType(arg) {
  if (typeof arg === "string") {
    return false;
  }
  return true;
}
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function lowerCase(name) {
  return name.substring(0, 1).toLowerCase() + name.substring(1);
}
function isSchemaEnum(type) {
  return typeof type === "object" && type !== null && typeof type.name === "string" && Array.isArray(type.values);
}

// src/runtime/externalToInternalDmmf.ts
function externalToInternalDmmf(document2) {
  return {
    ...document2,
    mappings: getMappings(document2.mappings, document2.datamodel)
  };
}
function getMappings(mappings, datamodel2) {
  const modelOperations = mappings.modelOperations.filter((mapping) => {
    const model = datamodel2.models.find((m) => m.name === mapping.model);
    if (!model) {
      throw new Error(`Mapping without model ${mapping.model}`);
    }
    return model.fields.some((f) => f.kind !== "object");
  }).map((mapping) => ({
    model: mapping.model,
    plural: (0, import_pluralize.default)(lowerCase(mapping.model)),
    findUnique: mapping.findUnique || mapping.findSingle,
    findUniqueOrThrow: mapping.findUniqueOrThrow,
    findFirst: mapping.findFirst,
    findFirstOrThrow: mapping.findFirstOrThrow,
    findMany: mapping.findMany,
    create: mapping.createOne || mapping.createSingle || mapping.create,
    createMany: mapping.createMany,
    delete: mapping.deleteOne || mapping.deleteSingle || mapping.delete,
    update: mapping.updateOne || mapping.updateSingle || mapping.update,
    deleteMany: mapping.deleteMany,
    updateMany: mapping.updateMany,
    upsert: mapping.upsertOne || mapping.upsertSingle || mapping.upsert,
    aggregate: mapping.aggregate,
    groupBy: mapping.groupBy,
    findRaw: mapping.findRaw,
    aggregateRaw: mapping.aggregateRaw
  }));
  return {
    modelOperations,
    otherOperations: mappings.otherOperations
  };
}

// src/generation/generateClient.ts
var import_env_paths = __toESM(require_env_paths());
var import_fs6 = __toESM(require("fs"));
var import_fs_extra = __toESM(require_lib4());
var import_path7 = __toESM(require("path"));
var import_pkg_up = __toESM(require_pkg_up());
var import_util3 = require("util");
var import_package = __toESM(require_package3());

// src/generation/getDMMF.ts
function getPrismaClientDMMF(dmmf2) {
  return externalToInternalDmmf(dmmf2);
}

// ../../node_modules/.pnpm/flat-map-polyfill@0.3.8/node_modules/flat-map-polyfill/dist/cjs/index.js
require_flatten();
require_flat_map();

// src/generation/TSClient/Args.ts
var import_indent_string4 = __toESM(require_indent_string());

// src/generation/utils.ts
var import_indent_string2 = __toESM(require_indent_string());
function getSelectName(modelName) {
  return `${modelName}Select`;
}
function getAggregateName(modelName) {
  return `Aggregate${capitalize2(modelName)}`;
}
function getGroupByName(modelName) {
  return `${capitalize2(modelName)}GroupByOutputType`;
}
function getAvgAggregateName(modelName) {
  return `${capitalize2(modelName)}AvgAggregateOutputType`;
}
function getSumAggregateName(modelName) {
  return `${capitalize2(modelName)}SumAggregateOutputType`;
}
function getMinAggregateName(modelName) {
  return `${capitalize2(modelName)}MinAggregateOutputType`;
}
function getMaxAggregateName(modelName) {
  return `${capitalize2(modelName)}MaxAggregateOutputType`;
}
function getCountAggregateInputName(modelName) {
  return `${capitalize2(modelName)}CountAggregateInputType`;
}
function getCountAggregateOutputName(modelName) {
  return `${capitalize2(modelName)}CountAggregateOutputType`;
}
function getAggregateInputType(aggregateOutputType) {
  return aggregateOutputType.replace(/OutputType$/, "InputType");
}
function getGroupByArgsName(modelName) {
  return `${capitalize2(modelName)}GroupByArgs`;
}
function getGroupByPayloadName(modelName) {
  return `Get${capitalize2(modelName)}GroupByPayload`;
}
function getAggregateArgsName(modelName) {
  return `${capitalize2(modelName)}AggregateArgs`;
}
function getAggregateGetName(modelName) {
  return `Get${capitalize2(modelName)}AggregateType`;
}
function getIncludeName(modelName) {
  return `${modelName}Include`;
}
function getFieldArgName(field, modelName) {
  if (field.args.length) {
    return getModelFieldArgsName(field, modelName);
  }
  return getArgName(field.outputType.type.name);
}
function getModelFieldArgsName(field, modelName) {
  return `${modelName}$${field.name}Args`;
}
function getArgName(name) {
  return `${name}Args`;
}
function getModelArgName(modelName, action) {
  if (!action) {
    return `${modelName}Args`;
  }
  switch (action) {
    case DMMF.ModelAction.findMany:
      return `${modelName}FindManyArgs`;
    case DMMF.ModelAction.findUnique:
      return `${modelName}FindUniqueArgs`;
    case DMMF.ModelAction.findUniqueOrThrow:
      return `${modelName}FindUniqueOrThrowArgs`;
    case DMMF.ModelAction.findFirst:
      return `${modelName}FindFirstArgs`;
    case DMMF.ModelAction.findFirstOrThrow:
      return `${modelName}FindFirstOrThrowArgs`;
    case DMMF.ModelAction.upsert:
      return `${modelName}UpsertArgs`;
    case DMMF.ModelAction.update:
      return `${modelName}UpdateArgs`;
    case DMMF.ModelAction.updateMany:
      return `${modelName}UpdateManyArgs`;
    case DMMF.ModelAction.delete:
      return `${modelName}DeleteArgs`;
    case DMMF.ModelAction.create:
      return `${modelName}CreateArgs`;
    case DMMF.ModelAction.createMany:
      return `${modelName}CreateManyArgs`;
    case DMMF.ModelAction.deleteMany:
      return `${modelName}DeleteManyArgs`;
    case DMMF.ModelAction.groupBy:
      return getGroupByArgsName(modelName);
    case DMMF.ModelAction.aggregate:
      return getAggregateArgsName(modelName);
    case DMMF.ModelAction.count:
      return `${modelName}CountArgs`;
    case DMMF.ModelAction.findRaw:
      return `${modelName}FindRawArgs`;
    case DMMF.ModelAction.aggregateRaw:
      return `${modelName}AggregateRawArgs`;
    default:
      assertNever(action, "Unknown action");
  }
}
function getFieldRefsTypeName(name) {
  return `${name}FieldRefs`;
}
function getType(name, isList, isOptional) {
  return name + (isList ? "[]" : "") + (isOptional ? " | null" : "");
}
function getReturnType({
  name,
  actionName,
  renderPromise = true,
  hideCondition = false,
  isField = false,
  isChaining = false
}) {
  if (actionName === "count") {
    return `Promise<number>`;
  }
  if (actionName === "aggregate")
    return `Promise<${getAggregateGetName(name)}<T>>`;
  if (actionName === "findRaw" || actionName === "aggregateRaw") {
    return `Prisma.PrismaPromise<JsonObject>`;
  }
  const isList = actionName === DMMF.ModelAction.findMany;
  if (actionName === "deleteMany" || actionName === "updateMany" || actionName === "createMany") {
    return `Prisma.PrismaPromise<BatchPayload>`;
  }
  if (isList || hideCondition) {
    const promiseOpen = renderPromise ? "Prisma.PrismaPromise<" : "";
    const promiseClose = renderPromise ? ">" : "";
    return `${promiseOpen}$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>${isChaining ? "| Null" : ""}${promiseClose}`;
  }
  if (actionName === "findFirstOrThrow" || actionName === "findUniqueOrThrow") {
    return `Prisma__${name}Client<${getType(
      `$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>`,
      isList
    )}, never, ExtArgs>`;
  }
  if (actionName === "findFirst" || actionName === "findUnique") {
    if (isField) {
      return `Prisma__${name}Client<${getType(
        `$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>`,
        isList
      )} | Null, never, ExtArgs>`;
    }
    return `HasReject<GlobalRejectSettings, LocalRejectSettings, '${actionName}', '${name}'> extends True ? Prisma__${name}Client<${getType(
      `$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>`,
      isList
    )}, never, ExtArgs> : Prisma__${name}Client<${getType(
      `$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>`,
      isList
    )} | null, null, ExtArgs>`;
  }
  return `Prisma__${name}Client<${getType(
    `$Types.GetResult<${name}Payload<ExtArgs>, T, '${actionName}', never>`,
    isList
  )}, never, ExtArgs>`;
}
function capitalize2(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function getRefAllowedTypeName(type) {
  let typeName;
  if (typeof type.type === "string") {
    typeName = type.type;
  } else {
    typeName = type.type.name;
  }
  if (type.isList) {
    typeName += "[]";
  }
  return `'${typeName}'`;
}

// src/generation/TSClient/constants.ts
var TAB_SIZE = 2;

// src/generation/TSClient/helpers.ts
var import_pluralize2 = __toESM(require_pluralize());

// src/generation/TSClient/jsdoc.ts
var Docs = {
  cursor: `{@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}`,
  pagination: `{@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}`,
  aggregations: `{@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}`,
  distinct: `{@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}`,
  sorting: `{@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}`
};
function addLinkToDocs(comment, docs) {
  return `${Docs[docs]}

${comment}`;
}
function getDeprecationString(since, replacement) {
  return `@deprecated since ${since} please use \`${replacement}\``;
}
var undefinedNote = `Note, that providing \`undefined\` is treated as the value not being there.
Read more here: https://pris.ly/d/null-undefined`;
var JSDocFields = {
  take: (singular, plural) => addLinkToDocs(`Take \`\xB1n\` ${plural} from the position of the cursor.`, "pagination"),
  skip: (singular, plural) => addLinkToDocs(`Skip the first \`n\` ${plural}.`, "pagination"),
  _count: (singular, plural) => addLinkToDocs(`Count returned ${plural}`, "aggregations"),
  _avg: () => addLinkToDocs(`Select which fields to average`, "aggregations"),
  _sum: () => addLinkToDocs(`Select which fields to sum`, "aggregations"),
  _min: () => addLinkToDocs(`Select which fields to find the minimum value`, "aggregations"),
  _max: () => addLinkToDocs(`Select which fields to find the maximum value`, "aggregations"),
  count: () => getDeprecationString("2.23.0", "_count"),
  avg: () => getDeprecationString("2.23.0", "_avg"),
  sum: () => getDeprecationString("2.23.0", "_sum"),
  min: () => getDeprecationString("2.23.0", "_min"),
  max: () => getDeprecationString("2.23.0", "_max"),
  distinct: (singular, plural) => addLinkToDocs(`Filter by unique combinations of ${plural}.`, "distinct"),
  orderBy: (singular, plural) => addLinkToDocs(`Determine the order of ${plural} to fetch.`, "sorting")
};
var JSDocs = {
  groupBy: {
    body: (ctx) => `Group by ${ctx.singular}.
${undefinedNote}
@param {${getGroupByArgsName(ctx.model.name)}} args - Group by arguments.
@example
// Group by city, order by createdAt, get count
const result = await prisma.user.groupBy({
  by: ['city', 'createdAt'],
  orderBy: {
    createdAt: true
  },
  _count: {
    _all: true
  },
})
`,
    fields: {}
  },
  create: {
    body: (ctx) => `Create a ${ctx.singular}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to create a ${ctx.singular}.
@example
// Create one ${ctx.singular}
const ${ctx.singular} = await ${ctx.method}({
  data: {
    // ... data to create a ${ctx.singular}
  }
})
`,
    fields: {
      data: (singular) => `The data needed to create a ${singular}.`
    }
  },
  createMany: {
    body: (ctx) => `Create many ${ctx.plural}.
    @param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to create many ${ctx.plural}.
    @example
    // Create many ${ctx.plural}
    const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
      data: {
        // ... provide data here
      }
    })
    `,
    fields: {
      data: (singular, plural) => `The data used to create many ${plural}.`
    }
  },
  findUnique: {
    body: (ctx) => `Find zero or one ${ctx.singular} that matches the filter.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to find a ${ctx.singular}
@example
// Get one ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  }
})`,
    fields: {
      where: (singular) => `Filter, which ${singular} to fetch.`
    }
  },
  findUniqueOrThrow: {
    body: (ctx) => `Find one ${ctx.singular} that matches the filter or throw an error  with \`error.code='P2025'\` 
    if no matches were found.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to find a ${ctx.singular}
@example
// Get one ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  }
})`,
    fields: {
      where: (singular) => `Filter, which ${singular} to fetch.`
    }
  },
  findFirst: {
    body: (ctx) => `Find the first ${ctx.singular} that matches the filter.
${undefinedNote}
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to find a ${ctx.singular}
@example
// Get one ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  }
})`,
    fields: {
      where: (singular) => `Filter, which ${singular} to fetch.`,
      orderBy: JSDocFields.orderBy,
      cursor: (singular, plural) => addLinkToDocs(`Sets the position for searching for ${plural}.`, "cursor"),
      take: JSDocFields.take,
      skip: JSDocFields.skip,
      distinct: JSDocFields.distinct
    }
  },
  findFirstOrThrow: {
    body: (ctx) => `Find the first ${ctx.singular} that matches the filter or
throw \`NotFoundError\` if no matches were found.
${undefinedNote}
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to find a ${ctx.singular}
@example
// Get one ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  }
})`,
    fields: {
      where: (singular) => `Filter, which ${singular} to fetch.`,
      orderBy: JSDocFields.orderBy,
      cursor: (singular, plural) => addLinkToDocs(`Sets the position for searching for ${plural}.`, "cursor"),
      take: JSDocFields.take,
      skip: JSDocFields.skip,
      distinct: JSDocFields.distinct
    }
  },
  findMany: {
    body: (ctx) => {
      const onlySelect = ctx.firstScalar ? `
// Only select the \`${ctx.firstScalar.name}\`
const ${lowerCase(ctx.mapping.model)}With${capitalize(ctx.firstScalar.name)}Only = await ${ctx.method}({ select: { ${ctx.firstScalar.name}: true } })` : "";
      return `Find zero or more ${ctx.plural} that matches the filter.
${undefinedNote}
@param {${getModelArgName(ctx.model.name, ctx.action)}=} args - Arguments to filter and select certain fields only.
@example
// Get all ${ctx.plural}
const ${ctx.mapping.plural} = await ${ctx.method}()

// Get first 10 ${ctx.plural}
const ${ctx.mapping.plural} = await ${ctx.method}({ take: 10 })
${onlySelect}
`;
    },
    fields: {
      where: (singular, plural) => `Filter, which ${plural} to fetch.`,
      orderBy: JSDocFields.orderBy,
      skip: JSDocFields.skip,
      cursor: (singular, plural) => addLinkToDocs(`Sets the position for listing ${plural}.`, "cursor"),
      take: JSDocFields.take
    }
  },
  update: {
    body: (ctx) => `Update one ${ctx.singular}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to update one ${ctx.singular}.
@example
// Update one ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  },
  data: {
    // ... provide data here
  }
})
`,
    fields: {
      data: (singular) => `The data needed to update a ${singular}.`,
      where: (singular) => `Choose, which ${singular} to update.`
    }
  },
  upsert: {
    body: (ctx) => `Create or update one ${ctx.singular}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to update or create a ${ctx.singular}.
@example
// Update or create a ${ctx.singular}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  create: {
    // ... data to create a ${ctx.singular}
  },
  update: {
    // ... in case it already exists, update
  },
  where: {
    // ... the filter for the ${ctx.singular} we want to update
  }
})`,
    fields: {
      where: (singular) => `The filter to search for the ${singular} to update in case it exists.`,
      create: (singular) => `In case the ${singular} found by the \`where\` argument doesn't exist, create a new ${singular} with this data.`,
      update: (singular) => `In case the ${singular} was found with the provided \`where\` argument, update it with this data.`
    }
  },
  delete: {
    body: (ctx) => `Delete a ${ctx.singular}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to delete one ${ctx.singular}.
@example
// Delete one ${ctx.singular}
const ${ctx.singular} = await ${ctx.method}({
  where: {
    // ... filter to delete one ${ctx.singular}
  }
})
`,
    fields: {
      where: (singular) => `Filter which ${singular} to delete.`
    }
  },
  aggregate: {
    body: (ctx) => `Allows you to perform aggregations operations on a ${ctx.singular}.
${undefinedNote}
@param {${getModelArgName(
      ctx.model.name,
      ctx.action
    )}} args - Select which aggregations you would like to apply and on what fields.
@example
// Ordered by age ascending
// Where email contains prisma.io
// Limited to the 10 users
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  orderBy: {
    age: "asc",
  },
  take: 10,
})`,
    fields: {
      where: (singular) => `Filter which ${singular} to aggregate.`,
      orderBy: JSDocFields.orderBy,
      cursor: () => addLinkToDocs(`Sets the start position`, "cursor"),
      take: JSDocFields.take,
      skip: JSDocFields.skip,
      _count: JSDocFields._count,
      _avg: JSDocFields._avg,
      _sum: JSDocFields._sum,
      _min: JSDocFields._min,
      _max: JSDocFields._max,
      count: JSDocFields.count,
      avg: JSDocFields.avg,
      sum: JSDocFields.sum,
      min: JSDocFields.min,
      max: JSDocFields.max
    }
  },
  count: {
    body: (ctx) => `Count the number of ${ctx.plural}.
${undefinedNote}
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to filter ${ctx.plural} to count.
@example
// Count the number of ${ctx.plural}
const count = await ${ctx.method}({
  where: {
    // ... the filter for the ${ctx.plural} we want to count
  }
})`,
    fields: {}
  },
  updateMany: {
    body: (ctx) => `Update zero or more ${ctx.plural}.
${undefinedNote}
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to update one or more rows.
@example
// Update many ${ctx.plural}
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  where: {
    // ... provide filter here
  },
  data: {
    // ... provide data here
  }
})
`,
    fields: {
      data: (singular, plural) => `The data used to update ${plural}.`,
      where: (singular, plural) => `Filter which ${plural} to update`
    }
  },
  deleteMany: {
    body: (ctx) => `Delete zero or more ${ctx.plural}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Arguments to filter ${ctx.plural} to delete.
@example
// Delete a few ${ctx.plural}
const { count } = await ${ctx.method}({
  where: {
    // ... provide filter here
  }
})
`,
    fields: {
      where: (singular, plural) => `Filter which ${plural} to delete`
    }
  },
  aggregateRaw: {
    body: (ctx) => `Perform aggregation operations on a ${ctx.singular}.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Select which aggregations you would like to apply.
@example
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  pipeline: [
    { $match: { status: "registered" } },
    { $group: { _id: "$country", total: { $sum: 1 } } }
  ]
})`,
    fields: {
      pipeline: () => "An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.",
      options: () => "Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}."
    }
  },
  findRaw: {
    body: (ctx) => `Find zero or more ${ctx.plural} that matches the filter.
@param {${getModelArgName(ctx.model.name, ctx.action)}} args - Select which filters you would like to apply.
@example
const ${lowerCase(ctx.mapping.model)} = await ${ctx.method}({
  filter: { age: { $gt: 25 } } 
})`,
    fields: {
      filter: () => "The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.",
      options: () => "Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}."
    }
  }
};

// src/generation/TSClient/helpers.ts
function getMethodJSDocBody(action, mapping, model) {
  const ctx = {
    singular: capitalize(mapping.model),
    plural: capitalize(mapping.plural),
    firstScalar: model.fields.find((f) => f.kind === "scalar"),
    method: `prisma.${lowerCase(mapping.model)}.${action}`,
    action,
    mapping,
    model
  };
  const jsdoc = JSDocs[action]?.body(ctx);
  return jsdoc ? jsdoc : "";
}
function getMethodJSDoc(action, mapping, model) {
  return wrapComment(getMethodJSDocBody(action, mapping, model));
}
function getGenericMethod(name, actionName) {
  if (actionName === "count") {
    return "";
  }
  if (actionName === "aggregate") {
    return `<T extends ${getAggregateArgsName(name)}>`;
  }
  if (actionName === "findRaw" || actionName === "aggregateRaw") {
    return "";
  }
  if (actionName === "findFirst" || actionName === "findUnique") {
    return `<T extends ${getModelArgName(
      name,
      actionName
    )}<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>`;
  }
  const modelArgName = getModelArgName(name, actionName);
  if (!modelArgName) {
    console.log({ name, actionName });
  }
  return `<T extends ${modelArgName}<ExtArgs>>`;
}
function getArgs(modelName, actionName) {
  if (actionName === "count") {
    return `args?: Omit<${getModelArgName(modelName, DMMF.ModelAction.findMany)}, 'select' | 'include'>`;
  }
  if (actionName === "aggregate") {
    return `args: Subset<T, ${getAggregateArgsName(modelName)}>`;
  }
  if (actionName === "findRaw" || actionName === "aggregateRaw") {
    return `args?: ${getModelArgName(modelName, actionName)}`;
  }
  return `args${actionName === DMMF.ModelAction.findMany || actionName === DMMF.ModelAction.findFirst || actionName === DMMF.ModelAction.deleteMany || actionName === DMMF.ModelAction.createMany || actionName === DMMF.ModelAction.findUniqueOrThrow || actionName === DMMF.ModelAction.findFirstOrThrow ? "?" : ""}: SelectSubset<T, ${getModelArgName(modelName, actionName)}<ExtArgs>>`;
}
function wrapComment(str) {
  return `/**
${str.split("\n").map((l) => " * " + l).join("\n")}
**/`;
}
function getArgFieldJSDoc(type, action, field) {
  if (!field || !action || !type)
    return;
  const fieldName = typeof field === "string" ? field : field.name;
  if (JSDocs[action] && JSDocs[action]?.fields[fieldName]) {
    const singular = type.name;
    const plural = (0, import_pluralize2.default)(type.name);
    const comment = JSDocs[action]?.fields[fieldName](singular, plural);
    return comment;
  }
  return void 0;
}
function escapeJson(str) {
  return str.replace(/\\n/g, "\\\\n").replace(/\\r/g, "\\\\r").replace(/\\t/g, "\\\\t");
}

// src/generation/TSClient/Input.ts
var import_indent_string3 = __toESM(require_indent_string());

// src/runtime/utils/uniqueBy.ts
function uniqueBy(arr, callee) {
  const result = {};
  for (const value of arr) {
    const hash = callee(value);
    if (!result[hash]) {
      result[hash] = value;
    }
  }
  return Object.values(result);
}

// src/generation/ts-builders/ArraySpread.ts
init_TypeBuilder();
var ArraySpread = class extends TypeBuilder {
  constructor(innerType) {
    super();
    this.innerType = innerType;
  }
  write(writer) {
    writer.write("[...").write(this.innerType).write("]");
  }
};
function arraySpread(innerType) {
  return new ArraySpread(innerType);
}

// src/generation/ts-builders/ArrayType.ts
init_TypeBuilder();
var ArrayType = class extends TypeBuilder {
  constructor(elementType) {
    super();
    this.elementType = elementType;
  }
  write(writer) {
    this.elementType.writeIndexed(writer);
    writer.write("[]");
  }
};
function array(elementType) {
  return new ArrayType(elementType);
}

// src/generation/ts-builders/DocComment.ts
var DocComment = class {
  constructor(startingText) {
    this.lines = [];
    if (startingText) {
      this.addText(startingText);
    }
  }
  addText(text) {
    this.lines.push(...text.split("\n"));
    return this;
  }
  write(writer) {
    writer.writeLine("/**");
    for (const line of this.lines) {
      writer.writeLine(` * ${line}`);
    }
    writer.writeLine(" */");
    return writer;
  }
};
function docComment(firstParameter) {
  if (typeof firstParameter === "string" || typeof firstParameter === "undefined") {
    return new DocComment(firstParameter);
  }
  return docCommentTag(firstParameter);
}
function docCommentTag(strings) {
  const docComment2 = new DocComment();
  const lines = trimEmptyLines(strings.join("").split("\n"));
  if (lines.length === 0) {
    return docComment2;
  }
  const indent14 = getIndent(lines[0]);
  for (const line of lines) {
    docComment2.addText(line.slice(indent14));
  }
  return docComment2;
}
function trimEmptyLines(lines) {
  const firstLine = findFirstNonEmptyLine(lines);
  const lastLine = findLastNonEmptyLine(lines);
  if (firstLine === -1 || lastLine === -1) {
    return [];
  }
  return lines.slice(firstLine, lastLine + 1);
}
function findFirstNonEmptyLine(lines) {
  return lines.findIndex((line) => !isEmptyLine(line));
}
function findLastNonEmptyLine(lines) {
  let i = lines.length - 1;
  while (i > 0 && isEmptyLine(lines[i])) {
    i--;
  }
  return i;
}
function isEmptyLine(line) {
  return line.trim().length === 0;
}
function getIndent(line) {
  let indent14 = 0;
  while (line[indent14] === " ") {
    indent14++;
  }
  return indent14;
}

// src/generation/ts-builders/Export.ts
var Export = class {
  constructor(declaration) {
    this.declaration = declaration;
  }
  setDocComment(docComment2) {
    this.docComment = docComment2;
    return this;
  }
  write(writer) {
    if (this.docComment) {
      writer.write(this.docComment);
    }
    writer.write("export ").write(this.declaration);
  }
};
function moduleExport(declaration) {
  return new Export(declaration);
}

// src/generation/ts-builders/PrimitiveType.ts
init_TypeBuilder();
var PrimitiveType = class extends TypeBuilder {
  constructor(name) {
    super();
    this.name = name;
  }
  write(writer) {
    writer.write(this.name);
  }
};
var stringType = new PrimitiveType("string");
var numberType = new PrimitiveType("number");
var booleanType = new PrimitiveType("boolean");
var nullType = new PrimitiveType("null");
var undefinedType = new PrimitiveType("undefined");
var bigintType = new PrimitiveType("bigint");
var unknownType = new PrimitiveType("unknown");
var anyType = new PrimitiveType("any");
var voidType = new PrimitiveType("void");
var thisType = new PrimitiveType("this");

// src/generation/ts-builders/FunctionType.ts
init_TypeBuilder();
var FunctionType = class extends TypeBuilder {
  constructor() {
    super(...arguments);
    this.needsParenthesisWhenIndexed = true;
    this.returnType = voidType;
    this.parameters = [];
    this.genericParameters = [];
  }
  setReturnType(returnType) {
    this.returnType = returnType;
    return this;
  }
  addParameter(param) {
    this.parameters.push(param);
    return this;
  }
  addGenericParameter(param) {
    this.genericParameters.push(param);
    return this;
  }
  write(writer) {
    if (this.genericParameters.length > 0) {
      writer.write("<").writeJoined(", ", this.genericParameters).write(">");
    }
    writer.write("(").writeJoined(", ", this.parameters).write(") => ").write(this.returnType);
  }
};
function functionType() {
  return new FunctionType();
}

// src/generation/ts-builders/NamedType.ts
init_TypeBuilder();
var NamedType = class extends TypeBuilder {
  constructor(name) {
    super();
    this.name = name;
    this.genericArguments = [];
  }
  addGenericArgument(type) {
    this.genericArguments.push(type);
    return this;
  }
  write(writer) {
    writer.write(this.name);
    if (this.genericArguments.length > 0) {
      writer.write("<").writeJoined(", ", this.genericArguments).write(">");
    }
  }
};
function namedType(name) {
  return new NamedType(name);
}

// src/generation/ts-builders/GenericParameter.ts
var GenericParameter = class {
  constructor(name) {
    this.name = name;
  }
  extends(type) {
    this.extendedType = type;
    return this;
  }
  default(type) {
    this.defaultType = type;
    return this;
  }
  toArgument() {
    return new NamedType(this.name);
  }
  write(writer) {
    writer.write(this.name);
    if (this.extendedType) {
      writer.write(" extends ").write(this.extendedType);
    }
    if (this.defaultType) {
      writer.write(" = ").write(this.defaultType);
    }
  }
};
function genericParameter(name) {
  return new GenericParameter(name);
}

// src/generation/ts-builders/helpers.ts
function omit(type, keyType2) {
  return namedType("Omit").addGenericArgument(type).addGenericArgument(keyType2);
}
function promise(resultType) {
  return new NamedType("Promise").addGenericArgument(resultType);
}
function prismaPromise(resultType) {
  return new NamedType("Prisma.PrismaPromise").addGenericArgument(resultType);
}

// src/generation/ts-builders/Method.ts
var Method = class {
  constructor(name) {
    this.name = name;
    this.returnType = voidType;
    this.parameters = [];
    this.genericParameters = [];
  }
  setDocComment(docComment2) {
    this.docComment = docComment2;
    return this;
  }
  setReturnType(returnType) {
    this.returnType = returnType;
    return this;
  }
  addParameter(param) {
    this.parameters.push(param);
    return this;
  }
  addGenericParameter(param) {
    this.genericParameters.push(param);
    return this;
  }
  write(writer) {
    if (this.docComment) {
      writer.write(this.docComment);
    }
    writer.write(this.name);
    if (this.genericParameters.length > 0) {
      writer.write("<").writeJoined(", ", this.genericParameters).write(">");
    }
    writer.write("(");
    if (this.parameters.length > 0) {
      writer.writeJoined(", ", this.parameters);
    }
    writer.write(")").write(": ").write(this.returnType);
  }
};
function method(name) {
  return new Method(name);
}

// src/generation/ts-builders/ObjectType.ts
init_TypeBuilder();
var ObjectType = class extends TypeBuilder {
  constructor() {
    super(...arguments);
    this.needsParenthesisWhenIndexed = true;
    this.items = [];
    this.inline = false;
  }
  add(item) {
    this.items.push(item);
    return this;
  }
  addMultiple(items) {
    for (const item of items) {
      this.add(item);
    }
    return this;
  }
  formatInline() {
    this.inline = true;
    return this;
  }
  write(writer) {
    if (this.items.length === 0) {
      writer.write("{}");
    } else if (this.inline) {
      this.writeInline(writer);
    } else {
      this.writeMultiline(writer);
    }
  }
  writeMultiline(writer) {
    writer.writeLine("{").withIndent(() => {
      for (const item of this.items) {
        writer.writeLine(item);
      }
    }).write("}");
  }
  writeInline(writer) {
    writer.write("{ ").writeJoined(", ", this.items).write(" }");
  }
};
function objectType() {
  return new ObjectType();
}

// src/generation/ts-builders/Parameter.ts
var Parameter = class {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.isOptional = false;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
  write(writer) {
    writer.write(this.name);
    if (this.isOptional) {
      writer.write("?");
    }
    writer.write(": ").write(this.type);
  }
};
function parameter(name, type) {
  return new Parameter(name, type);
}

// src/generation/ts-builders/Property.ts
var Property = class {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.isOptional = false;
    this.isReadonly = false;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
  readonly() {
    this.isReadonly = true;
    return this;
  }
  setDocComment(docComment2) {
    this.docComment = docComment2;
    return this;
  }
  write(writer) {
    if (this.docComment) {
      writer.write(this.docComment);
    }
    if (this.isReadonly) {
      writer.write("readonly ");
    }
    writer.write(this.name);
    if (this.isOptional) {
      writer.write("?");
    }
    writer.write(": ").write(this.type);
  }
};
function property(name, type) {
  return new Property(name, type);
}

// src/generation/ts-builders/Writer.ts
var INDENT_SIZE = 2;
var Writer = class {
  constructor(startingIndent = 0, context) {
    this.context = context;
    this.lines = [];
    this.currentLine = "";
    this.currentIndent = 0;
    this.currentIndent = startingIndent;
  }
  write(value) {
    if (typeof value === "string") {
      this.currentLine += value;
    } else {
      value.write(this);
    }
    return this;
  }
  writeJoined(separator, values) {
    const last = values.length - 1;
    for (let i = 0; i < values.length; i++) {
      this.write(values[i]);
      if (i !== last) {
        this.write(separator);
      }
    }
    return this;
  }
  writeLine(line) {
    return this.write(line).newLine();
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine());
    this.currentLine = "";
    this.marginSymbol = void 0;
    const afterNextNewLineCallback = this.afterNextNewLineCallback;
    this.afterNextNewLineCallback = void 0;
    afterNextNewLineCallback?.();
    return this;
  }
  withIndent(callback) {
    this.indent();
    callback(this);
    this.unindent();
    return this;
  }
  afterNextNewline(callback) {
    this.afterNextNewLineCallback = callback;
    return this;
  }
  indent() {
    this.currentIndent++;
    return this;
  }
  unindent() {
    if (this.currentIndent > 0) {
      this.currentIndent--;
    }
    return this;
  }
  addMarginSymbol(symbol) {
    this.marginSymbol = symbol;
    return this;
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join("\n");
  }
  getCurrentLineLength() {
    return this.currentLine.length;
  }
  indentedCurrentLine() {
    const line = this.currentLine.padStart(this.currentLine.length + INDENT_SIZE * this.currentIndent);
    if (this.marginSymbol) {
      return this.marginSymbol + line.slice(1);
    }
    return line;
  }
};

// src/generation/ts-builders/stringify.ts
function stringify(builder, { indentLevel = 0, newLine = "none" } = {}) {
  const str = new Writer(indentLevel).write(builder).toString();
  switch (newLine) {
    case "none":
      return str;
    case "leading":
      return "\n" + str;
    case "trailing":
      return str + "\n";
    case "both":
      return "\n" + str + "\n";
    default:
      assertNever(newLine, "Unexpected value");
  }
}

// src/generation/ts-builders/StringLiteralType.ts
init_TypeBuilder();
var StringLiteralType = class extends TypeBuilder {
  constructor(content) {
    super();
    this.content = content;
  }
  write(writer) {
    writer.write(JSON.stringify(this.content));
  }
};
function stringLiteral(content) {
  return new StringLiteralType(content);
}

// src/generation/ts-builders/TypeDeclaration.ts
var TypeDeclaration = class {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.genericParameters = [];
  }
  addGenericParameter(param) {
    this.genericParameters.push(param);
    return this;
  }
  setDocComment(docComment2) {
    this.docComment = docComment2;
    return this;
  }
  write(writer) {
    if (this.docComment) {
      writer.write(this.docComment);
    }
    writer.write("type ").write(this.name);
    if (this.genericParameters.length > 0) {
      writer.write("<").writeJoined(", ", this.genericParameters).write(">");
    }
    writer.write(" = ").write(this.type);
  }
};
function typeDeclaration(name, type) {
  return new TypeDeclaration(name, type);
}

// src/generation/ts-builders/UnionType.ts
init_TypeBuilder();
var UnionType = class extends TypeBuilder {
  constructor(firstType) {
    super();
    this.needsParenthesisWhenIndexed = true;
    this.variants = [firstType];
  }
  addVariant(variant) {
    this.variants.push(variant);
    return this;
  }
  addVariants(variants) {
    for (const variant of variants) {
      this.addVariant(variant);
    }
    return this;
  }
  write(writer) {
    writer.writeJoined(" | ", this.variants);
  }
  mapVariants(callback) {
    return unionType(this.variants.map((v) => callback(v)));
  }
};
function unionType(types) {
  if (Array.isArray(types)) {
    if (types.length === 0) {
      throw new TypeError("Union types array can not be empty");
    }
    const union = new UnionType(types[0]);
    for (let i = 1; i < types.length; i++) {
      union.addVariant(types[i]);
    }
    return union;
  }
  return new UnionType(types);
}

// src/generation/TSClient/Input.ts
var InputField = class {
  constructor(field, noEnumerable = false, genericsInfo, source) {
    this.field = field;
    this.noEnumerable = noEnumerable;
    this.genericsInfo = genericsInfo;
    this.source = source;
  }
  toTS() {
    const property2 = buildInputField(this.field, this.noEnumerable, this.genericsInfo, this.source);
    return stringify(property2);
  }
};
function buildInputField(field, noEnumerable = false, genericsInfo, source) {
  const tsType = buildAllFieldTypes(field.inputTypes, noEnumerable, genericsInfo, source);
  const tsProperty = property(field.name, tsType);
  if (!field.isRequired) {
    tsProperty.optional();
  }
  const docComment2 = docComment();
  if (field.comment) {
    docComment2.addText(field.comment);
  }
  if (field.deprecation) {
    docComment2.addText(`@deprecated since ${field.deprecation.sinceVersion}: ${field.deprecation.reason}`);
  }
  if (docComment2.lines.length > 0) {
    tsProperty.setDocComment(docComment2);
  }
  return tsProperty;
}
function buildSingleFieldType(t, noEnumerable = false, genericsInfo, source) {
  let type;
  if (typeof t.type === "string") {
    if (t.type === "Null") {
      return nullType;
    }
    const scalarType = GraphQLScalarToJSTypeTable[t.type];
    if (Array.isArray(scalarType)) {
      const union = unionType(scalarType.map(namedInputType));
      if (t.isList) {
        return union.mapVariants((variant) => wrapList(variant, noEnumerable));
      }
      return union;
    }
    type = namedInputType(scalarType ?? t.type);
  } else {
    type = namedInputType(t.type.name);
  }
  if (type.name.endsWith("Select") || type.name.endsWith("Include")) {
    type.addGenericArgument(namedType("ExtArgs"));
  }
  if (genericsInfo.needsGenericModelArg(t)) {
    if (source) {
      type.addGenericArgument(stringLiteral(source));
    } else {
      type.addGenericArgument(namedType("$PrismaModel"));
    }
  }
  if (t.isList) {
    return wrapList(type, noEnumerable);
  }
  return type;
}
function namedInputType(typeName) {
  return namedType(JSOutputTypeToInputType[typeName] ?? typeName);
}
function wrapList(type, noEnumerable) {
  return noEnumerable ? array(type) : namedType("Enumerable").addGenericArgument(type);
}
function buildAllFieldTypes(inputTypes, noEnumerable = false, genericsInfo, source) {
  const pairMap = /* @__PURE__ */ Object.create(null);
  const singularPairIndexes = /* @__PURE__ */ new Set();
  for (let i = 0; i < inputTypes.length; i++) {
    const inputType = inputTypes[i];
    if (argIsInputType(inputType.type)) {
      const { name } = inputType.type;
      if (typeof pairMap[name] === "number") {
        if (inputType.isList) {
          singularPairIndexes.add(pairMap[name]);
        } else {
          singularPairIndexes.add(i);
        }
      } else {
        pairMap[name] = i;
      }
    }
  }
  const filteredInputTypes = inputTypes.filter((t, i) => !singularPairIndexes.has(i));
  const inputObjectTypes = filteredInputTypes.filter((t) => t.location === "inputObjectTypes");
  const otherTypes = filteredInputTypes.filter((t) => t.location !== "inputObjectTypes");
  const tsInputObjectTypes = inputObjectTypes.map(
    (type) => buildSingleFieldType(type, noEnumerable, genericsInfo, source)
  );
  const tsOtherTypes = otherTypes.map((type) => buildSingleFieldType(type, noEnumerable, genericsInfo, source));
  if (tsOtherTypes.length === 0) {
    return xorTypes(tsInputObjectTypes);
  }
  if (tsInputObjectTypes.length === 0) {
    return unionType(tsOtherTypes);
  }
  return unionType(xorTypes(tsInputObjectTypes)).addVariants(tsOtherTypes);
}
function xorTypes(types) {
  return types.reduce((prev, curr) => namedType("XOR").addGenericArgument(prev).addGenericArgument(curr));
}
var InputType = class {
  constructor(type, genericsInfo) {
    this.type = type;
    this.genericsInfo = genericsInfo;
  }
  toTS() {
    const { type } = this;
    const source = type.meta?.source;
    const fields = uniqueBy(type.fields, (f) => f.name);
    const body = `{
${(0, import_indent_string3.default)(
      fields.map((arg) => {
        const noEnumerable = type.name.includes("Json") && type.name.includes("Filter") && arg.name === "path";
        return new InputField(arg, noEnumerable, this.genericsInfo, source).toTS();
      }).join("\n"),
      TAB_SIZE
    )}
}`;
    return `
export type ${this.getTypeName()} = ${wrapWithAtLeast(body, type)}`;
  }
  getTypeName() {
    if (this.genericsInfo.inputTypeNeedsGenericModelArg(this.type)) {
      return `${this.type.name}<$PrismaModel = never>`;
    }
    return this.type.name;
  }
};
function wrapWithAtLeast(body, input) {
  if (input.constraints?.fields && input.constraints.fields.length > 0) {
    const fields = input.constraints.fields.map((f) => `"${f}"`).join(" | ");
    return `Prisma.AtLeast<${body}, ${fields}>`;
  }
  return body;
}

// src/generation/TSClient/Args.ts
var ArgsType = class {
  constructor(args, type, genericsInfo, action) {
    this.args = args;
    this.type = type;
    this.genericsInfo = genericsInfo;
    this.action = action;
    this.generatedName = null;
    this.comment = null;
  }
  setGeneratedName(name) {
    this.generatedName = name;
    return this;
  }
  setComment(comment) {
    this.comment = comment;
    return this;
  }
  toTS() {
    const { action, args } = this;
    const { name } = this.type;
    for (const arg of args) {
      arg.comment = getArgFieldJSDoc(this.type, action, arg);
    }
    const selectName = getSelectName(name);
    const argsToGenerate = [
      {
        name: "select",
        isRequired: false,
        isNullable: true,
        inputTypes: [
          {
            type: selectName,
            location: "inputObjectTypes",
            isList: false
          },
          {
            type: "null",
            location: "scalar",
            isList: false
          }
        ],
        comment: `Select specific fields to fetch from the ${name}`
      }
    ];
    const hasRelationField = this.type.fields.some((f) => f.outputType.location === "outputObjectTypes");
    if (hasRelationField) {
      const includeName = getIncludeName(name);
      argsToGenerate.push({
        name: "include",
        isRequired: false,
        isNullable: true,
        inputTypes: [
          {
            type: includeName,
            location: "inputObjectTypes",
            isList: false
          },
          {
            type: "null",
            location: "scalar",
            isList: false
          }
        ],
        comment: `Choose, which related nodes to fetch as well.`
      });
    }
    argsToGenerate.push(...args);
    const generatedName = this.generatedName ?? getModelArgName(name, action);
    if (action === DMMF.ModelAction.findUnique || action === DMMF.ModelAction.findFirst) {
      return this.generateFindMethodArgs(action, name, argsToGenerate, generatedName);
    }
    return `
/**
 * ${this.getGeneratedComment()}
 */
export type ${generatedName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string4.default)(argsToGenerate.map((arg) => new InputField(arg, false, this.genericsInfo).toTS()).join("\n"), TAB_SIZE)}
}
`;
  }
  generateFindMethodArgs(action, name, argsToGenerate, modelArgName) {
    const baseTypeName = getBaseTypeName(name, action);
    const replacement = action === DMMF.ModelAction.findFirst ? DMMF.ModelAction.findFirstOrThrow : DMMF.ModelAction.findUniqueOrThrow;
    return `
/**
 * ${name} base type for ${action} actions
 */
export type ${baseTypeName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string4.default)(argsToGenerate.map((arg) => new InputField(arg, false, this.genericsInfo).toTS()).join("\n"), TAB_SIZE)}
}

/**
 * ${this.getGeneratedComment()}
 */
export interface ${modelArgName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ${baseTypeName}<ExtArgs> {
 /**
  * Throw an Error if query returns no results
  * @deprecated since 4.0.0: use \`${replacement}\` method instead
  */
  rejectOnNotFound?: RejectOnNotFound
}
      `;
  }
  getGeneratedComment() {
    return this.comment ?? `${this.type.name} ${this.action ?? "without action"}`;
  }
};
var MinimalArgsType = class {
  constructor(args, type, genericsInfo, action, generatedTypeName = getModelArgName(type.name, action)) {
    this.args = args;
    this.type = type;
    this.genericsInfo = genericsInfo;
    this.action = action;
    this.generatedTypeName = generatedTypeName;
  }
  toTS() {
    const { action, args } = this;
    const { name } = this.type;
    for (const arg of args) {
      arg.comment = getArgFieldJSDoc(this.type, action, arg);
    }
    return `
/**
 * ${name} ${action ? action : "without action"}
 */
export type ${this.generatedTypeName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string4.default)(
      args.map((arg) => {
        const noEnumerable = arg.inputTypes.some((input) => input.type === "Json") && arg.name === "pipeline";
        return new InputField(arg, noEnumerable, this.genericsInfo).toTS();
      }).join("\n"),
      TAB_SIZE
    )}
}
`;
  }
};
function getBaseTypeName(modelName, action) {
  switch (action) {
    case DMMF.ModelAction.findFirst:
      return `${modelName}FindFirstArgsBase`;
    case DMMF.ModelAction.findUnique:
      return `${modelName}FindUniqueArgsBase`;
  }
}

// src/generation/TSClient/Enum.ts
var import_indent_string5 = __toESM(require_indent_string());

// src/runtime/strictEnum.ts
var strictEnumNames = ["TransactionIsolationLevel"];

// src/generation/TSClient/Enum.ts
var Enum = class {
  constructor(type, useNamespace) {
    this.type = type;
    this.useNamespace = useNamespace;
  }
  isObjectEnum() {
    return this.useNamespace && objectEnumNames.includes(this.type.name);
  }
  isStrictEnum() {
    return this.useNamespace && strictEnumNames.includes(this.type.name);
  }
  toJS() {
    const { type } = this;
    const enumVariants = `{
${(0, import_indent_string5.default)(type.values.map((v) => `${v}: ${this.getValueJS(v)}`).join(",\n"), TAB_SIZE)}
}`;
    const enumBody = this.isStrictEnum() ? `makeStrictEnum(${enumVariants})` : enumVariants;
    return `exports.${this.useNamespace ? "Prisma." : ""}${type.name} = ${enumBody};`;
  }
  getValueJS(value) {
    return this.isObjectEnum() ? `Prisma.${value}` : `'${value}'`;
  }
  toTS() {
    const { type } = this;
    return `export const ${type.name}: {
${(0, import_indent_string5.default)(type.values.map((v) => `${v}: ${this.getValueTS(v)}`).join(",\n"), TAB_SIZE)}
};

export type ${type.name} = (typeof ${type.name})[keyof typeof ${type.name}]
`;
  }
  getValueTS(value) {
    return this.isObjectEnum() ? `typeof ${value}` : `'${value}'`;
  }
};

// src/generation/TSClient/Generatable.ts
function JS(gen, edge = false) {
  return gen.toJS?.(edge) ?? "";
}
function BrowserJS(gen) {
  return gen.toBrowserJS?.() ?? "";
}
function TS(gen, edge = false) {
  return gen.toTS(edge);
}

// src/generation/TSClient/Model.ts
var import_indent_string8 = __toESM(require_indent_string());

// ../../node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs
function klona(x) {
  if (typeof x !== "object")
    return x;
  var k, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    if (x.constructor !== Object && typeof x.constructor === "function") {
      tmp = new x.constructor();
      for (k in x) {
        if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
          tmp[k] = klona(x[k]);
        }
      }
    } else {
      tmp = {};
      for (k in x) {
        if (k === "__proto__") {
          Object.defineProperty(tmp, k, {
            value: klona(x[k]),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          tmp[k] = klona(x[k]);
        }
      }
    }
    return tmp;
  }
  if (str === "[object Array]") {
    k = x.length;
    for (tmp = Array(k); k--; ) {
      tmp[k] = klona(x[k]);
    }
    return tmp;
  }
  if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
    return tmp;
  }
  if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
    return tmp;
  }
  if (str === "[object Date]") {
    return new Date(+x);
  }
  if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
    tmp.lastIndex = x.lastIndex;
    return tmp;
  }
  if (str === "[object DataView]") {
    return new x.constructor(klona(x.buffer));
  }
  if (str === "[object ArrayBuffer]") {
    return x.slice(0);
  }
  if (str.slice(-6) === "Array]") {
    return new x.constructor(x);
  }
  return x;
}

// src/generation/TSClient/ModelFieldRefs.ts
var ModelFieldRefs = class {
  constructor(generator2, outputType) {
    this.generator = generator2;
    this.outputType = outputType;
  }
  toTS() {
    if (!this.generator?.previewFeatures.includes("fieldReference")) {
      return "";
    }
    const { name } = this.outputType;
    return `

/**
 * Fields of the ${name} model
 */ 
interface ${getFieldRefsTypeName(name)} {
${this.stringifyFields()}
}
    `;
  }
  stringifyFields() {
    const { name } = this.outputType;
    return this.outputType.fields.filter((field) => field.outputType.location !== "outputObjectTypes").map((field) => {
      const fieldOutput = field.outputType;
      const refTypeName = getRefAllowedTypeName(fieldOutput);
      return `  readonly ${field.name}: FieldRef<"${name}", ${refTypeName}>`;
    }).join("\n");
  }
};

// src/generation/TSClient/Output.ts
var import_indent_string6 = __toESM(require_indent_string());
function buildModelOutputProperty(field, dmmf2, useNamespace = false) {
  let fieldTypeName = GraphQLScalarToJSTypeTable[field.type] || field.type;
  if (Array.isArray(fieldTypeName)) {
    fieldTypeName = fieldTypeName[0];
  }
  if (useNamespace && needsNamespace(field.type, dmmf2)) {
    fieldTypeName = `Prisma.${fieldTypeName}`;
  }
  let fieldType;
  if (field.kind === "object") {
    const payloadType = namedType(`${fieldTypeName}Payload`);
    if (!dmmf2.typeMap[field.type]) {
      payloadType.addGenericArgument(namedType("ExtArgs"));
    }
    fieldType = payloadType;
  } else {
    fieldType = namedType(fieldTypeName);
  }
  if (field.isList) {
    fieldType = array(fieldType);
  } else if (!field.isRequired) {
    fieldType = unionType(fieldType).addVariant(nullType);
  }
  const property2 = property(field.name, fieldType);
  if (field.documentation) {
    property2.setDocComment(docComment(field.documentation));
  }
  return property2;
}
var OutputField = class {
  constructor(dmmf2, field, useNamespace = false) {
    this.dmmf = dmmf2;
    this.field = field;
    this.useNamespace = useNamespace;
  }
  toTS() {
    const { field, useNamespace } = this;
    let fieldType;
    if (field.outputType.location === "scalar") {
      fieldType = GraphQLScalarToJSTypeTable[field.outputType.type];
    } else if (field.outputType.location === "enumTypes") {
      if (isSchemaEnum(field.outputType.type)) {
        fieldType = field.outputType.type.name;
      }
    } else {
      fieldType = field.outputType.type.name;
    }
    if (Array.isArray(fieldType)) {
      fieldType = fieldType[0];
    }
    const arrayStr = field.outputType.isList ? `[]` : "";
    const nullableStr = field.isNullable && !field.outputType.isList ? " | null" : "";
    const namespaceStr = useNamespace && needsNamespace(field.outputType.type, this.dmmf) ? `Prisma.` : "";
    const deprecated = field.deprecation ? `@deprecated since ${field.deprecation.sinceVersion} because ${field.deprecation.reason}` : "";
    const jsdoc = deprecated ? wrapComment(deprecated) + "\n" : "";
    return `${jsdoc}${field.name}: ${namespaceStr}${fieldType}${arrayStr}${nullableStr}`;
  }
};
var OutputType = class {
  constructor(dmmf2, type) {
    this.dmmf = dmmf2;
    this.type = type;
    this.name = type.name;
    this.fields = type.fields;
  }
  toTS() {
    const { type } = this;
    return `
export type ${type.name} = {
${(0, import_indent_string6.default)(
      type.fields.map((field) => new OutputField(this.dmmf, { ...field, ...field.outputType }).toTS()).join("\n"),
      TAB_SIZE
    )}
}`;
  }
};

// src/generation/TSClient/SchemaOutput.ts
var import_indent_string7 = __toESM(require_indent_string());
var SchemaOutputField = class {
  constructor(field) {
    this.field = field;
  }
  toTS() {
    const { field } = this;
    let fieldType = typeof field.outputType.type === "string" ? GraphQLScalarToJSTypeTable[field.outputType.type] || field.outputType.type : field.outputType.type.name;
    if (Array.isArray(fieldType)) {
      fieldType = fieldType[0];
    }
    const arrayStr = field.outputType.isList ? `[]` : "";
    const nullableStr = field.isNullable ? " | null" : "";
    return `${field.name}: ${fieldType}${arrayStr}${nullableStr}`;
  }
};
var SchemaOutputType = class {
  constructor(type) {
    this.type = type;
    this.name = type.name;
    this.fields = type.fields;
  }
  toTS() {
    const { type } = this;
    return `
export type ${type.name} = {
${(0, import_indent_string7.default)(
      type.fields.map((field) => new SchemaOutputField({ ...field, ...field.outputType }).toTS()).join("\n"),
      TAB_SIZE
    )}
}`;
  }
};

// src/generation/TSClient/SelectInclude.ts
var extArgsParameter = genericParameter("ExtArgs").extends(namedType("$Extensions.Args")).default(namedType("$Extensions.DefaultArgs"));
function buildIncludeType({ modelName, dmmf: dmmf2, fields }) {
  const type = buildSelectOrIncludeObject(modelName, getIncludeFields(fields, dmmf2));
  return buildExport(getIncludeName(modelName), type);
}
function buildSelectType({ modelName, fields }) {
  const objectType2 = buildSelectOrIncludeObject(modelName, fields);
  const selectType = namedType("$Extensions.GetSelect").addGenericArgument(objectType2).addGenericArgument(extArgsParameter.toArgument().subKey("result").subKey(lowerCase(modelName)));
  return buildExport(getSelectName(modelName), selectType);
}
function buildScalarSelectType({ modelName, fields }) {
  const object = buildSelectOrIncludeObject(
    modelName,
    fields.filter((field) => field.outputType.location === "scalar" || field.outputType.location === "enumTypes")
  );
  return moduleExport(typeDeclaration(`${getSelectName(modelName)}Scalar`, object));
}
function buildSelectOrIncludeObject(modelName, fields) {
  const objectType2 = objectType();
  for (const field of fields) {
    const fieldType = unionType(booleanType);
    if (field.outputType.location === "outputObjectTypes") {
      const subSelectType = namedType(getFieldArgName(field, modelName));
      subSelectType.addGenericArgument(extArgsParameter.toArgument());
      fieldType.addVariant(subSelectType);
    }
    objectType2.add(property(field.name, fieldType).optional());
  }
  return objectType2;
}
function buildExport(typeName, type) {
  const declaration = typeDeclaration(typeName, type);
  return moduleExport(declaration.addGenericParameter(extArgsParameter));
}
function getIncludeFields(fields, dmmf2) {
  return fields.filter((field) => {
    if (field.outputType.location !== "outputObjectTypes") {
      return false;
    }
    const name = typeof field.outputType.type === "string" ? field.outputType.type : field.outputType.type.name;
    return !dmmf2.typeMap[name];
  });
}

// src/generation/TSClient/utils/getModelActions.ts
function getModelActions(dmmf2, name) {
  const mapping = dmmf2.mappingsMap[name] ?? { model: name, plural: `${name}s` };
  const mappingKeys = Object.keys(mapping).filter(
    (key) => key !== "model" && key !== "plural" && mapping[key]
  );
  if ("aggregate" in mapping) {
    mappingKeys.push("count");
  }
  return mappingKeys;
}

// src/generation/TSClient/Model.ts
var extArgsParam = genericParameter("ExtArgs").extends(namedType("$Extensions.Args")).default(namedType("$Extensions.DefaultArgs"));
var Model = class {
  constructor(model, dmmf2, genericsInfo, generator2) {
    this.model = model;
    this.dmmf = dmmf2;
    this.genericsInfo = genericsInfo;
    this.generator = generator2;
    this.type = dmmf2.outputTypeMap[model.name];
    this.outputType = new OutputType(dmmf2, this.type);
    this.mapping = dmmf2.mappings.modelOperations.find((m) => m.model === model.name);
  }
  get argsTypes() {
    const argsTypes = [];
    for (const action of Object.keys(DMMF.ModelAction)) {
      const fieldName = this.rootFieldNameForAction(action);
      if (!fieldName) {
        continue;
      }
      const field = this.dmmf.rootFieldMap[fieldName];
      if (!field) {
        throw new Error(`Oops this must not happen. Could not find field ${fieldName} on either Query or Mutation`);
      }
      if (action === "updateMany" || action === "deleteMany" || action === "createMany") {
        argsTypes.push(new MinimalArgsType(field.args, this.type, this.genericsInfo, action));
      } else if (action === "findRaw" || action === "aggregateRaw") {
        argsTypes.push(new MinimalArgsType(field.args, this.type, this.genericsInfo, action));
      } else if (action !== "groupBy" && action !== "aggregate") {
        argsTypes.push(new ArgsType(field.args, this.type, this.genericsInfo, action));
      }
    }
    for (const field of this.type.fields) {
      if (field.args.length) {
        if (field.outputType.location === "outputObjectTypes" && typeof field.outputType.type === "object") {
          argsTypes.push(
            new ArgsType(field.args, field.outputType.type, this.genericsInfo).setGeneratedName(getModelFieldArgsName(field, this.model.name)).setComment(`${this.model.name}.${field.name}`)
          );
        }
      }
    }
    argsTypes.push(new ArgsType([], this.type, this.genericsInfo));
    return argsTypes;
  }
  rootFieldNameForAction(action) {
    return this.mapping?.[action];
  }
  getGroupByTypes() {
    const { model, mapping } = this;
    const groupByType = this.dmmf.outputTypeMap[getGroupByName(model.name)];
    if (!groupByType) {
      throw new Error(`Could not get group by type for model ${model.name}`);
    }
    const groupByRootField = this.dmmf.rootFieldMap[mapping.groupBy];
    if (!groupByRootField) {
      throw new Error(`Could not find groupBy root field for model ${model.name}. Mapping: ${mapping?.groupBy}`);
    }
    const groupByArgsName = getGroupByArgsName(model.name);
    return `


export type ${groupByArgsName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string8.default)(
      groupByRootField.args.map((arg) => {
        arg.comment = getArgFieldJSDoc(this.type, DMMF.ModelAction.groupBy, arg);
        return new InputField(arg, arg.name === "by", this.genericsInfo).toTS();
      }).concat(
        groupByType.fields.filter((f) => f.outputType.location === "outputObjectTypes").map((f) => {
          if (f.outputType.location === "outputObjectTypes") {
            return `${f.name}?: ${getAggregateInputType(f.outputType.type.name)}${f.name === "_count" ? " | true" : ""}`;
          }
          return "";
        })
      ).join("\n"),
      TAB_SIZE
    )}
}

${new OutputType(this.dmmf, groupByType).toTS()}

type ${getGroupByPayloadName(model.name)}<T extends ${groupByArgsName}> = Prisma.PrismaPromise<
  Array<
    PickArray<${groupByType.name}, T['by']> &
      {
        [P in ((keyof T) & (keyof ${groupByType.name}))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ${groupByType.name}[P]>
          : GetScalarType<T[P], ${groupByType.name}[P]>
      }
    >
  >
`;
  }
  getAggregationTypes() {
    const { model, mapping } = this;
    let aggregateType = this.dmmf.outputTypeMap[getAggregateName(model.name)];
    if (!aggregateType) {
      throw new Error(`Could not get aggregate type "${getAggregateName(model.name)}" for "${model.name}"`);
    }
    aggregateType = klona(aggregateType);
    const aggregateRootField = this.dmmf.rootFieldMap[mapping.aggregate];
    if (!aggregateRootField) {
      throw new Error(`Could not find aggregate root field for model ${model.name}. Mapping: ${mapping?.aggregate}`);
    }
    const aggregateTypes = [aggregateType];
    const avgType = this.dmmf.outputTypeMap[getAvgAggregateName(model.name)];
    const sumType = this.dmmf.outputTypeMap[getSumAggregateName(model.name)];
    const minType = this.dmmf.outputTypeMap[getMinAggregateName(model.name)];
    const maxType = this.dmmf.outputTypeMap[getMaxAggregateName(model.name)];
    const countType = this.dmmf.outputTypeMap[getCountAggregateOutputName(model.name)];
    if (avgType) {
      aggregateTypes.push(avgType);
    }
    if (sumType) {
      aggregateTypes.push(sumType);
    }
    if (minType) {
      aggregateTypes.push(minType);
    }
    if (maxType) {
      aggregateTypes.push(maxType);
    }
    if (countType) {
      aggregateTypes.push(countType);
    }
    const aggregateArgsName = getAggregateArgsName(model.name);
    const aggregateName = getAggregateName(model.name);
    return `${aggregateTypes.map((type) => new SchemaOutputType(type).toTS()).join("\n")}

${aggregateTypes.length > 1 ? aggregateTypes.slice(1).map((type) => {
      const newType = {
        name: getAggregateInputType(type.name),
        constraints: {
          maxNumFields: null,
          minNumFields: null
        },
        fields: type.fields.map((field) => ({
          ...field,
          name: field.name,
          isNullable: false,
          isRequired: false,
          inputTypes: [
            {
              isList: false,
              location: "scalar",
              type: "true"
            }
          ]
        }))
      };
      return new InputType(newType, this.genericsInfo).toTS();
    }).join("\n") : ""}

export type ${aggregateArgsName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string8.default)(
      aggregateRootField.args.map((arg) => {
        arg.comment = getArgFieldJSDoc(this.type, DMMF.ModelAction.aggregate, arg);
        return new InputField(arg, false, this.genericsInfo).toTS();
      }).concat(
        aggregateType.fields.map((f) => {
          let data = "";
          const comment = getArgFieldJSDoc(this.type, DMMF.ModelAction.aggregate, f.name);
          data += comment ? wrapComment(comment) + "\n" : "";
          if (f.name === "_count" || f.name === "count") {
            data += `${f.name}?: true | ${getCountAggregateInputName(model.name)}`;
          } else {
            data += `${f.name}?: ${getAggregateInputType(f.outputType.type.name)}`;
          }
          return data;
        })
      ).join("\n"),
      TAB_SIZE
    )}
}

export type ${getAggregateGetName(model.name)}<T extends ${getAggregateArgsName(model.name)}> = {
      [P in keyof T & keyof ${aggregateName}]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : GetScalarType<T[P], ${aggregateName}[P]>
    : GetScalarType<T[P], ${aggregateName}[P]>
}`;
  }
  toTSWithoutNamespace() {
    const { model } = this;
    const isComposite = Boolean(this.dmmf.typeMap[model.name]);
    const docLines = model.documentation ?? "";
    const modelLine = `Model ${model.name}
`;
    const docs = `${modelLine}${docLines}`;
    const objects = objectType();
    const scalars = objectType();
    const composites = objectType();
    for (const field of model.fields) {
      if (field.kind === "object") {
        if (this.dmmf.typeMap[field.type]) {
          composites.add(buildModelOutputProperty(field, this.dmmf));
        } else {
          objects.add(buildModelOutputProperty(field, this.dmmf));
        }
      } else if (field.kind === "enum" || field.kind === "scalar") {
        scalars.add(buildModelOutputProperty(field, this.dmmf, true));
      }
    }
    const scalarsType = isComposite ? scalars : namedType("$Extensions.GetResult").addGenericArgument(scalars).addGenericArgument(namedType("ExtArgs").subKey("result").subKey(lowerCase(model.name)));
    const payloadName = `${model.name}Payload`;
    const payloadTypeDeclaration = typeDeclaration(
      `${model.name}Payload`,
      objectType().add(property("name", stringLiteral(model.name))).add(property("objects", objects)).add(property("scalars", scalarsType)).add(property("composites", composites))
    );
    if (!isComposite) {
      payloadTypeDeclaration.addGenericParameter(extArgsParam);
    }
    const payloadExport = moduleExport(payloadTypeDeclaration);
    const modelTypeExport = moduleExport(
      typeDeclaration(
        model.name,
        namedType(`runtime.Types.DefaultSelection`).addGenericArgument(namedType(payloadName))
      )
    ).setDocComment(docComment(docs));
    return `${stringify(payloadExport)}

${stringify(modelTypeExport)}`;
  }
  toTS() {
    const { model } = this;
    const isComposite = this.dmmf.typeMap[model.name];
    const hasRelationField = model.fields.some((f) => f.kind === "object");
    const includeType = hasRelationField ? stringify(
      buildIncludeType({ modelName: this.model.name, dmmf: this.dmmf, fields: this.outputType.fields }),
      {
        newLine: "both"
      }
    ) : "";
    return `
/**
 * Model ${model.name}
 */

${!this.dmmf.typeMap[model.name] ? this.getAggregationTypes() : ""}

${!this.dmmf.typeMap[model.name] ? this.getGroupByTypes() : ""}

${stringify(buildSelectType({ modelName: this.model.name, fields: this.outputType.fields }))}
${stringify(buildScalarSelectType({ modelName: this.model.name, fields: this.outputType.fields }), {
      newLine: "leading"
    })}
${includeType}

type ${model.name}GetPayload<S extends boolean | null | undefined | ${getArgName(model.name)}> = $Types.GetResult<${model.name}Payload, S>

${isComposite ? "" : new ModelDelegate(this.outputType, this.dmmf, this.generator).toTS()}

${new ModelFieldRefs(this.generator, this.outputType).toTS()}

// Custom InputTypes
${this.argsTypes.map((gen) => TS(gen)).join("\n")}
`;
  }
};
var ModelDelegate = class {
  constructor(outputType, dmmf2, generator2) {
    this.outputType = outputType;
    this.dmmf = dmmf2;
    this.generator = generator2;
  }
  getNonAggregateActions(availableActions) {
    const actions = availableActions.filter((key) => key !== "aggregate" && key !== "groupBy" && key !== "count");
    return actions;
  }
  toTS() {
    const { fields, name } = this.outputType;
    const mapping = this.dmmf.mappingsMap[name] ?? { model: name, plural: `${name}s` };
    const modelOrType = this.dmmf.typeAndModelMap[name];
    const availableActions = getModelActions(this.dmmf, name);
    const nonAggregateActions = this.getNonAggregateActions(availableActions);
    const groupByArgsName = getGroupByArgsName(name);
    const countArgsName = getModelArgName(name, DMMF.ModelAction.count);
    let fieldsProxy = "";
    if (this.generator?.previewFeatures.includes("fieldReference")) {
      fieldsProxy = `
  /**
   * Fields of the ${name} model
   */
  readonly fields: ${getFieldRefsTypeName(name)};
`;
    }
    return `${availableActions.includes(DMMF.ModelAction.aggregate) ? `type ${countArgsName}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
  Omit<${getModelArgName(name, DMMF.ModelAction.findMany)}, 'select' | 'include'> & {
    select?: ${getCountAggregateInputName(name)} | true
  }
` : ""}
export interface ${name}Delegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
${(0, import_indent_string8.default)(`[K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['${name}'], meta: { name: '${name}' } }`, TAB_SIZE)}
${(0, import_indent_string8.default)(
      nonAggregateActions.map(
        (actionName) => `${getMethodJSDoc(actionName, mapping, modelOrType)}
${actionName}${getGenericMethod(name, actionName)}(
  ${getArgs(name, actionName)}
): ${getReturnType({ name, actionName, projection: "select" /* select */ })}`
      ).join("\n\n"),
      TAB_SIZE
    )}

${availableActions.includes(DMMF.ModelAction.aggregate) ? `${(0, import_indent_string8.default)(getMethodJSDoc(DMMF.ModelAction.count, mapping, modelOrType), TAB_SIZE)}
  count<T extends ${countArgsName}>(
    args?: Subset<T, ${countArgsName}>,
  ): Prisma.PrismaPromise<
    T extends $Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : GetScalarType<T['select'], ${getCountAggregateOutputName(name)}>
      : number
  >
` : ""}
${availableActions.includes(DMMF.ModelAction.aggregate) ? `${(0, import_indent_string8.default)(getMethodJSDoc(DMMF.ModelAction.aggregate, mapping, modelOrType), TAB_SIZE)}
  aggregate<T extends ${getAggregateArgsName(name)}>(args: Subset<T, ${getAggregateArgsName(
      name
    )}>): Prisma.PrismaPromise<${getAggregateGetName(name)}<T>>
` : ""}
${availableActions.includes(DMMF.ModelAction.groupBy) ? `${(0, import_indent_string8.default)(getMethodJSDoc(DMMF.ModelAction.groupBy, mapping, modelOrType), TAB_SIZE)}
  groupBy<
    T extends ${groupByArgsName},
    HasSelectOrTake extends Or<
      Extends<'skip', Keys<T>>,
      Extends<'take', Keys<T>>
    >,
    OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ${groupByArgsName}['orderBy'] }
      : { orderBy?: ${groupByArgsName}['orderBy'] },
    OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends TupleToUnion<T['by']>,
    ByValid extends Has<ByFields, OrderFields>,
    HavingFields extends GetHavingFields<T['having']>,
    HavingValid extends Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? True : False,
    InputErrors extends ByEmpty extends True
    ? \`Error: "by" must not be empty.\`
    : HavingValid extends False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? \`Error: Field "\${P}" used in "having" needs to be provided in "by".\`
          : [
              Error,
              'Field ',
              P,
              \` in "having" needs to be provided in "by"\`,
            ]
      }[HavingFields]
    : 'take' extends Keys<T>
    ? 'orderBy' extends Keys<T>
      ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : \`Error: Field "\${P}" in "orderBy" needs to be provided in "by"\`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Keys<T>
    ? 'orderBy' extends Keys<T>
      ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : \`Error: Field "\${P}" in "orderBy" needs to be provided in "by"\`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : \`Error: Field "\${P}" in "orderBy" needs to be provided in "by"\`
      }[OrderFields]
  >(args: SubsetIntersection<T, ${groupByArgsName}, OrderByArg> & InputErrors): {} extends InputErrors ? ${getGroupByPayloadName(
      name
    )}<T> : Prisma.PrismaPromise<InputErrors>` : ""}
${fieldsProxy}
}

/**
 * The delegate class that acts as a "Promise-like" for ${name}.
 * Why is this prefixed with \`Prisma__\`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export class Prisma__${name}Client<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
  private readonly _dmmf;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  readonly [Symbol.toStringTag]: 'PrismaPromise';
  constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
${(0, import_indent_string8.default)(
      fields.filter((f) => {
        const fieldTypeName = f.outputType.type.name;
        return f.outputType.location === "outputObjectTypes" && !this.dmmf.typeMap[fieldTypeName] && f.name !== "_count";
      }).map((f) => {
        const fieldTypeName = f.outputType.type.name;
        return `
${f.name}<T extends ${getFieldArgName(f, name)}<ExtArgs> = {}>(args?: Subset<T, ${getFieldArgName(
          f,
          name
        )}<ExtArgs>>): ${getReturnType({
          name: fieldTypeName,
          actionName: f.outputType.isList ? DMMF.ModelAction.findMany : DMMF.ModelAction.findUnique,
          hideCondition: false,
          isField: true,
          renderPromise: true,
          fieldName: f.name,
          isChaining: true,
          projection: "select" /* select */
        })};`;
      }).join("\n"),
      2
    )}

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}`;
  }
};

// src/generation/TSClient/TSClient.ts
var import_ci_info = __toESM(require_ci_info());
var import_indent_string13 = __toESM(require_indent_string());
var import_path6 = __toESM(require("path"));

// src/runtime/utils/applyMixins.ts
function applyMixins(derivedCtor, constructors) {
  for (const baseCtor of constructors) {
    for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ?? /* @__PURE__ */ Object.create(null)
      );
    }
  }
}

// src/runtime/dmmf.ts
var DMMFDatamodelHelper = class {
  constructor({ datamodel: datamodel2 }) {
    this.datamodel = datamodel2;
    this.datamodelEnumMap = this.getDatamodelEnumMap();
    this.modelMap = this.getModelMap();
    this.typeMap = this.getTypeMap();
    this.typeAndModelMap = this.getTypeModelMap();
  }
  getDatamodelEnumMap() {
    return keyBy(this.datamodel.enums, "name");
  }
  getModelMap() {
    return { ...keyBy(this.datamodel.models, "name") };
  }
  getTypeMap() {
    return { ...keyBy(this.datamodel.types, "name") };
  }
  getTypeModelMap() {
    return { ...this.getTypeMap(), ...this.getModelMap() };
  }
};
var DMMFMappingsHelper = class {
  constructor({ mappings }) {
    this.mappings = mappings;
    this.mappingsMap = this.getMappingsMap();
  }
  getMappingsMap() {
    return keyBy(this.mappings.modelOperations, "model");
  }
  getOtherOperationNames() {
    return [
      Object.values(this.mappings.otherOperations.write),
      Object.values(this.mappings.otherOperations.read)
    ].flat();
  }
};
var DMMFSchemaHelper = class {
  constructor({ schema }) {
    this.outputTypeToMergedOutputType = (outputType) => {
      return {
        ...outputType,
        fields: outputType.fields
      };
    };
    this.schema = schema;
    this.enumMap = this.getEnumMap();
    this.queryType = this.getQueryType();
    this.mutationType = this.getMutationType();
    this.outputTypes = this.getOutputTypes();
    this.outputTypeMap = this.getMergedOutputTypeMap();
    this.resolveOutputTypes();
    this.inputObjectTypes = this.schema.inputObjectTypes;
    this.inputTypeMap = this.getInputTypeMap();
    this.resolveInputTypes();
    this.resolveFieldArgumentTypes();
    this.queryType = this.outputTypeMap.Query;
    this.mutationType = this.outputTypeMap.Mutation;
    this.rootFieldMap = this.getRootFieldMap();
  }
  get [Symbol.toStringTag]() {
    return "DMMFClass";
  }
  resolveOutputTypes() {
    for (const type of this.outputTypes.model) {
      for (const field of type.fields) {
        if (typeof field.outputType.type === "string" && !ScalarTypeTable[field.outputType.type]) {
          field.outputType.type = this.outputTypeMap[field.outputType.type] || this.outputTypeMap[field.outputType.type] || this.enumMap[field.outputType.type] || field.outputType.type;
        }
      }
      type.fieldMap = keyBy(type.fields, "name");
    }
    for (const type of this.outputTypes.prisma) {
      for (const field of type.fields) {
        if (typeof field.outputType.type === "string" && !ScalarTypeTable[field.outputType.type]) {
          field.outputType.type = this.outputTypeMap[field.outputType.type] || this.outputTypeMap[field.outputType.type] || this.enumMap[field.outputType.type] || field.outputType.type;
        }
      }
      type.fieldMap = keyBy(type.fields, "name");
    }
  }
  resolveInputTypes() {
    const inputTypes = this.inputObjectTypes.prisma;
    if (this.inputObjectTypes.model) {
      inputTypes.push(...this.inputObjectTypes.model);
    }
    for (const type of inputTypes) {
      for (const field of type.fields) {
        for (const fieldInputType of field.inputTypes) {
          const fieldType = fieldInputType.type;
          if (typeof fieldType === "string" && !ScalarTypeTable[fieldType] && (this.inputTypeMap[fieldType] || this.enumMap[fieldType])) {
            fieldInputType.type = this.inputTypeMap[fieldType] || this.enumMap[fieldType] || fieldType;
          }
        }
      }
      type.fieldMap = keyBy(type.fields, "name");
    }
  }
  resolveFieldArgumentTypes() {
    for (const type of this.outputTypes.prisma) {
      for (const field of type.fields) {
        for (const arg of field.args) {
          for (const argInputType of arg.inputTypes) {
            const argType = argInputType.type;
            if (typeof argType === "string" && !ScalarTypeTable[argType]) {
              argInputType.type = this.inputTypeMap[argType] || this.enumMap[argType] || argType;
            }
          }
        }
      }
    }
    for (const type of this.outputTypes.model) {
      for (const field of type.fields) {
        for (const arg of field.args) {
          for (const argInputType of arg.inputTypes) {
            const argType = argInputType.type;
            if (typeof argType === "string" && !ScalarTypeTable[argType]) {
              argInputType.type = this.inputTypeMap[argType] || this.enumMap[argType] || argInputType.type;
            }
          }
        }
      }
    }
  }
  getQueryType() {
    return this.schema.outputObjectTypes.prisma.find((t) => t.name === "Query");
  }
  getMutationType() {
    return this.schema.outputObjectTypes.prisma.find((t) => t.name === "Mutation");
  }
  getOutputTypes() {
    return {
      model: this.schema.outputObjectTypes.model.map(this.outputTypeToMergedOutputType),
      prisma: this.schema.outputObjectTypes.prisma.map(this.outputTypeToMergedOutputType)
    };
  }
  getEnumMap() {
    return {
      ...keyBy(this.schema.enumTypes.prisma, "name"),
      ...this.schema.enumTypes.model ? keyBy(this.schema.enumTypes.model, "name") : void 0
    };
  }
  hasEnumInNamespace(enumName, namespace) {
    return this.schema.enumTypes[namespace]?.find((schemaEnum) => schemaEnum.name === enumName) !== void 0;
  }
  getMergedOutputTypeMap() {
    return {
      ...keyBy(this.outputTypes.model, "name"),
      ...keyBy(this.outputTypes.prisma, "name")
    };
  }
  getInputTypeMap() {
    return {
      ...this.schema.inputObjectTypes.model ? keyBy(this.schema.inputObjectTypes.model, "name") : void 0,
      ...keyBy(this.schema.inputObjectTypes.prisma, "name")
    };
  }
  getRootFieldMap() {
    return { ...keyBy(this.queryType.fields, "name"), ...keyBy(this.mutationType.fields, "name") };
  }
};
var DMMFHelper = class {
  constructor(dmmf2) {
    return Object.assign(this, new DMMFDatamodelHelper(dmmf2), new DMMFMappingsHelper(dmmf2), new DMMFSchemaHelper(dmmf2));
  }
};
applyMixins(DMMFHelper, [DMMFDatamodelHelper, DMMFMappingsHelper, DMMFSchemaHelper]);

// src/generation/Cache.ts
var Cache = class {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
  }
  get(key) {
    return this._map.get(key)?.value;
  }
  set(key, value) {
    this._map.set(key, { value });
  }
  getOrCreate(key, create) {
    const cached = this._map.get(key);
    if (cached) {
      return cached.value;
    }
    const value = create();
    this.set(key, value);
    return value;
  }
};

// src/generation/GenericsArgsInfo.ts
var GenericArgsInfo = class {
  constructor() {
    this._cache = new Cache();
  }
  needsGenericModelArg(topLevelType) {
    const topLevelKey = getTypeKey(topLevelType);
    return this._cache.getOrCreate(topLevelKey, () => {
      const toVisit = [{ key: topLevelKey, type: topLevelType }];
      const visited = /* @__PURE__ */ new Set();
      let item;
      while (item = toVisit.shift()) {
        const { type: currentType, key } = item;
        const cached = this._cache.get(key);
        if (cached === true) {
          this._cacheResultsForTree(item);
          return true;
        }
        if (cached === false) {
          continue;
        }
        if (visited.has(key)) {
          continue;
        }
        visited.add(key);
        if (currentType.location === "fieldRefTypes") {
          this._cacheResultsForTree(item);
          return true;
        }
        if (currentType.location === "inputObjectTypes" && typeof currentType.type === "object") {
          const inputType = currentType.type;
          if (!inputType.fields) {
            continue;
          }
          if (inputType.meta?.source) {
            this._cache.set(key, false);
            continue;
          }
          for (const field of inputType.fields) {
            toVisit.push(...field.inputTypes.map((type) => ({ key: getTypeKey(type), type, parent: item })));
          }
        }
      }
      for (const visitedKey of visited) {
        this._cache.set(visitedKey, false);
      }
      return false;
    });
  }
  _cacheResultsForTree(item) {
    let currentItem = item;
    while (currentItem) {
      this._cache.set(currentItem.key, true);
      currentItem = currentItem.parent;
    }
  }
  inputTypeNeedsGenericModelArg(inputType) {
    return this.needsGenericModelArg({ type: inputType, location: "inputObjectTypes", isList: false });
  }
};
function getTypeKey(type) {
  const parts = [];
  if (type.namespace) {
    parts.push(type.namespace);
  }
  if (typeof type.type === "string") {
    parts.push(type.type);
  } else {
    parts.push(type.type.name);
  }
  return parts.join(".");
}

// src/generation/utils/buildInjectableEdgeEnv.ts
function buildInjectableEdgeEnv(edge, datasources2) {
  if (edge === true) {
    return declareInjectableEdgeEnv(datasources2);
  }
  return ``;
}
function declareInjectableEdgeEnv(datasources2) {
  const injectableEdgeEnv = { parsed: {} };
  const envVarNames = getSelectedEnvVarNames(datasources2);
  for (const envVarName of envVarNames) {
    injectableEdgeEnv.parsed[envVarName] = getRuntimeEdgeEnvVar(envVarName);
  }
  const injectableEdgeEnvJson = JSON.stringify(injectableEdgeEnv, null, 2);
  const injectableEdgeEnvCode = injectableEdgeEnvJson.replace(/"/g, "");
  return `
config.injectableEdgeEnv = ${injectableEdgeEnvCode}`;
}
function getSelectedEnvVarNames(datasources2) {
  return datasources2.reduce((acc, datasource) => {
    if (datasource.url.fromEnvVar) {
      return [...acc, datasource.url.fromEnvVar];
    }
    return acc;
  }, []);
}
function getRuntimeEdgeEnvVar(envVarName) {
  const cfwEnv = `typeof globalThis !== 'undefined' && globalThis['${envVarName}']`;
  const nodeOrVercelEnv = `typeof process !== 'undefined' && process.env && process.env.${envVarName}`;
  return `${cfwEnv} || ${nodeOrVercelEnv} || undefined`;
}

// src/generation/utils/buildDebugInitialization.ts
function buildDebugInitialization(edge) {
  if (!edge) {
    return "";
  }
  const debugVar = getRuntimeEdgeEnvVar("DEBUG");
  return `if (${debugVar}) {
  Debug.enable(${debugVar})
}
`;
}

// src/generation/utils/buildDirname.ts
function buildDirname(edge, relativeOutdir) {
  if (edge === true) {
    return buildDirnameDefault();
  }
  return buildDirnameFind(relativeOutdir);
}
function buildDirnameFind(relativeOutdir) {
  return `
const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  config.dirname = path.join(process.cwd(), ${JSON.stringify(pathToPosix(relativeOutdir))})
  config.isBundled = true
}`;
}
function buildDirnameDefault() {
  return `config.dirname = '/'`;
}

// src/generation/utils/buildDMMF.ts
var import_lz_string = __toESM(require_lz_string());

// src/runtime/core/runtimeDataModel.ts
function dmmfToRuntimeDataModel(dmmfDataModel) {
  return {
    models: buildMapForRuntime(dmmfDataModel.models),
    enums: buildMapForRuntime(dmmfDataModel.enums),
    types: buildMapForRuntime(dmmfDataModel.types)
  };
}
function buildMapForRuntime(list) {
  const result = {};
  for (const { name, ...rest } of list) {
    result[name] = rest;
  }
  return result;
}

// src/generation/utils/buildDMMF.ts
function buildFullDMMF(dmmf2) {
  const dmmfString = escapeJson(JSON.stringify(dmmf2));
  const compressedDMMF = import_lz_string.default.compressToBase64(dmmfString);
  return `
const compressedDMMF = '${compressedDMMF}'
const decompressedDMMF = decompressFromBase64(compressedDMMF)
// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(decompressedDMMF)
exports.Prisma.dmmf = JSON.parse(decompressedDMMF)
config.document = dmmf`;
}
function buildRuntimeDataModel(datamodel2) {
  const runtimeDataModel = dmmfToRuntimeDataModel(datamodel2);
  const datamodelString = escapeJson(JSON.stringify(runtimeDataModel));
  return `
config.runtimeDataModel = JSON.parse(${JSON.stringify(datamodelString)})
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)`;
}

// src/generation/utils/buildEdgeClientProtocol.ts
function buildEdgeClientProtocol(edge, config2) {
  if (!edge) {
    return "";
  }
  const protocol = getQueryEngineProtocol(config2);
  return `config.edgeClientProtocol = "${protocol}";`;
}

// src/generation/utils/buildInlineDatasources.ts
function buildInlineDatasource(dataProxy2, internalDatasources) {
  if (dataProxy2 === true) {
    const datasources2 = internalToInlineDatasources(internalDatasources);
    return `
config.inlineDatasources = ${JSON.stringify(datasources2, null, 2)}`;
  }
  return ``;
}
function internalToInlineDatasources(internalDatasources) {
  return internalDatasources.reduce((acc, ds) => {
    acc[ds.name] = { url: ds.url };
    return acc;
  }, {});
}

// src/generation/utils/buildInlineSchema.ts
var import_crypto = __toESM(require("crypto"));
var import_fs5 = __toESM(require("fs"));
var readFile = import_fs5.default.promises.readFile;
async function buildInlineSchema(dataProxy2, schemaPath2) {
  if (dataProxy2 === true) {
    const b64Schema = (await readFile(schemaPath2)).toString("base64");
    const schemaHash = import_crypto.default.createHash("sha256").update(b64Schema).digest("hex");
    return `
config.inlineSchema = '${b64Schema}'
config.inlineSchemaHash = '${schemaHash}'`;
  }
  return ``;
}

// src/generation/utils/buildNFTAnnotations.ts
var import_path5 = __toESM(require("path"));

// ../../helpers/blaze/map.ts
function mapList(object, mapper) {
  const mapped = new Array(object.length);
  for (let i = 0; i < object.length; ++i) {
    mapped[i] = mapper(object[i], i);
  }
  return mapped;
}
function mapObject(object, mapper) {
  const mapped = {};
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; ++i) {
    mapped[i] = mapper(object[keys[i]], keys[i]);
  }
  return mapped;
}
var map = (object, mapper) => {
  return Array.isArray(object) ? mapList(object, mapper) : mapObject(object, mapper);
};

// src/generation/utils/buildNFTAnnotations.ts
function buildNFTAnnotations(dataProxy2, engineType, platforms, relativeOutdir) {
  if (dataProxy2 === true)
    return "";
  if (platforms === void 0) {
    return "";
  }
  if (process.env.NETLIFY) {
    platforms = ["rhel-openssl-1.0.x"];
  }
  const engineAnnotations = map(platforms, (platform) => {
    const engineFilename = getQueryEngineFilename(engineType, platform);
    return engineFilename ? buildNFTAnnotation(engineFilename, relativeOutdir) : "";
  }).join("\n");
  const schemaAnnotations = buildNFTAnnotation("schema.prisma", relativeOutdir);
  return `${engineAnnotations}${schemaAnnotations}`;
}
function getQueryEngineFilename(engineType, platform) {
  if (engineType === "library" /* Library */) {
    return getNodeAPIName(platform, "fs");
  }
  if (engineType === "binary" /* Binary */) {
    return `query-engine-${platform}`;
  }
  return void 0;
}
function buildNFTAnnotation(fileName, relativeOutdir) {
  const relativeFilePath = import_path5.default.join(relativeOutdir, fileName);
  return `
path.join(__dirname, ${JSON.stringify(pathToPosix(fileName))});
path.join(process.cwd(), ${JSON.stringify(pathToPosix(relativeFilePath))})`;
}

// src/generation/utils/buildRequirePath.ts
function buildRequirePath(edge) {
  if (edge === true)
    return "";
  return `
  const path = require('path')`;
}

// src/generation/utils/buildWarnEnvConflicts.ts
function buildWarnEnvConflicts(edge, runtimeDir, runtimeName) {
  if (edge === true)
    return "";
  return `
const { warnEnvConflicts } = require('${runtimeDir}/${runtimeName}')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})`;
}

// src/generation/TSClient/common.ts
var import_indent_string9 = __toESM(require_indent_string());
var commonCodeJS = ({
  runtimeDir,
  runtimeName,
  browser,
  clientVersion: clientVersion3,
  engineVersion: engineVersion2,
  deno
}) => `${deno ? "const exports = {}" : ""}
Object.defineProperty(exports, "__esModule", { value: true });
${deno ? `
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  defineDmmfProperty,
  Public,
} from '${runtimeDir}/edge-esm.js'` : browser ? `
const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('${runtimeDir}/${runtimeName}')
` : `
const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('${runtimeDir}/${runtimeName}')
`}

const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: ${clientVersion3}
 * Query Engine version: ${engineVersion2}
 */
Prisma.prismaVersion = {
  client: "${clientVersion3}",
  engine: "${engineVersion2}"
}

Prisma.PrismaClientKnownRequestError = ${notSupportOnBrowser("PrismaClientKnownRequestError", browser)};
Prisma.PrismaClientUnknownRequestError = ${notSupportOnBrowser("PrismaClientUnknownRequestError", browser)}
Prisma.PrismaClientRustPanicError = ${notSupportOnBrowser("PrismaClientRustPanicError", browser)}
Prisma.PrismaClientInitializationError = ${notSupportOnBrowser("PrismaClientInitializationError", browser)}
Prisma.PrismaClientValidationError = ${notSupportOnBrowser("PrismaClientValidationError", browser)}
Prisma.NotFoundError = ${notSupportOnBrowser("NotFoundError", browser)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = ${notSupportOnBrowser("sqltag", browser)}
Prisma.empty = ${notSupportOnBrowser("empty", browser)}
Prisma.join = ${notSupportOnBrowser("join", browser)}
Prisma.raw = ${notSupportOnBrowser("raw", browser)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = ${notSupportOnBrowser("Extensions.getExtensionContext", browser)}
Prisma.defineExtension = ${notSupportOnBrowser("Extensions.defineExtension", browser)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}
`;
var notSupportOnBrowser = (fnc, browser) => {
  if (browser)
    return `() => {
  throw new Error(\`${fnc} is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues\`,
)}`;
  return fnc;
};
var commonCodeTS = ({ runtimeDir, runtimeName, clientVersion: clientVersion3, engineVersion: engineVersion2 }) => ({
  tsWithoutNamespace: () => `import * as runtime from '${runtimeDir}/${runtimeName}';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>
`,
  ts: () => `export import DMMF = runtime.DMMF

export type PrismaPromise<T> = $Public.PrismaPromise<T>

/**
 * Validator
 */
export import validator = runtime.Public.validator

/**
 * Prisma Errors
 */
export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
export import PrismaClientValidationError = runtime.PrismaClientValidationError
export import NotFoundError = runtime.NotFoundError

/**
 * Re-export of sql-template-tag
 */
export import sql = runtime.sqltag
export import empty = runtime.empty
export import join = runtime.join
export import raw = runtime.raw
export import Sql = runtime.Sql

/**
 * Decimal.js
 */
export import Decimal = runtime.Decimal

export type DecimalJsLike = runtime.DecimalJsLike

/**
 * Metrics 
 */
export type Metrics = runtime.Metrics
export type Metric<T> = runtime.Metric<T>
export type MetricHistogram = runtime.MetricHistogram
export type MetricHistogramBucket = runtime.MetricHistogramBucket

/**
* Extensions
*/
export type Extension = $Extensions.UserArgs
export import getExtensionContext = runtime.Extensions.getExtensionContext
export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
export type Exact<T, W> = $Public.Exact<T, W>

/**
 * Prisma Client JS version: ${clientVersion3}
 * Query Engine version: ${engineVersion2}
 */
export type PrismaVersion = {
  client: string
}

export const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export type JsonObject = {[Key in string]?: JsonValue}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export interface JsonArray extends Array<JsonValue> {}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

/**
 * Matches a JSON object.
 * Unlike \`JsonObject\`, this type allows undefined and read-only properties.
 */
export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

/**
 * Matches a JSON array.
 * Unlike \`JsonArray\`, readonly arrays are assignable to this type.
 */
export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

/**
 * Matches any valid value that can be used as an input for operations like
 * create and update as the value of a JSON field. Unlike \`JsonValue\`, this
 * type allows read-only arrays and read-only object properties and disallows
 * \`null\` at the top level.
 *
 * \`null\` cannot be used as the value of a JSON field because its meaning
 * would be ambiguous. Use \`Prisma.JsonNull\` to store the JSON null value or
 * \`Prisma.DbNull\` to clear the JSON value and set the field to the database
 * NULL value instead.
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
 */
export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

/**
 * Types of the values used to represent different kinds of \`null\` values when working with JSON fields.
 * 
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
namespace NullTypes {
${buildNullClass("DbNull")}

${buildNullClass("JsonNull")}

${buildNullClass("AnyNull")}
}

/**
 * Helper for filtering JSON entries that have \`null\` on the database (empty on the db)
 * 
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const DbNull: NullTypes.DbNull

/**
 * Helper for filtering JSON entries that have JSON \`null\` values (not empty on the db)
 * 
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const JsonNull: NullTypes.JsonNull

/**
 * Helper for filtering JSON entries that are \`Prisma.DbNull\` or \`Prisma.JsonNull\`
 * 
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const AnyNull: NullTypes.AnyNull

type SelectAndInclude = {
  select: any
  include: any
}
type HasSelect = {
  select: any
}
type HasInclude = {
  include: any
}
type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose \`select\` or \`include\`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};


export type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
}[keyof T]

export type TruthyKeys<T> = keyof {
  [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
}

export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From \`T\` pick properties that exist in \`U\`. Simple version of Intersection
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

/**
 * SelectSubset
 * @desc From \`T\` pick properties that exist in \`U\`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
} &
  (T extends SelectAndInclude
    ? 'Please either choose \`select\` or \`include\`.'
    : {})

/**
 * Subset + Intersection
 * @desc From \`T\` pick properties that exist in \`U\` and intersect \`K\`
 */
export type SubsetIntersection<T, U, K> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
} &
  K

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> =
  T extends object ?
  U extends object ?
    (Without<T, U> & U) | (Without<U, T> & T)
  : U : T


/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any>
? False
: T extends Date
? False
: T extends Uint8Array
? False
: T extends BigInt
? False
: T extends object
? True
: False


/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

/**
 * From ts-toolbelt
 */

type __Either<O extends object, K extends Key> = Omit<O, K> &
  {
    // Merge all but K
    [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
  }[K]

type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

type _Either<
  O extends object,
  K extends Key,
  strict extends Boolean
> = {
  1: EitherStrict<O, K>
  0: EitherLoose<O, K>
}[strict]

type Either<
  O extends object,
  K extends Key,
  strict extends Boolean = 1
> = O extends unknown ? _Either<O, K, strict> : never

export type Union = any

type PatchUndefined<O extends object, O1 extends object> = {
  [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
} & {}

/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};

type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;

type Key = string | number | symbol;
type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];

export type ComputeRaw<A extends any> = A extends Function ? A : {
  [K in keyof A]: A[K];
} & {};

export type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

// cause typescript not to expand types and preserve names
type NoExpand<T> = T extends unknown ? T : never;

// this type assumes the passed object is entirely optional
type AtLeast<O extends object, K extends string> = NoExpand<
  O extends unknown
  ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
    | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
  : never>;

type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/

export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

/**
A [[Boolean]]
*/
export type Boolean = True | False

// /**
// 1
// */
export type True = 1

/**
0
*/
export type False = 0

export type Not<B extends Boolean> = {
  0: 1
  1: 0
}[B]

export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0 // anything \`never\` is false
  : A1 extends A2
  ? 1
  : 0

export type Has<U extends Union, U1 extends Union> = Not<
  Extends<Exclude<U1, U>, U1>
>

export type Or<B1 extends Boolean, B2 extends Boolean> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 1
  }
}[B1][B2]

export type Keys<U extends Union> = U extends unknown ? keyof U : never

type Cast<A, B> = A extends B ? A : B;

export const type: unique symbol;



/**
 * Used by group by
 */

export type GetScalarType<T, O> = O extends object ? {
  [P in keyof T]: P extends keyof O
    ? O[P]
    : never
} : never

type FieldPaths<
  T,
  U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
> = IsObject<T> extends True ? U : T

type GetHavingFields<T> = {
  [K in keyof T]: Or<
    Or<Extends<'OR', K>, Extends<'AND', K>>,
    Extends<'NOT', K>
  > extends True
    ? // infer is only needed to not hit TS limit
      // based on the brilliant idea of Pierre-Antoine Mills
      // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
      T[K] extends infer TK
      ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
      : never
    : {} extends FieldPaths<T[K]>
    ? never
    : K
}[keyof T]

/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

/**
 * Like \`Pick\`, but with an array
 */
type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

/**
 * Exclude all keys with underscores
 */
type ExcludeUnderscoreKeys<T extends string> = T extends \`_\${string}\` ? never : T


export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

`
});
function buildNullClass(name) {
  const source = `/**
* Type of \`Prisma.${name}\`.
* 
* You cannot use other instances of this class. Please use the \`Prisma.${name}\` value.
* 
* @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
*/
class ${name} {
  private ${name}: never
  private constructor()
}`;
  return (0, import_indent_string9.default)(source, TAB_SIZE);
}

// src/generation/TSClient/Count.ts
var import_indent_string10 = __toESM(require_indent_string());
var Count = class {
  constructor(type, dmmf2, genericsInfo, generator2) {
    this.type = type;
    this.dmmf = dmmf2;
    this.genericsInfo = genericsInfo;
    this.generator = generator2;
  }
  get argsTypes() {
    const argsTypes = [];
    argsTypes.push(new ArgsType([], this.type, this.genericsInfo));
    for (const field of this.type.fields) {
      if (field.args.length > 0) {
        argsTypes.push(
          new MinimalArgsType(
            field.args,
            this.type,
            this.genericsInfo,
            void 0,
            getCountArgsType(this.type.name, field.name)
          )
        );
      }
    }
    return argsTypes;
  }
  toTS() {
    const { type } = this;
    const { name } = type;
    const outputType = new OutputType(this.dmmf, this.type);
    return `
/**
 * Count Type ${name}
 */

${outputType.toTS()}

export type ${getSelectName(name)}<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
${(0, import_indent_string10.default)(
      type.fields.map((field) => {
        const types = ["boolean"];
        if (field.outputType.location === "outputObjectTypes") {
          types.push(getFieldArgName(field, this.type.name));
        }
        if (field.args.length > 0) {
          types.push(getCountArgsType(name, field.name));
        }
        return `${field.name}?: ${types.join(" | ")}`;
      }).join("\n"),
      TAB_SIZE
    )}
}

// Custom InputTypes
${this.argsTypes.map((gen) => TS(gen)).join("\n")}
`;
  }
};
function getCountArgsType(typeName, fieldName) {
  return `${typeName}Count${capitalize2(fieldName)}Args`;
}

// src/generation/TSClient/FieldRefInput.ts
var FieldRefInput = class {
  constructor(type) {
    this.type = type;
  }
  toTS() {
    const allowedTypes = this.getAllowedTypes();
    return `
/**
 * Reference to a field of type ${allowedTypes}
 */
export type ${this.type.name}<$PrismaModel> = FieldRefInputType<$PrismaModel, ${allowedTypes}>
    `;
  }
  getAllowedTypes() {
    return this.type.allowTypes.map(getRefAllowedTypeName).join(" | ");
  }
};

// src/generation/TSClient/PrismaClient.ts
var import_indent_string12 = __toESM(require_indent_string());

// src/generation/utils/runtimeImport.ts
function runtimeImport(name) {
  return name;
}

// src/generation/TSClient/Datasources.ts
var import_indent_string11 = __toESM(require_indent_string());
var Datasources = class {
  constructor(internalDatasources) {
    this.internalDatasources = internalDatasources;
  }
  toTS() {
    const sources = this.internalDatasources;
    return `export type Datasources = {
${(0, import_indent_string11.default)(sources.map((s) => `${s.name}?: Datasource`).join("\n"), 2)}
}`;
  }
};

// src/generation/TSClient/PrismaClient.ts
function clientTypeMapModelsDefinition() {
  const modelNames = Object.keys(this.dmmf.getModelMap());
  return `{
  meta: {
    modelProps: ${modelNames.map((mn) => `'${lowerCase(mn)}'`).join(" | ")}
    txIsolationLevel: ${this.dmmf.hasEnumInNamespace("TransactionIsolationLevel", "prisma") ? "Prisma.TransactionIsolationLevel" : "never"}
  },
  model: {${modelNames.reduce((acc, modelName) => {
    const actions = getModelActions(this.dmmf, modelName);
    return `${acc}
    ${modelName}: {
      payload: ${modelName}Payload<ExtArgs>
${this.generator?.previewFeatures.includes("fieldReference") ? `      fields: Prisma.${getFieldRefsTypeName(modelName)}
` : ""}      operations: {${actions.reduce((acc2, action) => {
      return `${acc2}
        ${action}: {
          args: Prisma.${getModelArgName(modelName, action)}<ExtArgs>,
          result: ${clientTypeMapModelsResultDefinition(modelName, action)}
        }`;
    }, "")}
      }
    }`;
  }, "")}
  }
}`;
}
function clientTypeMapModelsResultDefinition(modelName, action) {
  if (action === "count")
    return `$Utils.Optional<${getCountAggregateOutputName(modelName)}> | number`;
  if (action === "groupBy")
    return `$Utils.Optional<${getGroupByName(modelName)}>[]`;
  if (action === "aggregate")
    return `$Utils.Optional<${getAggregateName(modelName)}>`;
  if (action === "findRaw")
    return `Prisma.JsonObject`;
  if (action === "aggregateRaw")
    return `Prisma.JsonObject`;
  if (action === "deleteMany")
    return `Prisma.BatchPayload`;
  if (action === "createMany")
    return `Prisma.BatchPayload`;
  if (action === "updateMany")
    return `Prisma.BatchPayload`;
  if (action === "findMany")
    return `$Utils.PayloadToResult<${modelName}Payload>[]`;
  if (action === "findFirst")
    return `$Utils.PayloadToResult<${modelName}Payload> | null`;
  if (action === "findUnique")
    return `$Utils.PayloadToResult<${modelName}Payload> | null`;
  if (action === "findFirstOrThrow")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  if (action === "findUniqueOrThrow")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  if (action === "create")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  if (action === "update")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  if (action === "upsert")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  if (action === "delete")
    return `$Utils.PayloadToResult<${modelName}Payload>`;
  assertNever(action, "Unknown action: " + action);
}
function clientTypeMapOthersDefinition() {
  const otherOperationsNames = this.dmmf.getOtherOperationNames().flatMap((n) => {
    if (n === "executeRaw" || n === "queryRaw") {
      return [`$${n}Unsafe`, `$${n}`];
    }
    return `$${n}`;
  });
  const argsResultMap = {
    $executeRaw: { args: "[query: TemplateStringsArray | Prisma.Sql, ...values: any[]]", result: "any" },
    $queryRaw: { args: "[query: TemplateStringsArray | Prisma.Sql, ...values: any[]]", result: "any" },
    $executeRawUnsafe: { args: "[query: string, ...values: any[]]", result: "any" },
    $queryRawUnsafe: { args: "[query: string, ...values: any[]]", result: "any" },
    $runCommandRaw: { args: "Prisma.InputJsonObject", result: "Prisma.JsonObject" }
  };
  return `{
  other: {
    payload: any
    operations: {${otherOperationsNames.reduce((acc, action) => {
    return `${acc}
      ${action}: {
        args: ${argsResultMap[action].args},
        result: ${argsResultMap[action].result}
      }`;
  }, "")}
    }
  }
}`;
}
function clientTypeMapDefinition() {
  const typeMap = `${clientTypeMapModelsDefinition.bind(this)()} & ${clientTypeMapOthersDefinition.bind(this)()}`;
  return `
interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
  returns: Prisma.TypeMap<this['params']['extArgs']>
}

export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ${typeMap}`;
}
function clientExtensionsDefinitions() {
  const typeMap = clientTypeMapDefinition.call(this);
  const define2 = `export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>`;
  const extend = `  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>`;
  return {
    prismaNamespaceDefinitions: `
${typeMap}
${define2}`,
    prismaClientDefinitions: `${extend}`
  };
}
function batchingTransactionDefinition() {
  const method2 = method("$transaction").setDocComment(
    docComment`
        Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
        @example
        \`\`\`
        const [george, bob, alice] = await prisma.$transaction([
          prisma.user.create({ data: { name: 'George' } }),
          prisma.user.create({ data: { name: 'Bob' } }),
          prisma.user.create({ data: { name: 'Alice' } }),
        ])
        \`\`\`

        Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
      `
  ).addGenericParameter(genericParameter("P").extends(array(prismaPromise(anyType)))).addParameter(parameter("arg", arraySpread(namedType("P")))).setReturnType(promise(namedType("runtime.Types.Utils.UnwrapTuple").addGenericArgument(namedType("P"))));
  if (this.dmmf.hasEnumInNamespace("TransactionIsolationLevel", "prisma")) {
    const options2 = objectType().formatInline().add(property("isolationLevel", namedType("Prisma.TransactionIsolationLevel")).optional());
    method2.addParameter(parameter("options", options2).optional());
  }
  return stringify(method2, { indentLevel: 1, newLine: "leading" });
}
function interactiveTransactionDefinition() {
  const options2 = objectType().formatInline().add(property("maxWait", numberType).optional()).add(property("timeout", numberType).optional());
  if (this.dmmf.hasEnumInNamespace("TransactionIsolationLevel", "prisma")) {
    const isolationLevel = property("isolationLevel", namedType("Prisma.TransactionIsolationLevel")).optional();
    options2.add(isolationLevel);
  }
  const returnType = promise(namedType("R"));
  const callbackType = functionType().addParameter(
    parameter("prisma", omit(namedType("PrismaClient"), namedType("runtime.ITXClientDenyList")))
  ).setReturnType(returnType);
  const method2 = method("$transaction").addGenericParameter(genericParameter("R")).addParameter(parameter("fn", callbackType)).addParameter(parameter("options", options2).optional()).setReturnType(returnType);
  return stringify(method2, { indentLevel: 1, newLine: "leading" });
}
function queryRawDefinition() {
  if (!this.dmmf.mappings.otherOperations.write.includes("queryRaw")) {
    return "";
  }
  return `
  /**
   * Performs a prepared raw query and returns the \`SELECT\` data.
   * @example
   * \`\`\`
   * const result = await prisma.$queryRaw\`SELECT * FROM User WHERE id = \${1} OR email = \${'user@email.com'};\`
   * \`\`\`
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the \`SELECT\` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * \`\`\`
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * \`\`\`
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;`;
}
function executeRawDefinition() {
  if (!this.dmmf.mappings.otherOperations.write.includes("executeRaw")) {
    return "";
  }
  return `
  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * \`\`\`
   * const result = await prisma.$executeRaw\`UPDATE User SET cool = \${true} WHERE email = \${'user@email.com'};\`
   * \`\`\`
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * \`\`\`
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * \`\`\`
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;`;
}
function metricDefinition() {
  if (!this.generator?.previewFeatures.includes("metrics")) {
    return "";
  }
  const property2 = property("$metrics", namedType(`runtime.${runtimeImport("MetricsClient")}`)).setDocComment(
    docComment`
        Gives access to the client metrics in json or prometheus format.
        
        @example
        \`\`\`
        const metrics = await prisma.$metrics.json()
        // or
        const metrics = await prisma.$metrics.prometheus()
        \`\`\`
    `
  ).readonly();
  return stringify(property2, { indentLevel: 1, newLine: "leading" });
}
function runCommandRawDefinition() {
  if (!this.dmmf.mappings.otherOperations.write.includes("runCommandRaw")) {
    return "";
  }
  const method2 = method("$runCommandRaw").addParameter(parameter("command", namedType("Prisma.InputJsonObject"))).setReturnType(prismaPromise(namedType("Prisma.JsonObject"))).setDocComment(docComment`
      Executes a raw MongoDB command and returns the result of it.
      @example
      \`\`\`
      const user = await prisma.$runCommandRaw({
        aggregate: 'User',
        pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
        explain: false,
      })
      \`\`\`
   
      Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
    `);
  return stringify(method2, { indentLevel: 1, newLine: "leading" });
}
var PrismaClientClass = class {
  constructor(dmmf2, internalDatasources, outputDir2, browser, generator2, sqliteDatasourceOverrides, cwd) {
    this.dmmf = dmmf2;
    this.internalDatasources = internalDatasources;
    this.outputDir = outputDir2;
    this.browser = browser;
    this.generator = generator2;
    this.sqliteDatasourceOverrides = sqliteDatasourceOverrides;
    this.cwd = cwd;
    this.clientExtensionsDefinitions = clientExtensionsDefinitions.bind(this)();
  }
  get jsDoc() {
    const { dmmf: dmmf2 } = this;
    const example = dmmf2.mappings.modelOperations[0];
    return `/**
 * ##  Prisma Client \u02B2\u02E2
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * \`\`\`
 * const prisma = new PrismaClient()
 * // Fetch zero or more ${capitalize(example.plural)}
 * const ${lowerCase(example.plural)} = await prisma.${lowerCase(example.model)}.findMany()
 * \`\`\`
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */`;
  }
  toTSWithoutNamespace() {
    const { dmmf: dmmf2 } = this;
    return `${this.jsDoc}
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  ${(0, import_indent_string12.default)(this.jsDoc, TAB_SIZE)}

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

${[
      executeRawDefinition.bind(this)(),
      queryRawDefinition.bind(this)(),
      batchingTransactionDefinition.bind(this)(),
      interactiveTransactionDefinition.bind(this)(),
      runCommandRawDefinition.bind(this)(),
      metricDefinition.bind(this)(),
      this.clientExtensionsDefinitions.prismaClientDefinitions
    ].join("\n").trim()}

    ${(0, import_indent_string12.default)(
      dmmf2.mappings.modelOperations.filter((m) => m.findMany).map((m) => {
        const methodName = lowerCase(m.model);
        return `/**
 * \`prisma.${methodName}\`: Exposes CRUD operations for the **${m.model}** model.
  * Example usage:
  * \`\`\`ts
  * // Fetch zero or more ${capitalize(m.plural)}
  * const ${lowerCase(m.plural)} = await prisma.${methodName}.findMany()
  * \`\`\`
  */
get ${methodName}(): Prisma.${m.model}Delegate<GlobalReject, ExtArgs>;`;
      }).join("\n\n"),
      2
    )}
}`;
  }
  toTS() {
    return `${new Datasources(this.internalDatasources).toTS()}
${this.clientExtensionsDefinitions.prismaNamespaceDefinitions}
export type DefaultPrismaClient = PrismaClient
export type RejectOnNotFound = boolean | ((error: Error) => Error)
export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
export type HasReject<
  GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
  LocalRejectSettings,
  Action extends PrismaAction,
  Model extends ModelName
> = LocalRejectSettings extends RejectOnNotFound
  ? IsReject<LocalRejectSettings>
  : GlobalRejectSettings extends RejectPerOperation
  ? Action extends keyof GlobalRejectSettings
    ? GlobalRejectSettings[Action] extends RejectOnNotFound
      ? IsReject<GlobalRejectSettings[Action]>
      : GlobalRejectSettings[Action] extends RejectPerModel
      ? Model extends keyof GlobalRejectSettings[Action]
        ? IsReject<GlobalRejectSettings[Action][Model]>
        : False
      : False
    : False
  : IsReject<GlobalRejectSettings>
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Configure findUnique/findFirst to throw an error if the query returns null. 
   * @deprecated since 4.0.0. Use \`findUniqueOrThrow\`/\`findFirstOrThrow\` methods instead.
   * @example
   * \`\`\`
   * // Reject on both findUnique/findFirst
   * rejectOnNotFound: true
   * // Reject only on findFirst with a custom error
   * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
   * // Reject on user.findUnique with a custom error
   * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
   * \`\`\`
   */
  rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
  /**
   * Overwrites the datasource url from your schema.prisma file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * \`\`\`
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * \`\`\`
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findUnique'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'createMany'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'
  | 'count'
  | 'runCommandRaw'
  | 'findRaw'

/**
 * These options are being passed into the middleware as "params"
 */
export type MiddlewareParams = {
  model?: ModelName
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The \`T\` type makes sure, that the \`return proceed\` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * \`PrismaClient\` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>
`;
  }
};

// src/generation/TSClient/TSClient.ts
var TSClient = class {
  constructor(options2) {
    this.options = options2;
    this.genericsInfo = new GenericArgsInfo();
    this.dmmf = new DMMFHelper(klona(options2.document));
    TSClient.enabledPreviewFeatures = this.options.generator?.previewFeatures ?? [];
  }
  async toJS(edge = false) {
    const {
      platforms,
      generator: generator2,
      sqliteDatasourceOverrides,
      outputDir: outputDir2,
      schemaPath: schemaPath2,
      runtimeDir,
      runtimeName,
      datasources: datasources2,
      dataProxy: dataProxy2,
      deno
    } = this.options;
    const engineProtocol = getQueryEngineProtocol(generator2);
    const envPaths = getEnvPaths(schemaPath2, { cwd: outputDir2 });
    const relativeEnvPaths = {
      rootEnvPath: envPaths.rootEnvPath && pathToPosix(import_path6.default.relative(outputDir2, envPaths.rootEnvPath)),
      schemaEnvPath: envPaths.schemaEnvPath && pathToPosix(import_path6.default.relative(outputDir2, envPaths.schemaEnvPath))
    };
    const engineType = getClientEngineType(generator2);
    if (generator2) {
      generator2.config.engineType = engineType;
    }
    const config2 = {
      generator: generator2,
      relativeEnvPaths,
      sqliteDatasourceOverrides,
      relativePath: pathToPosix(import_path6.default.relative(outputDir2, import_path6.default.dirname(schemaPath2))),
      clientVersion: this.options.clientVersion,
      engineVersion: this.options.engineVersion,
      datasourceNames: datasources2.map((d) => d.name),
      activeProvider: this.options.activeProvider,
      dataProxy: this.options.dataProxy,
      postinstall: this.options.postinstall,
      ciName: import_ci_info.default.name ?? void 0
    };
    const relativeOutdir = import_path6.default.relative(process.cwd(), outputDir2);
    const needsFullDMMF = dataProxy2 && engineProtocol === "graphql";
    const code = `${commonCodeJS({ ...this.options, browser: false })}
${buildRequirePath(edge)}

/**
 * Enums
 */

${this.dmmf.schema.enumTypes.prisma.map((type) => new Enum(type, true).toJS()).join("\n\n")}
${this.dmmf.schema.enumTypes.model?.map((type) => new Enum(type, false).toJS()).join("\n\n") ?? ""}

${new Enum(
      {
        name: "ModelName",
        values: this.dmmf.mappings.modelOperations.map((m) => m.model)
      },
      true
    ).toJS()}
/**
 * Create the Client
 */
const config = ${JSON.stringify(config2, null, 2)}
${buildDirname(edge, relativeOutdir)}
${needsFullDMMF ? buildFullDMMF(this.options.document) : buildRuntimeDataModel(this.dmmf.datamodel)}

${await buildInlineSchema(dataProxy2, schemaPath2)}
${buildInlineDatasource(dataProxy2, datasources2)}
${buildInjectableEdgeEnv(edge, datasources2)}
${buildWarnEnvConflicts(edge, runtimeDir, runtimeName)}
${buildEdgeClientProtocol(edge, generator2)}
${buildDebugInitialization(edge)}
const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)${deno ? "\nexport { exports as default, Prisma, PrismaClient }" : ""}
${buildNFTAnnotations(dataProxy2, engineType, platforms, relativeOutdir)}
`;
    return code;
  }
  toTS(edge = false) {
    if (edge === true)
      return `export * from './index'`;
    const prismaClientClass = new PrismaClientClass(
      this.dmmf,
      this.options.datasources,
      this.options.outputDir,
      this.options.browser,
      this.options.generator,
      this.options.sqliteDatasourceOverrides,
      import_path6.default.dirname(this.options.schemaPath)
    );
    const commonCode = commonCodeTS(this.options);
    const modelAndTypes = Object.values(this.dmmf.typeAndModelMap).reduce((acc, modelOrType) => {
      if (this.dmmf.outputTypeMap[modelOrType.name]) {
        acc.push(new Model(modelOrType, this.dmmf, this.genericsInfo, this.options.generator));
      }
      return acc;
    }, []);
    const prismaEnums = this.dmmf.schema.enumTypes.prisma.map((type) => new Enum(type, true).toTS());
    const modelEnums = this.dmmf.schema.enumTypes.model?.map((type) => new Enum(type, false).toTS());
    const fieldRefs = this.dmmf.schema.fieldRefTypes.prisma?.map((type) => new FieldRefInput(type).toTS()) ?? [];
    const countTypes = this.dmmf.schema.outputObjectTypes.prisma.filter((t) => t.name.endsWith("CountOutputType")).map((t) => new Count(t, this.dmmf, this.genericsInfo, this.options.generator));
    const code = `
/**
 * Client
**/

${commonCode.tsWithoutNamespace()}

${modelAndTypes.map((m) => m.toTSWithoutNamespace()).join("\n")}
${modelEnums && modelEnums.length > 0 ? `
/**
 * Enums
 */

${modelEnums.join("\n\n")}
` : ""}
${prismaClientClass.toTSWithoutNamespace()}

export namespace Prisma {
${(0, import_indent_string13.default)(
      `${commonCode.ts()}
${new Enum(
        {
          name: "ModelName",
          values: this.dmmf.mappings.modelOperations.map((m) => m.model)
        },
        true
      ).toTS()}

${prismaClientClass.toTS()}
export type Datasource = {
  url?: string
}

/**
 * Count Types
 */

${countTypes.map((t) => t.toTS()).join("\n")}

/**
 * Models
 */
${modelAndTypes.map((model) => model.toTS()).join("\n")}

/**
 * Enums
 */

${prismaEnums.join("\n\n")}
${fieldRefs.length > 0 ? `
/**
 * Field references 
 */

${fieldRefs.join("\n\n")}` : ""}
/**
 * Deep Input Types
 */

${this.dmmf.inputObjectTypes.prisma.reduce((acc, inputType) => {
        if (inputType.name.includes("Json") && inputType.name.includes("Filter")) {
          const needsGeneric = this.genericsInfo.inputTypeNeedsGenericModelArg(inputType);
          const innerName = needsGeneric ? `${inputType.name}Base<$PrismaModel>` : `${inputType.name}Base`;
          const typeName = needsGeneric ? `${inputType.name}<$PrismaModel = never>` : inputType.name;
          const baseName = `Required<${innerName}>`;
          acc.push(`export type ${typeName} = 
  | PatchUndefined<
      Either<${baseName}, Exclude<keyof ${baseName}, 'path'>>,
      ${baseName}
    >
  | OptionalFlat<Omit<${baseName}, 'path'>>`);
          acc.push(new InputType({ ...inputType, name: `${inputType.name}Base` }, this.genericsInfo).toTS());
        } else {
          acc.push(new InputType(inputType, this.genericsInfo).toTS());
        }
        return acc;
      }, []).join("\n")}

${this.dmmf.inputObjectTypes.model?.map((inputType) => new InputType(inputType, this.genericsInfo).toTS()).join("\n") ?? ""}

/**
 * Batch Payload for updateMany & deleteMany & createMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export const dmmf: runtime.BaseDMMF
`,
      2
    )}}`;
    return code;
  }
  toBrowserJS() {
    const code = `${commonCodeJS({
      ...this.options,
      runtimeName: "index-browser",
      browser: true
    })}
/**
 * Enums
 */

${this.dmmf.schema.enumTypes.prisma.map((type) => new Enum(type, true).toJS()).join("\n\n")}
${this.dmmf.schema.enumTypes.model?.map((type) => new Enum(type, false).toJS()).join("\n\n") ?? ""}

${new Enum(
      {
        name: "ModelName",
        values: this.dmmf.mappings.modelOperations.map((m) => m.model)
      },
      true
    ).toJS()}

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      \`PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues\`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
`;
    return code;
  }
};

// src/generation/generateClient.ts
var exists3 = (0, import_util3.promisify)(import_fs6.default.exists);
var GENERATED_PACKAGE_NAME = ".prisma/client";
var DenylistError = class extends Error {
  constructor(message) {
    super(message);
    this.stack = void 0;
  }
};
setClassName(DenylistError, "DenylistError");
async function buildClient({
  schemaPath: schemaPath2,
  runtimeDirs: runtimeDirs2,
  binaryPaths: binaryPaths2,
  outputDir: outputDir2,
  generator: generator2,
  dmmf: dmmf2,
  datasources: datasources2,
  engineVersion: engineVersion2,
  clientVersion: clientVersion3,
  projectRoot: projectRoot2,
  activeProvider: activeProvider2,
  dataProxy: dataProxy2,
  postinstall: postinstall2
}) {
  const document2 = getPrismaClientDMMF(dmmf2);
  const clientEngineType2 = getClientEngineType(generator2);
  const tsClientOptions = {
    document: document2,
    datasources: datasources2,
    generator: generator2,
    platforms: clientEngineType2 === "library" /* Library */ ? Object.keys(binaryPaths2.libqueryEngine ?? {}) : Object.keys(binaryPaths2.queryEngine ?? {}),
    schemaPath: schemaPath2,
    outputDir: outputDir2,
    clientVersion: clientVersion3,
    engineVersion: engineVersion2,
    projectRoot: projectRoot2,
    activeProvider: activeProvider2,
    dataProxy: dataProxy2,
    postinstall: postinstall2
  };
  const nodeTsClient = new TSClient({
    ...tsClientOptions,
    runtimeName: getNodeRuntimeName(clientEngineType2, dataProxy2),
    runtimeDir: runtimeDirs2.node
  });
  const edgeTsClient = new TSClient({
    ...tsClientOptions,
    dataProxy: true,
    runtimeName: "edge",
    runtimeDir: runtimeDirs2.edge
  });
  const fileMap2 = {};
  fileMap2["index.js"] = await JS(nodeTsClient, false);
  fileMap2["index.d.ts"] = await TS(nodeTsClient);
  fileMap2["index-browser.js"] = await BrowserJS(nodeTsClient);
  fileMap2["package.json"] = JSON.stringify(
    {
      name: GENERATED_PACKAGE_NAME,
      main: "index.js",
      types: "index.d.ts",
      browser: "index-browser.js",
      sideEffects: false
    },
    null,
    2
  );
  if (dataProxy2 === true) {
    fileMap2["edge.js"] = await JS(edgeTsClient, true);
    fileMap2["edge.d.ts"] = await TS(edgeTsClient, true);
  }
  if (generator2?.previewFeatures.includes("deno") && !!globalThis.Deno) {
    if (dataProxy2 === true) {
      const denoEdgeTsClient = new TSClient({
        ...tsClientOptions,
        dataProxy: true,
        runtimeName: "index.d.ts",
        runtimeDir: "../" + runtimeDirs2.edge,
        deno: true
      });
      fileMap2["deno/edge.js"] = await JS(denoEdgeTsClient, true);
      fileMap2["deno/index.d.ts"] = await TS(denoEdgeTsClient);
      fileMap2["deno/edge.ts"] = `
import './polyfill.js'
// @deno-types="./index.d.ts"
export * from './edge.js'`;
      fileMap2["deno/polyfill.js"] = "globalThis.process = { env: Deno.env.toObject() }; globalThis.global = globalThis";
    }
  }
  return {
    fileMap: fileMap2,
    prismaClientDmmf: document2
  };
}
async function getDefaultOutdir(outputDir2) {
  if (outputDir2.endsWith("node_modules/@prisma/client")) {
    return import_path7.default.join(outputDir2, "../../.prisma/client");
  }
  if (process.env.INIT_CWD && process.env.npm_lifecycle_event === "postinstall" && !process.env.PWD?.includes(".pnpm")) {
    if (import_fs6.default.existsSync(import_path7.default.join(process.env.INIT_CWD, "package.json"))) {
      return import_path7.default.join(process.env.INIT_CWD, "node_modules/.prisma/client");
    }
    const packagePath = await (0, import_pkg_up.default)({ cwd: process.env.INIT_CWD });
    if (packagePath) {
      return import_path7.default.join(import_path7.default.dirname(packagePath), "node_modules/.prisma/client");
    }
  }
  return import_path7.default.join(outputDir2, "../../.prisma/client");
}
async function generateClient(options) {
  const {
    datamodel,
    schemaPath,
    outputDir,
    transpile,
    generator,
    dmmf,
    datasources,
    binaryPaths,
    testMode,
    copyRuntime,
    copyRuntimeSourceMaps = false,
    clientVersion,
    engineVersion,
    activeProvider,
    dataProxy,
    postinstall
  } = options;
  const clientEngineType = getClientEngineType(generator);
  const { runtimeDirs, finalOutputDir, projectRoot } = await getGenerationDirs(options);
  const { prismaClientDmmf, fileMap } = await buildClient({
    datamodel,
    schemaPath,
    transpile,
    runtimeDirs,
    outputDir: finalOutputDir,
    generator,
    dmmf,
    datasources,
    binaryPaths,
    clientVersion,
    engineVersion,
    projectRoot,
    activeProvider,
    dataProxy,
    postinstall
  });
  const denylistsErrors = validateDmmfAgainstDenylists(prismaClientDmmf);
  if (denylistsErrors) {
    let message = `${bold(
      red("Error: ")
    )}The schema at "${schemaPath}" contains reserved keywords.
       Rename the following items:`;
    for (const error of denylistsErrors) {
      message += "\n         - " + error.message;
    }
    message += `
To learn more about how to rename models, check out https://pris.ly/d/naming-models`;
    throw new DenylistError(message);
  }
  await (0, import_fs_extra.ensureDir)(finalOutputDir);
  await (0, import_fs_extra.ensureDir)(import_path7.default.join(outputDir, "runtime"));
  if (generator?.previewFeatures.includes("deno") && !!globalThis.Deno) {
    await (0, import_fs_extra.ensureDir)(import_path7.default.join(outputDir, "deno"));
  }
  await Promise.all(
    Object.entries(fileMap).map(async ([fileName, file]) => {
      const filePath = import_path7.default.join(finalOutputDir, fileName);
      if (await exists3(filePath)) {
        await import_fs6.default.promises.unlink(filePath);
      }
      await import_fs6.default.promises.writeFile(filePath, file);
    })
  );
  const runtimeSourceDir = testMode ? eval(`require('path').join(__dirname, '../../runtime')`) : eval(`require('path').join(__dirname, '../runtime')`);
  if (copyRuntime || !import_path7.default.resolve(outputDir).endsWith(`@prisma${import_path7.default.sep}client`)) {
    const copyTarget = import_path7.default.join(outputDir, "runtime");
    await (0, import_fs_extra.ensureDir)(copyTarget);
    if (runtimeSourceDir !== copyTarget) {
      await copyRuntimeFiles({
        from: runtimeSourceDir,
        to: copyTarget,
        sourceMaps: copyRuntimeSourceMaps,
        runtimeName: getNodeRuntimeName(clientEngineType, dataProxy)
      });
    }
  }
  const enginePath = clientEngineType === "library" /* Library */ ? binaryPaths.libqueryEngine : binaryPaths.queryEngine;
  if (!enginePath) {
    throw new Error(
      `Prisma Client needs \`${clientEngineType === "library" /* Library */ ? "libqueryEngine" : "queryEngine"}\` in the \`binaryPaths\` object.`
    );
  }
  if (transpile === true && dataProxy !== true) {
    if (process.env.NETLIFY) {
      await (0, import_fs_extra.ensureDir)("/tmp/prisma-engines");
    }
    for (const [binaryTarget, filePath] of Object.entries(enginePath)) {
      const fileName = import_path7.default.basename(filePath);
      const target = process.env.NETLIFY && binaryTarget !== "rhel-openssl-1.0.x" ? import_path7.default.join("/tmp/prisma-engines", fileName) : import_path7.default.join(finalOutputDir, fileName);
      await overwriteFile(filePath, target);
    }
  }
  const schemaTargetPath = import_path7.default.join(finalOutputDir, "schema.prisma");
  if (schemaPath !== schemaTargetPath) {
    await import_fs6.default.promises.copyFile(schemaPath, schemaTargetPath);
  }
  const proxyIndexJsPath = import_path7.default.join(outputDir, "index.js");
  const proxyIndexBrowserJsPath = import_path7.default.join(outputDir, "index-browser.js");
  const proxyIndexDTSPath = import_path7.default.join(outputDir, "index.d.ts");
  if (!import_fs6.default.existsSync(proxyIndexJsPath)) {
    await import_fs6.default.promises.copyFile(import_path7.default.join(__dirname, "../../index.js"), proxyIndexJsPath);
  }
  if (!import_fs6.default.existsSync(proxyIndexDTSPath)) {
    await import_fs6.default.promises.copyFile(import_path7.default.join(__dirname, "../../index.d.ts"), proxyIndexDTSPath);
  }
  if (!import_fs6.default.existsSync(proxyIndexBrowserJsPath)) {
    await import_fs6.default.promises.copyFile(import_path7.default.join(__dirname, "../../index-browser.js"), proxyIndexBrowserJsPath);
  }
  try {
    const prismaCache = (0, import_env_paths.default)("prisma").cache;
    const signalsPath = import_path7.default.join(prismaCache, "last-generate");
    await import_fs6.default.promises.mkdir(prismaCache, { recursive: true });
    await import_fs6.default.promises.writeFile(signalsPath, Date.now().toString());
  } catch {
  }
}
function validateDmmfAgainstDenylists(prismaClientDmmf2) {
  const errorArray = [];
  const denylists = {
    models: [
      "PrismaClient",
      "Prisma",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "instanceof",
      "interface",
      "let",
      "new",
      "null",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield"
    ],
    fields: ["AND", "OR", "NOT"],
    dynamic: []
  };
  if (prismaClientDmmf2.datamodel.enums) {
    for (const it of prismaClientDmmf2.datamodel.enums) {
      if (denylists.models.includes(it.name) || denylists.fields.includes(it.name)) {
        errorArray.push(Error(`"enum ${it.name}"`));
      }
    }
  }
  if (prismaClientDmmf2.datamodel.models) {
    for (const it of prismaClientDmmf2.datamodel.models) {
      if (denylists.models.includes(it.name) || denylists.fields.includes(it.name)) {
        errorArray.push(Error(`"model ${it.name}"`));
      }
    }
  }
  return errorArray.length > 0 ? errorArray : null;
}
async function getGenerationDirs({
  testMode: testMode2,
  runtimeDirs: runtimeDirs2,
  generator: generator2,
  outputDir: outputDir2,
  datamodel: datamodel2,
  schemaPath: schemaPath2
}) {
  const useDefaultOutdir = testMode2 ? !runtimeDirs2 : !generator2?.isCustomOutput;
  const _runtimeDirs = {
    node: runtimeDirs2?.node || (useDefaultOutdir ? "@prisma/client/runtime" : "./runtime"),
    edge: runtimeDirs2?.edge || (useDefaultOutdir ? "@prisma/client/runtime" : "./runtime")
  };
  const finalOutputDir2 = useDefaultOutdir ? await getDefaultOutdir(outputDir2) : outputDir2;
  if (!useDefaultOutdir) {
    await verifyOutputDirectory(finalOutputDir2, datamodel2, schemaPath2);
  }
  const packageRoot = await (0, import_pkg_up.default)({ cwd: import_path7.default.dirname(finalOutputDir2) });
  const projectRoot2 = packageRoot ? import_path7.default.dirname(packageRoot) : process.cwd();
  return {
    runtimeDirs: _runtimeDirs,
    finalOutputDir: finalOutputDir2,
    projectRoot: projectRoot2
  };
}
async function verifyOutputDirectory(directory, datamodel2, schemaPath2) {
  let content;
  try {
    content = await import_fs6.default.promises.readFile(import_path7.default.join(directory, "package.json"), "utf8");
  } catch (e) {
    if (e.code === "ENOENT") {
      return;
    }
    throw e;
  }
  const { name } = JSON.parse(content);
  if (name === import_package.name) {
    const message = [`Generating client into ${bold(directory)} is not allowed.`];
    message.push("This package is used by `prisma generate` and overwriting its content is dangerous.");
    message.push("");
    message.push("Suggestion:");
    const outputDeclaration = findOutputPathDeclaration(datamodel2);
    if (outputDeclaration && outputDeclaration.content.includes(import_package.name)) {
      const outputLine = outputDeclaration.content;
      message.push(`In ${bold(schemaPath2)} replace:`);
      message.push("");
      message.push(`${dim(outputDeclaration.lineNumber)} ${replacePackageName(outputLine, red(import_package.name))}`);
      message.push("with");
      message.push(`${dim(outputDeclaration.lineNumber)} ${replacePackageName(outputLine, green(".prisma/client"))}`);
    } else {
      message.push(`Generate client into ${bold(replacePackageName(directory, green(".prisma/client")))} instead`);
    }
    message.push("");
    message.push("You won't need to change your imports.");
    message.push("Imports from `@prisma/client` will be automatically forwarded to `.prisma/client`");
    const error = new Error(message.join("\n"));
    throw error;
  }
}
function replacePackageName(directoryPath, replacement) {
  return directoryPath.replace(import_package.name, replacement);
}
function findOutputPathDeclaration(datamodel2) {
  const lines = datamodel2.split(/\r?\n/);
  for (const [i, line] of lines.entries()) {
    if (/output\s*=/.test(line)) {
      return { lineNumber: i + 1, content: line.trim() };
    }
  }
  return null;
}
function getNodeRuntimeName(engineType, dataProxy2) {
  if (dataProxy2) {
    return "data-proxy";
  }
  if (engineType === "binary" /* Binary */) {
    return "binary";
  }
  if (engineType === "library" /* Library */) {
    return "library";
  }
  assertNever(engineType, "Unknown engine type");
}
async function copyRuntimeFiles({ from, to, runtimeName, sourceMaps }) {
  const files = ["index.d.ts", "index-browser.js", "index-browser.d.ts"];
  files.push(`${runtimeName}.js`, `${runtimeName}.d.ts`);
  if (runtimeName === "data-proxy") {
    files.push("edge.js", "edge-esm.js");
  }
  if (sourceMaps) {
    files.push(...files.filter((file) => file.endsWith(".js")).map((file) => `${file}.map`));
  }
  await Promise.all(files.map((file) => import_fs6.default.promises.copyFile(import_path7.default.join(from, file), import_path7.default.join(to, file))));
}

// src/generation/utils/types/dmmfToTypes.ts
function dmmfToTypes(document2) {
  return new TSClient({
    document: document2,
    datasources: [],
    projectRoot: "",
    clientVersion: "",
    engineVersion: "",
    runtimeDir: "",
    runtimeName: "",
    schemaPath: "",
    outputDir: "",
    activeProvider: "",
    dataProxy: false
  }).toTS();
}

// src/generation/generator.ts
var debug5 = src_default("prisma:client:generator");
var pkg = require_package3();
var clientVersion2 = pkg.version;
if (process.argv[1] === __filename) {
  generatorHandler({
    onManifest(config2) {
      const requiredEngine = getClientEngineType(config2) === "library" /* Library */ ? "libqueryEngine" : "queryEngine";
      debug5(`requiredEngine: ${requiredEngine}`);
      return {
        defaultOutput: ".prisma/client",
        prettyName: "Prisma Client",
        requiresEngines: [requiredEngine],
        version: clientVersion2,
        requiresEngineVersion: import_engines_version.enginesVersion
      };
    },
    async onGenerate(options2) {
      const outputDir2 = typeof options2.generator.output === "string" ? options2.generator.output : parseEnvValue(options2.generator.output);
      return generateClient({
        datamodel: options2.datamodel,
        schemaPath: options2.schemaPath,
        binaryPaths: options2.binaryPaths,
        datasources: options2.datasources,
        outputDir: outputDir2,
        copyRuntime: Boolean(options2.generator.config.copyRuntime),
        copyRuntimeSourceMaps: Boolean(process.env.PRISMA_COPY_RUNTIME_SOURCEMAPS),
        dmmf: options2.dmmf,
        generator: options2.generator,
        engineVersion: options2.version,
        clientVersion: clientVersion2,
        transpile: true,
        activeProvider: options2.datasources[0]?.activeProvider,
        dataProxy: options2.dataProxy,
        postinstall: options2.postinstall
      });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dmmfToTypes,
  externalToInternalDmmf
});
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
