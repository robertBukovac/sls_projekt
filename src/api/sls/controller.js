const psql = require('../../config/db.js');
const loadQuery = require('../../utils/load-query.js');
const asyncHandler = require('../../utils/async')
const ErrorResponse = require("../../utils/errorResponse");
const queryPath = `${__dirname}/queries/`;
const generateInsertSlsQuery = require('../../utils/generate-insert-sls-query')
const {slsSchema} = require('./schema')
const Joi = require('joi')

// @desc Create sls 
// @route POST /api/v1/sls
// @acces Public

const createSls = asyncHandler(async (req, res, next) => {
	const query = await loadQuery(`${queryPath}create-sls.sql`);
	const { timeDuration,stakeLimit,hotPercentage,restrictionExpires,deviceId } = req.body;

	await slsSchema.validateAsync({ timeDuration, stakeLimit,hotPercentage,restrictionExpires,deviceId });

	psql.query(query, [deviceId,timeDuration,stakeLimit,hotPercentage,restrictionExpires], (err, results) => {
		if (err) return next(new ErrorResponse(`Something went wrong`, 404))
		return res.status(201).json({status:true,data:results.rows[0],message: 'Sls successfully created !'})});

});

// @desc Get sls 
// @route GET /api/v1/sls/:id
// @acces Public

const getSls = asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);

	if(isNaN(id)) return next( new ErrorResponse(`Sls ID=NaN`, 404))

	const query = await loadQuery(`${queryPath}get-sls.sql`);

	psql.query(query, [id], (err, results) => {
		if (err || typeof results.rows[0] === 'undefined') return next(
			new ErrorResponse(`No sls with id of ${id}`, 404));
		return res.status(200).json({status:true,data:results.rows[0],message: 'The Stake limit services you want !'})
	});
});

// @desc Get all sls 
// @route GET /api/v1/sls
// @acces Public

const getAllSls = asyncHandler(async (req, res, next) => {
	const {limit,offset} = res.locals.pagination;

	const query = await loadQuery(`${queryPath}get-all-sls.sql`);

	psql.query(query,[limit,offset],(err, results) => {
        if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(200).json({status:true,data:results.rows,message: 'All the Stake limit services you want !'})
	});
});  

// @desc UPDATE sls 
// @route PATCH /api/v1/sls/:id
// @acces Public

const updateSls= asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);
	const query = generateInsertSlsQuery({ id, ...req.body });

	psql.query(query,  async(err, results) => {
		if (err || typeof results.rows[0] === 'undefined') return next(
			new ErrorResponse(`No sls with id of ${id}`, 404));
		return res.status(201).json({status:true,data:results.rows[0],message: 'Sls successfully updated !'})
		
	});
});



// @desc DELETE sls 
// @route DELETE /api/v1/sls/:id
// @acces Public

const deleteSls = asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);
	const query = await loadQuery(`${queryPath}delete-sls.sql`);

	psql.query(query, [id], (err, results) => {
		if (err) return next(new ErrorResponse('Something went wrong', 404));
		return res.status(201).json({status:true,data:{},message:'Sls succesfully deleted'})
	});
});


module.exports = {createSls,getSls,getAllSls,deleteSls,updateSls}
