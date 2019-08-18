const stringSimilarity = require('string-similarity');

const fs = require('fs');
const path = require('path');

async function* getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

if (process.argv[2]) {
  const givenFile = path.resolve(process.argv[2]);
  const givenFileName = path.basename(givenFile);
  const fileOrig = fs.readFileSync(givenFile, { encoding: 'utf8' });

  (async () => {
    for await (const file of getFiles(path.resolve(process.argv[3]))) {
      const fileName = path.basename(file);
      if (givenFileName === fileName && fs.lstatSync(file).isFile()) {
        const fileContent = fs.readFileSync(file, { encoding: 'utf8' });
        const similarity = stringSimilarity.compareTwoStrings(fileOrig, fileContent);
        console.log(`${similarity} => ${file}`);
      }
    }
  })()
}
