import { writeFileSync } from 'fs';
import { get } from 'https';
import { compile } from 'json-schema-to-typescript';
import { URL } from 'url';
import { resolve } from 'path';

const urlSchema = new URL('https://schema.getpostman.com/json/collection/v2.1.0/collection.json');

(async () => {
  const body = await new Promise<Buffer>((resolve, reject) => {
    get(urlSchema, (res) => {
      const body: Buffer[] = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('close', () => {
        resolve(Buffer.concat(body));
      });
    })
      .on('error', (error) => {
        reject(error);
      });
  });

  const d = await compile(JSON.parse(body.toString()), 'PostmanCollection');

  const outputFilePathDefinition = resolve(
    `${__dirname}/HttpsSchemaGetpostmanComJsonCollectionV210.d.ts`,
  );
  writeFileSync(outputFilePathDefinition, d);

  console.log(`File Definition writed: ${outputFilePathDefinition}`);
})();
