// tslint:disable:max-line-length
import { transform as transformExport2_1 } from './transforms/CollectionExport.ts/postmanCollectionExport';
import { transform as transformShared } from './transforms/postmanCollectionShared';

export function postman2md(data: string | Buffer) {
  const collection = JSON.parse(data.toString());

  if (testSchema2_1(collection)) {
    return transformExport2_1(collection);
  }

  if (testShared(collection)) {
    return transformShared(collection);
  }

  throw new TypeError('Collection is not valid');
}

function testShared(collection: any) {
  return true;
}

function testSchema2_1(collection: { info: { schema: string; }; }) {
  return collection.info
    && collection.info.schema
    && collection.info.schema === 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json';
}
