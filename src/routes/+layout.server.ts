export const load = async (event) => {
	
	const flash = event.cookies.get('etalase-flash');
	if (flash) {
		event.cookies.delete('etalase-flash', { path: '/' });
		return {
			etalaseFlash: JSON.parse(flash)
		};
	}

	return {
		etalaseFlash: undefined
	};
};
