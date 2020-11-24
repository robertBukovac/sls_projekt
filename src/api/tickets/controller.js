const psql = require('../../config/db.js');
const loadQuery = require('../../utils/load-query.js');
const asyncHandler = require('../../utils/async')
const queryPath = `${__dirname}/queries/`;
const ErrorResponse = require("../../utils/errorResponse");
const { v4: uuidv4 } = require('uuid');


// @desc Create ticket 
// @route POST /api/v1/tickets/:id
// @acces Public

const createTicket = asyncHandler(async (req, res, next) => {
	const deviceId = req.params.id;
	const { stake } = req.body;
	const uuid = uuidv4()

	const query1 = await loadQuery(`${queryPath}get-ticket-sls.sql`);
	const query2 = await loadQuery(`${queryPath}create-ticket.sql`);

	if (!stake || stake < 1 || stake > 100000) {
		return next(new ErrorResponse(`Please enter a valid amount for the stake`),404)
	};

	psql.query(query1, [deviceId], (err, results) => {
		if (err) return next(new ErrorResponse('Something went wrong', 404));
		const { timeDuration,stakeLimit,hotPercentage,restrictionExpires} = results.rows[0];
		const hot = (hotPercentage/100) * stakeLimit;
		let sum = stake;
		results.rows.forEach(ticket => sum += ticket.stake)
		console.log(sum)

		const deviceState = sum < hot ? "OK" : (sum >= hot && sum < stakeLimit ? "HOT" : "BLOCKED");

		

		psql.query(query2, [uuid,deviceId,stake], (err, results) => {
			if (err) return next(new ErrorResponse('Something went wrong', 404));
			return res.status(201).json({status:deviceState,data:results.rows[0]})
		});
	});
});

// @desc GET single ticket
// @route GET /api/v1/tickets/:id
// @acces Public

const getTicket = asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);
	const query = await loadQuery(`${queryPath}get-ticket.sql`);

	psql.query(query, [id], (err, results) => {
		if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(200).json({status:true,data:results.rows[0]})
	});
});


// @desc GET all tickets
// @route GET /api/v1/tickets
// @acces Public

const getTickets = asyncHandler(async (req, res, next) => {
	const query = await loadQuery(`${queryPath}get-all-tickets.sql`);

	psql.query(query, (err, results) => {
        if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(200).json({status:true,data:results.rows})
	});
});


module.exports = {getTickets,getTicket,createTicket}
