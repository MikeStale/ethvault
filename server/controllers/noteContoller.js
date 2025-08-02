const DataModel = require("../utils/dataModel");
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");

let _dataModel = new DataModel('notes.json')

// Create a new note
exports.newNote = asyncErrorHandler(async (req, res, next) => {

    let now_utc = new Date(new Date().toUTCString().slice(0, -4))

    req.body.created_date = now_utc
    req.body.updated_date = now_utc

    let created = await _dataModel.create(req.body)

    res.status(201).json({
        success: created ? true : false,
        created,
    });
})

// Get one note by ID
exports.getNote = asyncErrorHandler(async (req, res, next) => {
    
    let note = await _dataModel.findById(req.params.id)

    if (!note) {
        return next(new ErrorHandler("Note does not exist", 400))
    }

    res.status(201).json({
        success: note ? true : false,
        note,
    });
})

// Get all notes
exports.getNotes = asyncErrorHandler(async (req, res, next) => {
    
    let notes = await _dataModel.find()

    res.status(201).json({
        success: notes ? true : false,
        notes,
    });

})

// Update note by ID
exports.updateNote = asyncErrorHandler(async (req, res, next) => {

    let now_utc = new Date(new Date().toUTCString().slice(0, -4))
    req.body.updated_date = now_utc

    let updated = await _dataModel.findByIdAndUpdate(req.params.id, req.body)

    res.status(201).json({
        success: updated ? true : false,
        updated,
    });
})

// Delte note by ID
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
    
    let deleted = await _dataModel.findByIdAndDelete(req.params.id)

    res.status(201).json({
        success: deleted
    });

})