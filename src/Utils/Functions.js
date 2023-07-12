export const limitText = (text, stringSize) => {
	if (text.length > 30) {
		return text.substring(0, stringSize) + '...';
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
