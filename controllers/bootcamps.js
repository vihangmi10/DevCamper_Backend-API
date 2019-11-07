const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');
const geoCode = require('../utils/geocoder');

// @desc    Get all the bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
const getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res
        .status(200)
        .json({
            success: true,
            count: bootcamps.length,
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
