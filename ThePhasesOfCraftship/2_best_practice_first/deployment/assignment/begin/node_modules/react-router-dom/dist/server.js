'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var router = require('@remix-run/router');
var reactRouter = require('react-router');
require('react-dom');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}

// Thanks https://github.com/sindresorhus/type-fest!

// One-time check for submitter support
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(document.createElement("form"),
      // @ts-expect-error if FormData supports the submitter parameter, this will throw
      0);
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    process.env.NODE_ENV !== "production" ? router.UNSAFE_warning(false, `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` ` + `and will default to "${defaultEncType}"`) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("action");
    action = attr ? router.stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
    }

    // <button>/<input type="submit"> may override attributes of <form>

    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? router.stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;

    // Build a FormData object populated from a form and submitter
    formData = new FormData(form, target);

    // If this browser doesn't support the `FormData(el, submitter)` format,
    // then tack on the submitter value at the end.  This is a lightweight
    // solution that is not 100% spec compliant.  For complete support in older
    // browsers, consider using the `formdata-submitter-polyfill` package
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(`Cannot submit element that is not <form>, <button>, or ` + `<input type="submit|image">`);
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }

  // Send body for <Form encType="text/plain" so we encode it into text
  if (formData && encType === "text/plain") {
    body = formData;
    formData = undefined;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}

//#endregion
// HEY YOU! DON'T TOUCH THIS VARIABLE!
//
// It is replaced with the proper version at build time via a babel plugin in
// the rollup config.
//
// Export a global property onto the window for React Router detection by the
// Core Web Vitals Technology Report.  This way they can configure the `wappalyzer`
// to detect and properly classify live websites as being built with React Router:
// https://github.com/HTTPArchive/wappalyzer/blob/main/src/technologies/r.json
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
  // no-op
}

//#endregion

////////////////////////////////////////////////////////////////////////////////
//#region Contexts
////////////////////////////////////////////////////////////////////////////////
const ViewTransitionContext = /*#__PURE__*/React__namespace.createContext({
  isTransitioning: false
});
if (process.env.NODE_ENV !== "production") {
  ViewTransitionContext.displayName = "ViewTransition";
}

// TODO: (v7) Change the useFetcher data from `any` to `unknown`

const FetchersContext = /*#__PURE__*/React__namespace.createContext(new Map());
if (process.env.NODE_ENV !== "production") {
  FetchersContext.displayName = "Fetchers";
}
if (process.env.NODE_ENV !== "production") ;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * The public API for rendering a history-aware `<a>`.
 */
const Link = /*#__PURE__*/React__namespace.forwardRef(function LinkWithRef({
  onClick,
  relative,
  reloadDocument,
  replace,
  state,
  target,
  to,
  preventScrollReset,
  unstable_viewTransition,
  ...rest
}, ref) {
  let {
    basename
  } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);

  // Rendered into <a href> for absolute URLs
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX$1.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to;

    // Only check for external origins client-side
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = router.stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          // Strip the protocol/origin/basename for same-origin absolute URLs
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        // We can't do external URL detection without a valid URL
        process.env.NODE_ENV !== "production" ? router.UNSAFE_warning(false, `<Link to="${to}"> contains an invalid URL which will probably break ` + `when clicked - please update to a valid URL path.`) : void 0;
      }
    }
  }

  // Rendered into <a href> for relative URLs
  let href = reactRouter.useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    unstable_viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    React__namespace.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});
if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
/**
 * A `<Link>` wrapper that knows if it's "active" or not.
 */
const NavLink = /*#__PURE__*/React__namespace.forwardRef(function NavLinkWithRef({
  "aria-current": ariaCurrentProp = "page",
  caseSensitive = false,
  className: classNameProp = "",
  end = false,
  style: styleProp,
  to,
  unstable_viewTransition,
  children,
  ...rest
}, ref) {
  let path = reactRouter.useResolvedPath(to, {
    relative: rest.relative
  });
  let location = reactRouter.useLocation();
  let routerState = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
  let {
    navigator,
    basename
  } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
  let isTransitioning = routerState != null &&
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && unstable_viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = router.stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }

  // If the `to` has a trailing slash, look at that exact spot.  Otherwise,
  // we're looking for a slash _after_ what's in `to`.  For example:
  //
  // <NavLink to="/users"> and <NavLink to="/users/">
  // both want to look for a / at index 6 to match URL `/users/matt`
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /*#__PURE__*/React__namespace.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to,
    unstable_viewTransition: unstable_viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */
const Form = /*#__PURE__*/React__namespace.forwardRef(({
  fetcherKey,
  navigate,
  reloadDocument,
  replace,
  state,
  method = defaultMethod,
  action,
  onSubmit,
  relative,
  preventScrollReset,
  unstable_viewTransition,
  ...props
}, forwardedRef) => {
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = submitter?.getAttribute("formmethod") || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace,
      state,
      relative,
      preventScrollReset,
      unstable_viewTransition
    });
  };
  return /*#__PURE__*/React__namespace.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";
}
if (process.env.NODE_ENV !== "production") ;
//#endregion

////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////
var DataRouterHook = /*#__PURE__*/function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmit"] = "useSubmit";
  DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook["UseFetcher"] = "useFetcher";
  DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
  return DataRouterHook;
}(DataRouterHook || {});
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React__namespace.useContext(reactRouter.UNSAFE_DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : router.UNSAFE_invariant(false) : void 0;
  return ctx;
}

// External hooks

/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  unstable_viewTransition
} = {}) {
  let navigate = reactRouter.useNavigate();
  let location = reactRouter.useLocation();
  let path = reactRouter.useResolvedPath(to, {
    relative
  });
  return React__namespace.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();

      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set
      let replace = replaceProp !== undefined ? replaceProp : reactRouter.createPath(location) === reactRouter.createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        unstable_viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, unstable_viewTransition]);
}

/**
 * Submits a HTML `<form>` to the server without reloading the page.
 */

/**
 * Submits a fetcher `<form>` to the server without reloading the page.
 */

function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => `__${String(++fetcherId)}__`;

/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
  let currentRouteId = reactRouter.UNSAFE_useRouteId();
  return React__namespace.useCallback((target, options = {}) => {
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        unstable_flushSync: options.unstable_flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        unstable_flushSync: options.unstable_flushSync,
        unstable_viewTransition: options.unstable_viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}

// v7: Eventually we should deprecate this entirely in favor of using the
// router method directly?
function useFormAction(action, {
  relative
} = {}) {
  let {
    basename
  } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
  let routeContext = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? router.UNSAFE_invariant(false, "useFormAction must be used inside a RouteContext") : router.UNSAFE_invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath
  let path = {
    ...reactRouter.useResolvedPath(action ? action : ".", {
      relative
    })
  };

  // If no action was specified, browsers will persist current search params
  // when determining the path, so match that behavior
  // https://github.com/remix-run/remix/issues/927
  let location = reactRouter.useLocation();
  if (action == null) {
    // Safe to write to this directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    path.search = location.search;

    // When grabbing search params from the URL, remove any included ?index param
    // since it might not apply to our contextual route.  We add it back based
    // on match.route.index below
    let params = new URLSearchParams(path.search);
    if (params.has("index") && params.get("index") === "") {
      params.delete("index");
      path.search = params.toString() ? `?${params.toString()}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }

  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : router.joinPaths([basename, path.pathname]);
  }
  return reactRouter.createPath(path);
}

/**
 * Return a boolean indicating if there is an active view transition to the
 * given href.  You can use this value to render CSS classes or viewTransitionName
 * styles onto your elements
 *
 * @param href The destination href
 * @param [opts.relative] Relative routing type ("route" | "path")
 */
function useViewTransitionState(to, opts = {}) {
  let vtContext = React__namespace.useContext(ViewTransitionContext);
  !(vtContext != null) ? process.env.NODE_ENV !== "production" ? router.UNSAFE_invariant(false, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  " + "Did you accidentally import `RouterProvider` from `react-router`?") : router.UNSAFE_invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = reactRouter.useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = router.stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = router.stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;

  // Transition is active if we're going to or coming from the indicated
  // destination.  This ensures that other PUSH navigations that reverse
  // an indicated transition apply.  I.e., on the list view you have:
  //
  //   <NavLink to="/details/1" unstable_viewTransition>
  //
  // If you click the breadcrumb back to the list view:
  //
  //   <NavLink to="/list" unstable_viewTransition>
  //
  // We should apply the transition because it's indicated as active going
  // from /list -> /details/1 and therefore should be active on the reverse
  // (even though this isn't strictly a POP reverse)
  return router.matchPath(path.pathname, nextPath) != null || router.matchPath(path.pathname, currentPath) != null;
}

//#endregion

/**
 * A `<Router>` that may not navigate to any other location. This is useful
 * on the server where there is no stateful UI.
 */
function StaticRouter({
  basename,
  children,
  location: locationProp = "/",
  future
}) {
  if (typeof locationProp === "string") {
    locationProp = reactRouter.parsePath(locationProp);
  }
  let action = router.Action.Pop;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state || null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
    basename: basename,
    children: children,
    location: location,
    navigationType: action,
    navigator: staticNavigator,
    future: future,
    static: true
  });
}
/**
 * A Data Router that may not navigate to any other location. This is useful
 * on the server where there is no stateful UI.
 */
function StaticRouterProvider({
  context,
  router: router$1,
  hydrate = true,
  nonce
}) {
  !(router$1 && context) ? process.env.NODE_ENV !== "production" ? router.UNSAFE_invariant(false, "You must provide `router` and `context` to <StaticRouterProvider>") : router.UNSAFE_invariant(false) : void 0;
  let dataRouterContext = {
    router: router$1,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = new Map();
  let hydrateScript = "";
  if (hydrate !== false) {
    let data = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    // Use JSON.parse here instead of embedding a raw JS object here to speed
    // up parsing on the client.  Dual-stringify is needed to ensure all quotes
    // are properly escaped in the resulting string.  See:
    //   https://v8.dev/blog/cost-of-javascript-2019#json
    let json = htmlEscape(JSON.stringify(JSON.stringify(data)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let {
    state
  } = dataRouterContext.router;
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(reactRouter.UNSAFE_DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/React__namespace.createElement(reactRouter.UNSAFE_DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React__namespace.createElement(FetchersContext.Provider, {
    value: fetchersContext
  }, /*#__PURE__*/React__namespace.createElement(ViewTransitionContext.Provider, {
    value: {
      isTransitioning: false
    }
  }, /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
    basename: dataRouterContext.basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: dataRouterContext.navigator,
    static: dataRouterContext.static,
    future: {
      v7_relativeSplatPath: router$1.future.v7_relativeSplatPath
    }
  }, /*#__PURE__*/React__namespace.createElement(DataRoutes, {
    routes: router$1.routes,
    future: router$1.future,
    state: state
  })))))), hydrateScript ? /*#__PURE__*/React__namespace.createElement("script", {
    suppressHydrationWarning: true,
    nonce: nonce,
    dangerouslySetInnerHTML: {
      __html: hydrateScript
    }
  }) : null);
}
function DataRoutes({
  routes,
  future,
  state
}) {
  return reactRouter.UNSAFE_useRoutesImpl(routes, undefined, state, future);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // deserializeErrors in react-router-dom/index.tsx :)
    if (router.isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      // Do not serialize stack traces from SSR for security reasons
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...(val.name !== "Error" ? {
          __subType: val.name
        } : {})
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless ` + `environment. This error was probably triggered when you did a ` + `\`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless ` + `environment. This error was probably triggered when you did a ` + `\`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere ` + `in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless ` + `environment. This error was probably triggered when you did a ` + `\`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless ` + `environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless ` + `environment.`);
    }
  };
}
function createStaticHandler(routes, opts) {
  return router.createStaticHandler(routes, {
    ...opts,
    mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
  });
}
function createStaticRouter(routes, context, opts = {}) {
  let manifest = {};
  let dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(routes, reactRouter.UNSAFE_mapRouteProperties, undefined, manifest);
  // Because our context matches may be from a framework-agnostic set of
  // routes passed to createStaticHandler(), we update them here with our
  // newly created/enhanced data routes
  let matches = context.matches.map(match => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = method => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: opts.future?.v7_partialHydration === true,
        v7_prependBasename: false,
        v7_relativeSplatPath: opts.future?.v7_relativeSplatPath === true,
        unstable_skipActionErrorRevalidation: false
      };
    },
    get state() {
      return {
        historyAction: router.Action.Pop,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        navigation: router.IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: new Map(),
        blockers: new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return undefined;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return router.IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return router.IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    _internalFetchControllers: new Map(),
    _internalActiveDeferreds: new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : reactRouter.createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : reactRouter.createPath(to);
  // Treating this as a full URL will strip any trailing spaces so we need to
  // pre-encode them since they might be part of a matching splat param from
  // an ancestor route
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function htmlEscape(str) {
  return str.replace(ESCAPE_REGEX, match => ESCAPE_LOOKUP[match]);
}

exports.StaticRouter = StaticRouter;
exports.StaticRouterProvider = StaticRouterProvider;
exports.createStaticHandler = createStaticHandler;
exports.createStaticRouter = createStaticRouter;
