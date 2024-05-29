const fs = require("fs");

const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

const mergeJsonFiles = (inputPaths, outputPath) => {
  let mergedJson = {};

  inputPaths.forEach(filePath => {
    const jsonData = readJsonFile(filePath);
    mergedJson = { ...mergedJson, ...jsonData };
  });

  writeJsonFile(outputPath, mergedJson);
  console.log(`Merged JSON has been written to ${outputPath}`);
};

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Please provide at least one input file and one output file.");
  process.exit(1);
}
const outputPath = args.pop();

mergeJsonFiles(args, outputPath);
