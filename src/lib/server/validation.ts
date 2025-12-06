import { db } from './db';

let success = true;
const validation = {
	username: [] as string[],
	password: [] as string[]
};

/**
 * Validates user registration input
 * 
 * @async
 * @function validateRegister
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ success: boolean; validation: { username: string[]; password: string[] } }>} Validation result
 */
export async function validateRegister(username: string, password: string) {
	const usernameRegex = /^(?=.{5,20}$)[a-z](?:[a-z]|[_.](?=[a-z]))*$/;

	// form validation: check if fields are empty
	if (!username) {
		success = false;
		if (!username) validation.username.push('Username harus diisi!');
	} else {
		// form validation: check if username meets criteria
		if (typeof username === 'string' && !usernameRegex.test(username)) {
			success = false;
			validation.username.push('Username harus berupa huruf kecil');
			validation.username.push('Diawali dengan huruf, 5-20 karakter');
			validation.username.push('Dapat mengandung underscore (_) atau titik (.) di antara huruf.');
		}

		// form validation: check if user is exists
		const user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.username, username),
			columns: { id: true, username: true }
		});

		if (user) {
			success = false;
			validation.username.push('Username sudah terdaftar.');
		}
	}

	if (!password) {
		success = false;
		if (!password) validation.password.push('Password harus diisi!');
	} else {
		// form validation: check if password length is at least 6 characters
		if (typeof password === 'string' && password.length < 6) {
			success = false;
			validation.password.push('Password harus terdiri dari minimal 6 karakter.');
		}
	}

	return {
		success,
		validation
	};
}
