/**
 * Route should be accessible publicly for authentication api to work
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string} privateRoutes
*/
export const apiAuthPrefix = "/api/auth";

/**
 * Routes for successfull authentication redirect
 * @type {string} privateRoutes
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The prefix for admin routes
 * @type {string} privateRoutes
 */

export const adminPrefix = "/admin";

/**
 * The prefix for dashboard routes
 * @type {string} privateRoutes
 */

export const dashboardPrefix = "/dashboard";

/**
 * Routes that are public
 * An array of routes that are publicly accessible
 * These routes will not be checked for authentication
 * @type {string[]} publicRoutes
 */

export const publicRoutes = [
  "/",
]

/**
 * Routes should be accessible publicly for authentication to work
 * An array of routes that are used for authentication
 * These routes will redirect to the dashboard or predefined route if the user is already authenticated
 * @type {string[]} privateRoutes
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
]