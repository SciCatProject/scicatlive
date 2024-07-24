db = connect(`mongodb://localhost/${process.env.BE_VERSION === "v4"? "dacat-next": "dacat"}`);
seedFiles = fs.readdirSync("/seed");
seedFiles.forEach((filename) => {
  collectionName = filename.replace(/\.json$/, "");
  content = JSON.parse(fs.readFileSync("/seed/" + filename, "utf8"));
  db.createCollection(collectionName);
  db[collectionName].insertMany(content);
});
