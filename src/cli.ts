#!/usr/bin/env node

import { resolve } from 'path';
import { EOL } from 'os';
import { statSync, readFileSync, writeFileSync } from 'fs';
import { collectionToMd } from './read-postman-collection';

const [, , pathCollectionInput, pathMarkdownInput] = process.argv;

(() => {
  if (!pathCollectionInput || !pathMarkdownInput) {
    const d: string[] = [
      EOL,
      'Usage: postman2md <path_collection> <path_out_markdown>', EOL,
      EOL,
    ];

    console.log(d.join(''));
    return;
  }

  const pathCollection = resolve(`${process.cwd()}/${pathCollectionInput}`);
  const pathMarkdown = resolve(`${process.cwd()}/${pathMarkdownInput}`);

  if (!statSync(pathCollection).isFile()) {
    throw new Error(`Cannot found ${pathCollection} file.`);
  }

  const bufferMd = collectionToMd(readFileSync(pathCollection));

  writeFileSync(pathMarkdownInput, bufferMd);
})();
