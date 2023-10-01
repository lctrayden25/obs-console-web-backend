export const pagination = (page: number, limit: number, result: []) => {
	if (!page || !limit ) return result;

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const getResult = result?.slice(startIndex, endIndex);

	return getResult;
};
