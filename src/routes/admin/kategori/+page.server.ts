import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { count } from 'drizzle-orm';

export const load = async (event) => {
	const PAGE_SIZE = 3;
	const totalRow = (await db.select({ count: count() }).from(categories))[0].count;
	const totalPages = Math.ceil(totalRow / PAGE_SIZE);

	const pageSearchParamsResult = event.url.searchParams.get('page');

	let currentPage = 1;

	if (Number.isNaN(Number(pageSearchParamsResult))) {
		throw redirect(302, '/admin/kategori?page=1');
	} else {
		currentPage = Number(pageSearchParamsResult ?? 1);
	}

	if (currentPage > totalPages) {
		throw redirect(302, `/admin/kategori?page=${totalPages}`);
	}

	const categoriesData = await db
		.select()
		.from(categories)
		.limit(PAGE_SIZE)
		.offset((currentPage - 1) * PAGE_SIZE);
	return {
		categoriesData,
		totalRow,
		pageSize: PAGE_SIZE,
		currentPage,
		totalPages
	};
};
