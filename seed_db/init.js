db = connect('mongodb://localhost/dacat');
seedFiles = fs.readdirSync('/seed');
seedFiles.forEach((filename) => {
  collectionName = filename.replace(/\.json$/, '');
  content = JSON.parse(fs.readFileSync('/seed/' + filename, 'utf8'));
  db.createCollection(collectionName);
  db[collectionName].insertMany(content);
});
