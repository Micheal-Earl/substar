import type { Session, User } from "@supabase/supabase-js";
import supabase from "./client";
import cookie from "cookie";

/**
 * TODO: refactor setAuthCookie and removeAuthCookie
 * TODO: Invalidate tokens on expiration (or refresh with refresh token)
 */

interface DecodedPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {};
  role: string;
  aal: string;
  amr: [{
    method: string;
    timestamp: number;
  }];
}

interface AuthCookie {
  accessCookie: string | null;
  refreshCookie: string | null;
  error: string | null;
}

/**
 * Returns a response object with the access token and refresh token set as cookies in the
 * response headers.
 * @param {Session} session The supabase session object
 * @returns {Response} A response object with the auth cookie set
 */
export function setAuthCookie(
  session: Session,
): AuthCookie {
  let error = null;

  if (!session) {
    error = "Session not found";
    return { accessCookie: null, refreshCookie: null, error };
  }

  const { access_token, refresh_token, expires_in } = session;

  const accessCookie = cookie.serialize("access", access_token, {
    maxAge: expires_in,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  const refreshCookie = cookie.serialize("refresh", refresh_token, {
    maxAge: expires_in,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  // return new Response(
  //   JSON.stringify({ message: "Auth cookie set" }),
  //   {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Set-Cookie": [accessCookie, refreshCookie].filter(Boolean).join("; "),
  //     },
  //   },
  // );

  return { accessCookie, refreshCookie, error };
}

/**
 * Returns a response object that sets the auth cookies to empty values.
 * @returns {Response} A response object with the auth cookie set
 */
export function removeAuthCookie(): string {
  const emptyCookie = cookie.serialize("access", "", {
    maxAge: -1,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  // const redirect_response = Response.redirect("/", 302);
  // redirect_response.headers.set("Set-Cookie", emptyCookie);

  return emptyCookie;
}

/**
 * Gets the access token from the request cookies
 * @param {Request} req The request object
 * @returns {string} The access token or null if not found
 */
export function getAccessToken(req: Request): string | null {
  const c = cookie.parse(req.headers.get("cookie") ?? "");
  if (!c.access) {
    return null;
  }
  return c.access;
}

/**
 * Gets the refresh token from the request cookies
 * @param {Request} req The request object
 * @returns {string} The refresh token or null if not found
 */
export function getRefreshToken(req: Request): string | null {
  const c = cookie.parse(req.headers.get("cookie") ?? "");
  if (!c.refresh) {
    return null;
  }
  return c.refresh;
}

/**
 * Decodes the access token and returns the user data
 * @param {string | null} encoded_token The access token
 * @returns {DecodedPayload | null} The user data as a JSON object or null if not found
 */
export function decodeToken(
  encoded_token: string | null,
): DecodedPayload | null {
  if (!encoded_token) return null;

  /*
   * The payload of the token is the second part of the token, separated by a dot. The payload is
   * base64 encoded, so we need to decode it first. It contains the user data.
   */
  const payload = encoded_token.split(".")[1];

  const decoded_token = Buffer.from(payload, "base64")
    .toString();

  return JSON.parse(decoded_token) as DecodedPayload;
}

/**
 * A function to check if the token is expired
 * @param {DecodedPayload | null} decoded_payload The decoded payload of the token
 * @returns {boolean} True if the token is expired, false otherwise
 */
export function isTokenExpired(
  decoded_payload: DecodedPayload | null,
): boolean {
  if (!decoded_payload) return true;

  const expiration_unix_timestamp = decoded_payload.exp;

  if (!expiration_unix_timestamp) return true;

  return (Date.now() / 1000) > expiration_unix_timestamp;
}

/**
 * A wrapper around supabase.auth.api.getUser() that returns the user related to the access token
 * that is stored in the requests cookies.
 * @async
 * @param {Request} req The request object
 * @returns {Promise<User | null>} The user object or null if not found
 */
export async function getUser(req: Request): Promise<User | null> {
  const access_token = getAccessToken(req);
  if (!access_token) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser(access_token);
  if (!user || user.role !== "authenticated") {
    return null;
  }
  return user;
}

/**
 * A utility function that checks if the user is logged in
 * @async
 * @param {Request} req The request object
 * @returns {Promise<boolean>} True if the user is logged in, false otherwise}
 */
export async function isLoggedIn(req: Request): Promise<boolean> {
  return await getUser(req) != null;
}

export async function refreshSession() {
  // TODO: Use refresh token to refresh session
  // const { data, error } = await supabase.auth.refreshSession()
  // const { session, user } = data
}
