db = db.getSiblingDB('dacat');
db.Dataset.createIndex({"$**": "text"});
