const psql = require('../../config/db.js');
const loadQuery = require('../../utils/load-query.js');
const asyncHandler = require('../../utils/async')
const ErrorResponse = require("../../utils/errorResponse");
const queryPath = `${__dirname}/queries/`;


// @desc Create sls 
// @route POST /api/v1/sls/:id
// @acces Public

const createSls = asyncHandler(async (req, res, next) => {
	const deviceId = req.params.id;

	const query = await loadQuery(`${queryPath}create-sls.sql`);
	const { timeDuration,stakeLimit,hotPercentage,restrictionExpires } = req.body;

	if (!timeDuration || !stakeLimit || !hotPercentage || !restrictionExpires) {
		return next( new ErrorResponse('Please provide valid sls values', 404))}
	
	if (timeDuration >= 5 && timeDuration <= 1440 && stakeLimit >= 1 && stakeLimit <= 100000 && hotPercentage >= 1 && hotPercentage <= 100 && restrictionExpires >1 ){
		psql.query(query, [deviceId,timeDuration,stakeLimit,hotPercentage,restrictionExpires], (err, results) => {
			if (err) return (err, next);
			return res.status(201).json({status:true,data:results.rows[0],message: 'Sls successfully updated !'})});
	}else{
		return next(new ErrorResponse('Please provide valid sls values', 400))}
});

// @desc Get sls 
// @route GET /api/v1/sls/:id
// @acces Public

const getSls = asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);

	if(isNaN(id)){
		return next( new ErrorResponse(`Sls ID=NaN`, 404))}

	const query = await loadQuery(`${queryPath}get-sls.sql`);

	psql.query(query, [id], (err, results) => {
		if (err || typeof results.rows[0] === 'undefined') return next(
			new ErrorResponse(`No sls with id of ${id}`, 404)
		  );
		return res.status(200).json({status:true,data:results.rows[0]})
	});
});

// @desc Get all sls 
// @route GET /api/v1/sls
// @acces Public

const getAllSls = asyncHandler(async (req, res, next) => {
	const query = await loadQuery(`${queryPath}get-all-sls.sql`);

	psql.query(query, (err, results) => {
        if (err) return next(
			new ErrorResponse('Something went wrong', 404));
		return res.status(200).json({status:true,data:results.rows})
	});
});  

// @desc UPDATE sls 
// @route PATCH /api/v1/sls/:id
// @acces Public

const updateSls= asyncHandler(async (req, res, next) => {
	const id = parseInt(req.params.id);

	if(isNan(id)){
		return next( new ErrorResponse(`Sls ID=NaN`, 404))};

	const { timeDuration, stakeLimit,hotPercentage,restrictionExpires } = req.body;
	const query = await loadQuery(`${queryPath}update-sls.sql`);


	psql.query(query, [id, timeDuration, stakeLimit,hotPercentage,restrictionExpires], (err, results) => {
		if (err) return next( new ErrorResponse('Something went wrong', 404));
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
		return res.status(204).json({status:true,data:{},message: ' Sls successfully deleted'})
	});
});


module.exports = {createSls,getSls,getAllSls,deleteSls,updateSls}
