const generateInsertSlsQuery = data => {
	const filteredEntries = Object.entries(data).filter(
		([key]) => ['timeDuration', 'stakeLimit', 'hotPercentage','restrictionExpires'].indexOf(key) > -1,
	);

	const query = `
    UPDATE
      sls_sls
    SET
			${filteredEntries.map(([key, value]) => `"${key}" = '${value}'`)}
    WHERE
			"id" = ${data.id}
		RETURNING
			"id",
			"timeDuration",
			"stakeLimit",
			"hotPercentage",
			"restrictionExpires"
		`;

	return query;
};

module.exports =  generateInsertSlsQuery;
