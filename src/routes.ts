/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/signin",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const protectedRoutes = {
  started: "/started",
  // launch: "/launch",
  overview: "/overview",
  applicants: "/applicants",
  campaign: "/campaign",
  events: "/events",
  games: "/games",
  results: "/results",
  users: "/users",
};

export const protectedMainRoutes = {
  overview: "/overview",
  applicants: "/applicants",
  campaign: "/campaign",
  events: "/events",
  games: "/games",
  results: "/results",
  users: "/users",
};

export const protectedSubRoutes = {
  started: "/started",
  launch: "/launch",
};

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
// export const apiAuthPrefix = "/api/auth";
// export const API_URL: string = "";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_MAIN: string = "/overview";
export const DEFAULT_LOGIN_REDIRECT_SUB: string = "/started";
export const PAGE_NOT_FOUND: string = "/not-found";
