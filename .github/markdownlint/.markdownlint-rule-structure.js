"use strict";

const fs = require("fs");
const path = require("path");

const getFileParts = (filePath) => {
  const relativePath = path.relative(`${process.cwd()}`, filePath);
  return relativePath.split(path.sep).filter(part => part !== "..");
}

const getRequiredSections = (params, parts) => {
  const fileName = parts[parts.length - 2];
  const hasDependencies = fs.existsSync(`${path.dirname(params.name)}/services`);

  const requiredSections = [
    new RegExp(`^# \\[?${fileName[0].toUpperCase()}${fileName.slice(1)}\\]?`, "m"),
    /^## Configuration options$/m,
    /^## Default configuration$/m,
    /^## Enable additional features$/m,
    ...(hasDependencies && [/^## Dependencies$/m] || []),
  ];
  return requiredSections;
}

const checkRequiredSections = (params, onError) => {
    const parts = getFileParts(params.name);
    if (parts[0] !== "services") return;
    const requiredSections = getRequiredSections(params, parts);
    const content = params.lines.join("\n");

    requiredSections.forEach((regex) => {
      const match = content.match(regex);
      if (!match)
        onError({
          lineNumber: 1,
          detail: `Context: ${regex.source}`,
        });
    });
}

const checkSectionsOrder = (params, onError) => {
    const parts = getFileParts(params.name);
    if (parts[0] !== "services") return;
    const requiredSections = getRequiredSections(params, parts);
    const content = params.lines.join("\n");

    const matches = [];
    let expectedOrder = "";
    let wrongOrder = false;
    let lastIndex = -1;
    for (const regex of requiredSections) {
      const match = content.match(regex);
      if (!match) continue;
      if (match.index < lastIndex) wrongOrder = true;
      expectedOrder += regex.source + ", ";
      matches.push([regex.source, match.index]);
      lastIndex = match.index;
    }

    if (!wrongOrder) return;
    const foundOrder = [...matches].sort((a, b) => a[1] - b[1]).map(m => m[0]);
    onError({
      lineNumber: 1,
      detail: `Context: found order: ${foundOrder.join(", "
      )}, expected order: ${expectedOrder.slice(0, -2)}`,
    });
  }

module.exports = [
  {
    names: ["required-sections"],
    description: "Missing required section",
    tags: ["structure", "headings"],
    function: checkRequiredSections,
  },
  {
    names: ["misordered-sections"],
    description: "Wrong sections order",
    tags: ["structure", "headings"],
    function: checkSectionsOrder,
  }]
