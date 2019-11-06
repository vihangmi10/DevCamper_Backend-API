const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all the bootcamps
// @route   GET
// @access  Public
const getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res
            .status(200)
            .json({
                success: true,
                count: bootcamps.length,
                data: bootcamps
            })
    } catch (err) {
        next(new ErrorResponse(`Unable to get all boot camps`, 404));
    }
};

// @desc    Get single bootcamp
// @route   GET
// @access  Public
const getSingleBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Unable to get boot camp for id ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        next(new ErrorResponse(`Unable to get boot camp for id ${req.params.id}`, 404));
    }
};

// @desc    Add single bootcamp
// @route   POST
// @access  Private
const createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res
            .status(201)
            .json({
                success: true,
                data: bootcamp
            });
    } catch (err) {
        next(new ErrorResponse(`Unable to create boot camp`, 400));
    }

};

// @desc    Update single bootcamp
// @route   PUT
// @access  Private
const updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp) {
            return next(new ErrorResponse(`Unable to update the boot camp for id ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: bootcamp });

    } catch (err) {
        next(new ErrorResponse(`Unable to update the boot camp for id ${req.params.id}`, 400))
    }

};

// @desc    Delete single bootcamp
// @route   DELETE
// @access  Private
const deleteBootcamp = async (req, res, next) => {
    try {
        const bootCamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootCamp) {
            return next(new ErrorResponse(`Unable to delete the boot camp for id ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(new ErrorResponse(`Unable to delete the boot camp for id ${req.params.id}`, 400))
    }
};


module.exports = {
    getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
};
