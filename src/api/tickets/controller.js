const psql = require('../../config/db.js');
const loadQuery = require('../../utils/load-query.js');
const asyncHandler = require('../../utils/async')
const queryPath = `${__dirname}/queries/`;
const ErrorResponse = require("../../utils/errorResponse");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone')

// @desc Create ticket 
// @route POST /api/v1/tickets/:id
// @acces Public

const createTicket = asyncHandler(async (req, res, next) => {
	const deviceId = req.params.id;
	const { stake } = req.body;
	const uuid = uuidv4()

	const querySls = await loadQuery(`${queryPath}get-sls.sql`);
	const queryTicket = await loadQuery(`${queryPath}get-tickets-device.sql`);
	const queryCreate = await loadQuery(`${queryPath}create-blocked_dev.sql`);
	const queryDrop = await loadQuery(`${queryPath}drop-blocked_dev.sql`);
	const queryIsBlocked = await loadQuery(`${queryPath}get-blocked.sql`);
	const queryInsert = await loadQuery(`${queryPath}create-ticket.sql`);

	// Current time
	let CurrentDate = moment().tz('Europe/Sarajevo')

	let {rows:blocked} = await psql.query(queryIsBlocked,[deviceId]);


	if( blocked.length >= 1 && (blocked[0].blockedUntil.toISOString() > CurrentDate.toISOString()  || blocked[0].perminentRestriction === true)) {
		return next(new ErrorResponse(`Device is blocked`),404)
	}else {
		await psql.query(queryDrop,[deviceId]);
	}
	
	if (!stake || stake < 1 || stake > 100000) {
		return next(new ErrorResponse(`Please enter a valid amount for the stake`),404)
	};

	// Get Sls
	const { rows:slsRows } = await  psql.query(querySls, [deviceId]);
	const { timeDuration,stakeLimit,hotPercentage,restrictionExpires} = slsRows[0];
	
	// Get Tickets from device 
	const { rows:ticketRows } = await  psql.query(queryTicket, [deviceId,timeDuration]);
	
	// Sum of stakes
	const hot = (hotPercentage/100) * stakeLimit;
	let sum = stake;
	ticketRows.forEach(ticket => sum += ticket.stake)
	const deviceState = sum < hot ? "OK" : (sum >= hot && sum < stakeLimit ? "HOT" : "BLOCKED");

	// time offset restrictionExpires
	var CurrentDateOffset = moment().tz('Europe/Sarajevo')
	CurrentDateOffset.add(restrictionExpires, 'minutes')

	let perminentBlock = false;
	if(restrictionExpires === 0) perminentBlock = true
	if(deviceState === 'BLOCKED') await psql.query(queryCreate,[deviceId,CurrentDateOffset,perminentBlock]);


	psql.query(queryInsert, [uuid,deviceId,stake], (err, results) => {
		if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(201).json({status:deviceState,data:results.rows[0]})
	});
});

// @desc GET single ticket
// @route GET /api/v1/tickets/:id
// @acces Public

const getTicket = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const query = await loadQuery(`${queryPath}get-ticket.sql`);


	const {rows} = await psql.query(query, [id],(err, results) => {
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
