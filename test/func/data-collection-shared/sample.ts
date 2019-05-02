import { readFileSync, writeFileSync } from 'fs';
import { postman2md } from '../../../src/postman2md';

async function sample() {
  const buffer = readFileSync(`${__dirname}/collection.json`);
  const result = postman2md(buffer);
  writeFileSync(`${__dirname}/collection.md`, result);
}

sample()
  .catch((error) => {
    console.log(error.stack || error);
  });
