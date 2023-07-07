export const limitText = (text) => {
	if (text.length > 50) {
		return text.substring(0, 90) + '...';
	} else {
		return text;
	}
};
