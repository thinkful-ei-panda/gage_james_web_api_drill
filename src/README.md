Assignment
For this assignment, we've made a Node script that you will need to debug and fix. The fix is very small (it's only missing one method call).

The Node script accepts two arguments: a text file and a target directory. The script reads the contents of the text file and creates multiple files based on what it reads. The files it creates will be placed in the target directory specified by the second argument.

We'll give you the requirements that were used to write the script, examples of how to use it and the script itself. Below this, we'll explain what the bug is and give you some hints at how to fix it.

Requirements
The buggy-script.js accepts two arguments
The first argument is the path to a text file, we'll call this source.
The second argument is the name of a target directory, we'll call this target.
The source file should be a file with the .txt extension
The file contains multiple lines of text
For each line, the first word is a filename to create inside the target dir.
The remaining words on the line are the contents of the file being created.
Iterate over each line in the source file to create a new file in the target dir.
Here are examples of running the script

node buggy-script.js ./project-outline.txt ./my-project
node buggy-script.js ~/Downloads/textfile.txt foo-folder
And here's an example for the contents of the source textfile argument:

.gitignore node_modules
README.md Welcome to my project!
.env NODE_ENV=development
index.js console.log('Hello, world!');
The following is buggy-script.js. You should create a new folder called intro_to_node and create the buggy-script.js inside it:

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
  fs.writeFileSync(
    newFilePath,
    contentArr,
    { flag: 'w+', encoding: 'utf-8' }
  );
});
You can try running this file from your command line, but this exercise is to specifically use the Debugger to hunt down the bug. Open Visual Studio Code in your intro_to_node folder, click the "Debug" icon on the left, and then the "Cog" configuration icon. As demonstrated in the example above, set your launch.json options to run the buggy-script.js file with the appropriate arguments:

  {
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
+   "program": "${workspaceFolder}/buggy-script.js",
+   "args": [] /* put the arguments here in separate string elements! */
  }
The bug!
The bug in this script concerns the contents of one of the files it creates.

When the source.txt contains a line like this: README.md Welcome to my project!
We expect a README.md file to be created with the content: Welcome to my project!
The correct README.md is created inside the target argument directory, but the content is wrong
The content becomes Welcome,to,my,project!... All of the spaces have been replaced with commas!
You need to fix the script so that it doesn't replace the spaces with commas when creating the files.

This fix should take about 20 minutes to complete. If you're having trouble, attend a Q&A session or reach out on Slack for help.

Hints
Try running the file with the correct arguments and using the debugger to see if you can understand what's happening.
The script is using a combination of the fs module and the path module to work with files and file paths.
Try to read the official documentation for the fs.writeFile method to get an understanding of how the method is being used here.
Pay attention to the comments inside the script as they give clues to what is happening.