const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-notes');
};

// New Note
notesCtrl.createNewNote = async (req, res) => {

  const {title, description} = req.body;
  const newNote = new Note({title, description});
  newNote.user = req.user.id;
  await newNote.save();
  req.flash('success_msg', 'Note Added successfully');
  res.redirect('/notes');

};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({user: req.user.id})
    .sort({createdAt: 'desc'})
    .lean();
  res.render("notes/all-notes", { notes });
};


notesCtrl.renderEditForm = async (req, res) => {
  const note =await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/notes');
  }
  res.render('notes/edit-note', {note});

};

notesCtrl.updateNote = async (req, res) => {

  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Note Updated successfully');
  res.redirect('/notes');

};

notesCtrl.deleteNote = async (req, res) => {
  const note =await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/notes');
  }

  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note Deleted successfully');
  res.redirect('/notes');
}

module.exports = notesCtrl;
