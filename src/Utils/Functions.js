export const limitText = (text) => {
	if (text.length > 50) {
		return text.substring(0, 87) + '...';
	} else {
		return text;
	}
};

export const formattedPrice = (price) => {
	const formatted = price.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatted.replace('00', '99');
};
