/**
 * Route should be accessible publicly for authentication api to work
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string} privateRoutes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Route for login
 * @type {string} privateRoutes
 */

export const loginRoute = "/auth/login";

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
 * Routes for successfull authentication redirect
 * @type {string} privateRoutes
 */

export const DEFAULT_LOGIN_REDIRECT = dashboardPrefix;

/**
 * Routes that are public
 * An array of routes that are publicly accessible
 * These routes will not be checked for authentication
 * @type {string[]} publicRoutes
 */

export const publicRoutes = ["/"];

/**
 * Routes should be accessible publicly for authentication to work
 * An array of routes that are used for authentication
 * These routes will redirect to the dashboard or predefined route if the user is already authenticated
 * @type {string[]} privateRoutes
 */
/**

/**
 * Route for registration page
 * Used for new user sign up
 * @type {string}
 */
export const registerPath = "/auth/register";

/**
 * Route for password reset page
 * Used for password recovery
 * @type {string}
 */
export const passwordResetPath = "/auth/password-reset";

/**
 * Route for authentication error page
 * Displayed when authentication fails
 * @type {string}
 */
export const authErrorPath = "/auth/error";

/**
 * Route for email verification page
 * Used for confirming user email addresses
 * @type {string}
 */
export const emailVerifyPath = "/auth/verify/email";

/**
 * Routes should be accessible publicly for authentication to work
 * An array of routes that are used for authentication
 * These routes will redirect to the dashboard if the user is already authenticated
 * @type {string[]}
 */
export const authRoutes = [
  loginRoute,
  registerPath,
  passwordResetPath,
  authErrorPath,
  emailVerifyPath
];
