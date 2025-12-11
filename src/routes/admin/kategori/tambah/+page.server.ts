import { setFlash } from '$lib/flash/flash';
import { db } from '$lib/server/db';
import { categories, type NewCategory } from '$lib/server/db/schema';
import { validateTitleName } from '$lib/server/validation';
import { slugify } from '$lib/utils/utils';
import type { Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const slug = slugify(name);

		const validationResult = validateTitleName(name);

		const [existingCategory] = await db.select().from(categories).where(eq(categories.slug, slug));

		if (existingCategory) {
			validationResult.success = false;
			validationResult.validation.name.push('Kategori sudah ada.');
		}

		if (!validationResult.success) {
			return {
				success: validationResult?.success,
				data: { name },
				valdation: validationResult?.validation
			};
		}
		const category: NewCategory = {
			name,
			slug
		};

		await db.insert(categories).values(category);
		setFlash(event, 'success', 'Berhasil menyimpan kategori.', '/admin/kategori');
	}
} satisfies Actions;
