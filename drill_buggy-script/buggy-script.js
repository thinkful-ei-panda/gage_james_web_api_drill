/* eslint-disable strict */
const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const target = process.argv[3];

// read contents of source
const contentsOfSource = fs.readFileSync(source, 'utf-8');

// get lines of source into an array, remove empty lines
const linesInSource = contentsOfSource.split('\n').filter(Boolean);

// make the target dir if it doesn't exist
if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

// iterate over the lines
linesInSource.forEach(line => {
  // get the content of the lines, first word is a filename, rest is content
  const [ filename, ...contentArr ] = line.split(' ');
  // construct the full path for the file to create
  const newFilePath = path.join(__dirname, target, filename);

  // write the file and it's contents
  // TESTING with '$ node buggy-script.js ./project-outline.txt ./my-project'
  // REQUIRED 'args' added to 'launch.json' file as follows:
  // "args": [ "./project-outline.txt", "./my-project" ]
  fs.writeFileSync(
    newFilePath,
    //contentArr, //this is where bug occurs
    contentArr.join(' '), //solves the bug
    { flag: 'w+', encoding: 'utf-8' }
  );
});