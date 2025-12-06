import {
	deleteSessionTokenCookie,
	SESSION_COOKIE_NAME,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/db/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Hooks for handle flash message
 * Check if there a value in event.locals.etalaseFlash then set cookie for flash message
 *
 * @function handleFlash
 * @returns response
 */
const handleFlash: Handle = async ({ event, resolve }) => {
	event.locals.etalaseFlash = undefined;
	const response = await resolve(event);
	
	if (event.locals.etalaseFlash) {
		response.headers.append(
			'set-cookie',
			`etalase-flash=${encodeURIComponent(JSON.stringify(event.locals.etalaseFlash))}; Path=/; HttpOnly; Max-Age=10`
		);
	}
	return response;
};

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(SESSION_COOKIE_NAME);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { user, session } = await validateSessionToken(sessionToken);

	if (session) {
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const handleRoute: Handle = async ({ event, resolve }) => {
	const url = event.url.pathname;
	const protectedRoutes = ['/admin'];
	const loginRoute = '/login';

	protectedRoutes.forEach((pathname) => {
		if (url.startsWith(pathname)) {
			if (!event.locals.user) {
				throw redirect(302, '/login');
			}
		}
	});

	if (url.startsWith(loginRoute)) {
		if (event.locals.user) {
			throw redirect(302, '/admin');
		}
	}
	return resolve(event);
};

export const handle = sequence(handleAuth, handleRoute, handleFlash);
