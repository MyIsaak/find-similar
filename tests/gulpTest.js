const childProcess = require('child_process');
const path = require('path');
const assert = require('assert').strict;

const testsFolder = path.resolve('tests').replace(/\\/g, "/");

const result = childProcess.spawnSync('node', ['index.js', `${testsFolder}/_files/a/gulpfile.js`, 'tests/_files/b']);
const output = result.stdout.toString();

const actual = output.replace(/\\/g, "/").trim("\n").split("\n");
const expected = [
    `1 => ${testsFolder}/_files/b/bc/gulpfile.js`,
    `0.8 => ${testsFolder}/_files/b/ab/gulpfile.js`,
    `0.8 => ${testsFolder}/_files/b/gulpfile.js`
];

try {
    assert.strictEqual(
        JSON.stringify(actual),
        JSON.stringify(expected)
    )
    console.log('OK');
} catch(error){
    assert.strictEqual(
        actual,
        expected
    )
    process.exit(1);
}
