var fs = require('fs');
var path = require('path');

class Notes {
  constructor() {
    this.store = [];
    this.syncStoreWithCache();
  }

  getNotes() {
    return this.store.slice(0);
  }

  addNote(note) {
    this.store.push(note);
    this.syncCacheWithStore();
  }

  removeNote(id) {
    this.store = this.store.filter(function(note) {
      return note.id !== id;
    });
    this.syncCacheWithStore();
  }

  syncStoreWithCache() {
    this.store = JSON.parse(
      fs.readFileSync(path.join(__dirname, './notes.json'), 'utf-8')
    );
  }

  syncCacheWithStore() {
    fs.writeFileSync(
      path.join(__dirname, './notes.json'),
      JSON.stringify(this.store)
    );
  }
}

module.exports = new Notes();
