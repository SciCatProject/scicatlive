db = connect('mongodb://localhost/dacat');
seedFiles = listFiles('/seed');
seedFiles.forEach((file) => {
  collectionName = file.baseName.replace(/\.json$/, '');
  content = JSON.parse(cat(file.name));
  db.createCollection(collectionName);
  db[collectionName].insertMany(content);
});
