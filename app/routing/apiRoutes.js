var notes = require('../data/notes');

module.exports = function(app) {
  app.get('/api/notes', function(req, res) {
    res.json(notes.getNotes());
  });

  app.post('/api/notes', function(req, res) {
    var newNote = req.body;
    notes.addNote(newNote);

    res.json(newNote);
  });

  app.delete('/api/notes/:id', function(req, res) {
    notes.removeNote(req.params.id);

    res.end();
  });
};
