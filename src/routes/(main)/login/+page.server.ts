import { validateRegister } from '$lib/server/validation';
import { hash, verify } from '@node-rs/argon2';
import { type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sessions, users, type NewUser, type User } from '$lib/server/db/schema';
import {
	createSession,
	generateSessionToken,
	generateUserId,
	invalidateSessionByUserId,
	setSessionTokenCookie
} from '$lib/server/db/auth';
import { eq } from 'drizzle-orm';
import { setFlash } from '$lib/flash/flash';

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		const [user] = await db.select().from(users).where(eq(users.username, username));
		if (!user) {
			return {
				success: false,
				data: { username },
				validation: {
					username: ['Username dan/ atau Password salah'],
					password: ['Username dan/ atau Password salah']
				}
			};
		}

		const [existingSession] = await db.select().from(sessions).where(eq(sessions.userId, user.id));

		if (user && existingSession) {
			await invalidateSessionByUserId(user.id);
		}

		const passwordIsVerified = await verify(user.passwordHash, password);

		if (!passwordIsVerified) {
			return {
				success: false,
				data: { username },
				validation: {
					username: ['Username dan/ atau Password salah'],
					password: ['Username dan/ atau Password salah']
				}
			};
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		setFlash(event, 'success', 'Berhasil login.', '/admin');
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		const validationResult = await validateRegister(username, password);

		if (validationResult.success) {
			const passwordHash = await hash(password);
			const userId = generateUserId();
			const user: NewUser = {
				id: userId,
				username,
				passwordHash
			};

			try {
				await db.insert(users).values(user);
			} catch {
				validationResult.success = false;
				validationResult.validation.username.push('Gagal membuat akun. Silakan coba lagi.');
			}
		}

		return {
			success: validationResult.success,
			data: { username },
			validation: validationResult.validation
		};
	}
} satisfies Actions;
