// An array of public routes that are accesible to public and do not requires authentiication
export const publicRoutes = ["/"];

//this routes will redirect logged in user to the protected routes
export const authRoutes = ["/auth/login", "/auth/register"];
//the prefix for api authentication routes
export const apiAuthPrefix = "/api/auth";

//by default where we ant to redirect users after loggged in

export const DEFAULT_LOGIN_REDIRECT = "/settings";
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";
