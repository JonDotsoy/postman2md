#!/usr/bin/env node

import { readFileSync, statSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { resolve } from 'path';
import { promisify } from 'util';
import { postman2md } from './postman2md';
import { get, Response, CoreOptions } from 'request';

const [, , pathCollectionInput, pathMarkdownInput] = process.argv;

(async () => {
  if (!pathCollectionInput || !pathMarkdownInput) {
    const d: string[] = [
      EOL,
      'Usage: postman2md <path_collection> <path_out_markdown>', EOL,
      EOL,
    ];

    console.log(d.join(''));
    return;
  }

  let bufferFileInput: Buffer;
  if (/^http?/i.test(pathCollectionInput)) {
    const req = await promisify<string, Response>(get)(pathCollectionInput);

    bufferFileInput = req.body;
  } else {
    const pathCollection = resolve(`${process.cwd()}/${pathCollectionInput}`);

    if (!statSync(pathCollection).isFile()) {
      throw new Error(`Cannot found ${pathCollection} file.`);
    }

    bufferFileInput = readFileSync(pathCollection);
  }

  const pathMarkdown = resolve(`${process.cwd()}/${pathMarkdownInput}`);

  const bufferMd = postman2md(bufferFileInput);

  writeFileSync(pathMarkdown, bufferMd);
})();
