import { postman2md } from '../../../src/postman2md';
import { readFileSync, writeFileSync } from 'fs';

async function sample() {
  const dataInput = readFileSync(`${__dirname}/collection.json`);
  const dataResult = postman2md(dataInput);

  writeFileSync(`${__dirname}/collection.md`, dataResult);
}

sample()
  .catch((error: Error) => {
    console.error(error.stack || error);
  });
