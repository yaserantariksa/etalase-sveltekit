import { setFlash } from '$lib/flash/flash';
import { sql } from '$lib/server/neon';
import type { Actions } from '@sveltejs/kit';

export const load = async () => {
	const response = await sql`SELECT version()`;
	const { version } = response[0];
	return {
		version
	};
};

export const actions: Actions = {
	default: async (event) => {
		setFlash(event, 'error', 'Flash Message triggered successfully!', '/');
	}
};
