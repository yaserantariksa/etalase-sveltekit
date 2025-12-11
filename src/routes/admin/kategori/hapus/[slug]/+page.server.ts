import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { setFlash } from '$lib/flash/flash';

export const load: PageServerLoad = async (event) => {
	const slug = event.params.slug;
	const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
	return {
		category
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const [category] = await db.select().from(categories).where(eq(categories.name, name));
		const isDeleted = await db.delete(categories).where(eq(categories.id, category.id));
		if (isDeleted) {
			setFlash(event, 'success', `Berhasil menghapus kategori: ${name}`, '/admin/kategori');
		} else {
			return {
				validation: {
					name: [`Gagal menghapus kategori: ${name}`]
				}
			};
		}
	}
} satisfies Actions;
