import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { slugify } from '$lib/utils/utils';
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
		let success = true;
		const validation: {
			name: string[];
		} = {
			name: []
		};
		const formData = await event.request.formData();
		const slug = formData.get('slug') as string;
		const [category] = await db.select().from(categories).where(eq(categories.slug, slug));

		const newName = formData.get('name') as string;
		const newSlug = slugify(newName);

		const [duplicateCategory] = await db.select().from(categories).where(eq(categories.slug, newSlug));

		if (duplicateCategory) {
			success = false;
			validation.name.push('Nama kategori sudah ada');
		}

		if (success) {
			const isUpdated = await db
				.update(categories)
				.set({ name: newName, slug: newSlug })
				.where(eq(categories.id, category.id));

			if (isUpdated) {
				setFlash(event, 'success', 'Berhasil Update Kategori', '/admin/kategori');
			} else {
				success = false;
				validation.name.push('Nama kategori sudah ada');
			}
		}

		return {
			success,
			validation
		};
	}
} satisfies Actions;
