import { setFlash } from '$lib/flash/flash';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/db/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(303, '/admin');
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);

		setFlash(event, 'success', 'Berhasil logout.', '/login');
	}
};
