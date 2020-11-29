const psql = require('../../config/db.js');
const loadQuery = require('../../utils/load-query.js');
const asyncHandler = require('../../utils/async')
const queryPath = `${__dirname}/queries/`;
const ErrorResponse = require("../../utils/errorResponse");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone')
const {ticketSchema} = require('./schema')
const Joi = require('joi')

// @desc Create ticket 
// @route POST /api/v1/tickets
// @acces Public

const createTicket = asyncHandler(async (req, res, next) => {
	const { stake,deviceId } = req.body;

	// Load queries
	const querySls = await loadQuery(`${queryPath}get-sls.sql`);
	const queryTicket = await loadQuery(`${queryPath}get-tickets-device.sql`);
	const queryCreate = await loadQuery(`${queryPath}create-blocked_dev.sql`);
	const queryDrop = await loadQuery(`${queryPath}drop-blocked_dev.sql`);
	const queryIsBlocked = await loadQuery(`${queryPath}get-blocked.sql`);
	const queryInsert = await loadQuery(`${queryPath}create-ticket.sql`);


	let currentDate = moment().tz('Europe/Sarajevo')
	let {rows:blocked} = await psql.query(queryIsBlocked,[deviceId]);


	let oldBlockedUntil;
	if(blocked.length) {
		if(blocked[0].blockedUntil.toISOString() > currentDate.toISOString()  || blocked[0].perminentRestriction === true) {
			return next(new ErrorResponse(`Device is blocked`,401))
		}else{
			oldBlockedUntil = blocked[0].blockedUntil;
			await psql.query(queryDrop,[deviceId]);
		}}

	await ticketSchema.validateAsync({ stake, deviceId });

	// Get Sls
	const { rows:slsRows } = await  psql.query(querySls, [deviceId]);
	let { timeDuration,stakeLimit,hotPercentage,restrictionExpires} = slsRows[0];

	/// 
	if (typeof oldBlockedUntil !== 'undefined') {
		const resultInMinutes = Math.round((currentDate - oldBlockedUntil) / 60000);
		timeDuration = (resultInMinutes < timeDuration) ? resultInMinutes : timeDuration 
	}

	// Get Tickets from device 
	const { rows:ticketRows } = await  psql.query(queryTicket, [deviceId,timeDuration]);
	
	// Sum of stakes
	const hot = (hotPercentage/100) * stakeLimit;
	let sum = ticketRows.reduce((acc,curr) => acc + curr.stake,stake);
	console.log(sum)
	const deviceState = sum < hot ? "OK" : (sum >= hot && sum < stakeLimit ? "HOT" : "BLOCKED");

	// time offset restrictionExpires
	let blockedUntil = moment().tz('Europe/Sarajevo')
	blockedUntil.add(restrictionExpires, 'minutes')

	let perminentBlock = restrictionExpires === 0;
	if(deviceState === 'BLOCKED') await psql.query(queryCreate,[deviceId,blockedUntil,perminentBlock]);

	psql.query(queryInsert, [uuidv4(),deviceId,stake], (err, results) => {
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


	psql.query(query, [id],(err, results) => {
		if (err || typeof results.rows[0] === 'undefined') return next(
			new ErrorResponse(`No ticket with id of ${id}`, 404));
		return res.status(200).json({status:true,data:results.rows[0]})
	});
	
});


// @desc GET all tickets
// @route GET /api/v1/tickets
// @acces Public

const getTickets = asyncHandler(async (req, res, next) => {
	const {limit,offset} = res.locals.pagination;

	const query = await loadQuery(`${queryPath}get-all-tickets.sql`);

	psql.query(query,[limit,offset], (err, results) => {
        if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(200).json({status:true,data:results.rows,message:'All tickets !'})
	});
});


module.exports = {getTickets,getTicket,createTicket}
