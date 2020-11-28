const DEFAULT_SIZE = 20;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const MAX_SIZE = 1000;

const pagination = (req, res, next) => {
	const size = parseInt(req.query.size, 10);
	let page = parseInt(req.query.page, 10);
	let limit = parseInt(req.query.limit, 10);
	const offset = parseInt(req.query.offset, 10);

	if (limit > MAX_SIZE) {
		limit = MAX_SIZE;
	}

	res.locals.pagination = {
		size: size || limit || DEFAULT_SIZE,
		limit: limit || size || DEFAULT_LIMIT,
		page: page || offset / limit + 1 || DEFAULT_PAGE,
		offset: offset || size * --page || DEFAULT_OFFSET,
	};

	return next();
};

module.exports = pagination;
