const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all the bootcamps
// @route   GET
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
// @route   GET
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
// @route   PUT
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
// @route   DELETE
// @access  Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootCamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootCamp) {
        return next(new ErrorResponse(`Unable to delete the boot camp for id ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: {} });
});


module.exports = {
    getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
};
