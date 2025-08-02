const express = require('express')
const { NoteSchema } = require('../schemas/note.schema')
const validator = require('express-joi-validation').createValidator({})
const { newNote, getNotes, getNote, updateNote, deleteNote } = require('../controllers/noteContoller')

// New API route with data validation for POST and PUT (using JOI)

const router = express.Router();

router.route('/notes').post(validator.body(NoteSchema), newNote);
router.route('/notes').get(getNotes);
router.route('/notes/:id').get(getNote);
router.route('/notes/:id').put(validator.body(NoteSchema), updateNote);
router.route('/notes/:id').delete(deleteNote);

module.exports = router;