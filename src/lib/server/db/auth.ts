import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCase, encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { sessions, users, type NewSession, type Session, type User } from './schema';
import { db } from '$lib/server/db/index';
import { type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/**
 * Number of milliseconds in a day
 */
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Name of the cookie used to store the session token
 */
export const SESSION_COOKIE_NAME = 'etalase-session';

/**
 * Generates a new user ID
 * @returns {string} userId
 */
export function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const userId = encodeBase32LowerCase(bytes);
	return userId;
}

/**
 * Generates a new session token
 * @returns {string} token
 */
export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

/**
 * Creates a new session in the database
 *
 * @async
 * @function createSession
 * @param {string} token
 * @param {string} userId
 * @returns {Promise<NewSession>}  new session
 */
export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: NewSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};

	await db.insert(sessions).values(session);
	return session;
}

/**
 * Sets the session token cookie in the user's browser
 *
 * @function setSessionTokenCookie
 * @param {RequestEvent} event
 * @param {string} token
 * @param {Date} expiresAt
 */
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(SESSION_COOKIE_NAME, token, {
		expires: expiresAt,
		path: '/'
	});
}

/**
 * Validates a session token
 *
 * @async
 * @function validateSessionToken
 * @param {string} token
 * @returns {Promise<{ user: User | null; session: Session | null }>}
 */
export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			user: { id: users.id, username: users.username },
			session: sessions
		})
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId));

	if (!result) {
		return { user: null, session: null };
	}

	const { user, session } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(sessions).where(eq(sessions.id, session.id));
		return { user: null, session: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessions.id, session.id));
	}

	return { user, session };
}

/**
 * Type of the result returned by validateSessionToken
 */
export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

/**
 * Invalidates a session by deleting it from the database
 *
 * @async
 * @function invalidateSession
 * @param {string} sessionId
 */
export async function invalidateSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

/**
 *
 * @param {RequestEvent}event
 */
export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}

export async function invalidateSessionByUserId(userId: string) {
	await db.delete(sessions).where(eq(sessions.userId, userId));
}
