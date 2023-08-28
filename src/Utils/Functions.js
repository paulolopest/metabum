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

export function formatCPF(cpf) {
	const cleanedCPF = cpf.replace(/\D/g, '');
	const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;

	if (cpfRegex.test(cleanedCPF)) {
		return cleanedCPF.replace(cpfRegex, '$1.$2.$3-$4');
	} else {
		return cpf;
	}
}

export const formatDate = (date) => {
	const data = new Date(date);

	const day = data.getUTCDate().toString().padStart(2, '0');
	const month = (data.getUTCMonth() + 1).toString().padStart(2, '0');
	const year = data.getUTCFullYear();

	return `${day}/${month}/${year}`;
};
