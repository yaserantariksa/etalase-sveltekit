// See https://svelte.dev/docs/kit/types#app.d.ts

import type { FlashMessage } from '$lib/flash/flash';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			etalaseFlash?: FlashMessage | null;
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
		}
		// interface PageData {}
		interface PageData {
			etalaseFlash?: FlashMessage | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
