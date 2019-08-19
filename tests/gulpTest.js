const childProcess = require('child_process');
const path = require('path');
const assert = require('assert').strict;

const testsFolder = path.resolve('tests');

const result = childProcess.spawnSync('node', ['index.js', 'gulpfile.js', 'tests/_files']);
const output = result.stdout.toString();

const actual = output.trim("\n").split("\n");
const expected = [
    `1 => ${testsFolder}/_files/bc/gulpfile.js`,
    `0.8 => ${testsFolder}/_files/ab/gulpfile.js`,
    `0.8 => ${testsFolder}/_files/gulpfile.js`
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
