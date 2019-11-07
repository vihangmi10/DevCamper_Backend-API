const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');
const geoCode = require('../utils/geocoder');

// @desc    Get all the bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
// @query allowed  ?careers[in]=Business , averageCost[gte]=10000
// Get selected data fields from database if specified in the URL query params.
// Sort bootcamps with specified fields.
// add pagination based on page number and limit specified in the query params.
const getBootcamps = asyncHandler(async (req, res, next) => {
    // Advance filtering of queries
        // lte lt (Less than equal , less than)
        // gt, gte (greater than, greater than equal)
        // location.city
    // Getting it from query param;
    let query;
    // Do not consider certain query params like select as an advance filter
    // copy query params into reqQuery
    const reqQuery = { ... req.query };
    // Remove query params like select and sort if present from reqQuery
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); // attaching a $ sign before gt,gte,lt,lte,in
    query =  Bootcamp.find(JSON.parse(queryStr)); // Mongo query { $gt: [ "$qty", 250 ] }

    // query param will be select=name,description,email,phone
    if(req.query.select) {
        // select fields to be displayed as space separated values {name description email phone}
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    // Sort according to field specified in sort query param
    // ex. ?sort=name --> sort by name ascending ?sort=-name --> sort by name descending.
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    // Adding pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();
    query = query.skip(startIndex).limit(limit);
    const bootcamps = await query;
    // Pagination to let front end know if next page or previous page is present
    let pagination = {};
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit
        }
    }
    res
        .status(200)
        .json({
            success: true,
            count: bootcamps.length,
            pagination,
            data: bootcamps
        });
});

// @desc    Get single bootcamp
// @route   GET  /api/v1/bootcamps/:id
// @access  Public
const getSingleBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`Unable to get boot camp for id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Add single bootcamp
// @route   POST
// @access  Private
const createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res
        .status(201)
        .json({
            success: true,
            data: bootcamp
        });
});

// @desc    Update single bootcamp
// @route   PUT  /api/v1/bootcamps/:id
// @access  Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!bootcamp) {
        return next(new ErrorResponse(`Unable to update the boot camp for id ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete single bootcamp
// @route   DELETE  /api/v1/bootcamps/:id
// @access  Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootCamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootCamp) {
        return next(new ErrorResponse(`Unable to delete the boot camp for id ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: {} });
});

// @desc    Get all bootcamps within the radius
// @route   DELETE  /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private

const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get latitude and longitude from geocoder
    const loc = await geoCode.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calculate the radius by dividing the distance by radius of the earth
        // radius of the earth in miles 3,963 miles in KM 6,378 kms

    const radius = distance / 3963;

    // Find all bootcamps within the radius

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});

module.exports = {
    getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
};
