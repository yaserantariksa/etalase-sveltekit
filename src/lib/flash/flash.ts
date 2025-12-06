import { redirect, type RequestEvent } from '@sveltejs/kit';

/**
 * Flash Message Type
 */
export type FlashMessage = {
	type: 'success' | 'error' | 'info' | 'warning';
	message: string;
};

/**
 * Set event.locals.etalaseFlash with flash message type and message, then redirect to some url
 * 
 * @function setFlash
 * @param {RequestEvent}event
 * @param {FlashMessage['type']} type
 * @param {string} message
 * @param {string} redirectTo
 */
export function setFlash(
	event: RequestEvent,
	type: FlashMessage['type'],
	message: string,
	redirectTo: string
) {
	event.locals.etalaseFlash = { type, message };
	return redirect(302, redirectTo);
}
