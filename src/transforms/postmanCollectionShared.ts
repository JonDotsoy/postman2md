// tslint:disable:max-line-length
import { EOL } from 'os';
import { Auth, Collection, HeaderData, PathVariableData, QueryParams, Request, Folder } from '../PostmanSchemaShared';
import { C } from '../utils/C';
import { b, code, codeBlock, h2, h3, list, p, paragraph, table, title1, title2, ul, h1, link } from '../utils/markdown';
import { BaseTransform } from './BaseTransform';

class Transform extends BaseTransform<Collection> {
  headerSection(): Buffer {
    const name = this.collection.name;
    const description = this.collection.description;

    return C([
      name && title1`${name}`,
      description && paragraph`${description}`,
    ]);
  }

  listAuthSubSection(auth: Auth) {
    const type = auth.type;
    const bearer = auth.bearer;

    switch (type) {
      case 'bearer': return bearer && C([
        bearer.map(bearer => C([
          p`${b`Type`}: Bearer Token`,
          codeBlock.http`Authorization: Bearer ${bearer.value}`,
        ])),
      ]);
    }
  }

  authSection() {
    const auth = this.collection.auth;

    return auth && C([
      title2`Authorization`,
      this.listAuthSubSection(auth),
    ]);
  }

  variablesSection() {
    const variables = this.collection.variables;

    return variables && C([
      h2`Variables`,
      list(variables.map(variable =>
        `${variable.key}: ${variable.value}`,
      )),
    ]);
  }

  requestHeaderSection(headerData: HeaderData[]) {
    return headerData.length && C([
      p`${b`Heders`}`,
      table(
        ['key', 'type', 'value', 'description'],
        ...headerData.map(
          ({ key, type, value, description }) =>
            [key, code`${type}`, value, description],
        ),
      ),
    ]);
  }

  requestSection(request: Request) {
    const {
      id,
      name,
      url,
      description,
      headerData,
      method,
      auth,
      rawModeData,
      pathVariableData,
      queryParams,
    } = request;

    return C([
      `<div id="${id}"></div>${EOL}${EOL}`,
      h3`${name}`,
      url && method && p`${code`${method}`} ${code`${url}`}`,
      description && p`${description}`,
      auth && [
        b`Authorization`, ' ',
        this.listAuthSubSection(auth),
      ],
      headerData && this.requestHeaderSection(headerData),
      pathVariableData && this.requestPathVariableData(pathVariableData),
      queryParams && this.requestQueryParams(queryParams),
      rawModeData && [
        p`${b`Body`}`,
        this.requestRawModeData(rawModeData),
      ],
      this.requestSample(request),
    ]);
  }

  requestSample(request: Request) {
    const {
      method,
      url,
      headerData,
      rawModeData,
    } = request;

    const headerDataL = !Array.isArray(headerData)
      ? []
      : headerData.map(h => `-H "${h.key}: ${h.value}"`);

    const rawModeDataL = rawModeData && `-d '${rawModeData}'`;

    const sampleBody = [
      `curl -X ${method} ${url}`,
      ...headerDataL,
      rawModeDataL,
    ]
      .filter(Boolean)
      .map((e, i) => i === 0 ? `$ ${e}` : `    ${e}`);

    return C([
      p`${b`Sample cURL`}`,
      codeBlock.shell`${sampleBody.join(` \\${EOL}`)}`,
      EOL,
    ]);
  }

  requestQueryParams(queryParams: QueryParams[]) {
    return queryParams.length > 0 && C([
      p`${b`Query Params`}`,
      table(
        ['key', 'value', 'description'],
        ...queryParams.map(
          ({ key, value, description }) =>
            [key, value, description],
        ),
      ),
    ]);
  }

  requestPathVariableData(pathVariableData: PathVariableData[]): any {
    return pathVariableData.length > 0 && C([
      p`${b`Path Variables`}`,
      table(
        ['key', 'value', 'description'],
        ...pathVariableData.map(
          ({ key, value, description }) =>
            [key, value, description],
        ),
      ),
    ]);
  }

  requestRawModeData(rawModeData: string): any {
    return codeBlock.json`${rawModeData}`;
  }

  requestsSection() {
    const requests = this.getOrderRequest();

    return requests && C([
      h2`Requests`,
      requests.map(request => this.requestSection(request)),
    ]);
  }

  getOrderRequest() {
    const rootFolders = this.collection.folders || [];
    const rootRequests = this.collection.requests || [];

    const resultorder: Request[] = [];

    const pushOrder = (folder: any) => {
      const foldersOrder = folder.folders_order as string[];
      const order = folder.order as string[];
      const folders = foldersOrder.map(e => rootFolders.find(({ id }) => e === id)) as Folder[];
      const requests = order.map(e => rootRequests.find(({ id }) => e === id)) as Request[];

      folders.forEach(pushOrder);
      resultorder.push(...requests);
    };

    pushOrder(this.collection);

    return resultorder;
  }

  menuSection() {
    const rootFolders = this.collection.folders || [];
    const rootRequests = this.collection.requests || [];
    const elms: any[] = [];

    const listElems = (obj: any, elms: any[]) => {
      const foldersOrder = obj.folders_order as string[];
      const order = obj.order as string[];
      const folders = foldersOrder.map(e => rootFolders.find(({ id }) => e === id)) as Folder[];
      const requests = order.map(e => rootRequests.find(({ id }) => e === id)) as Request[];

      folders.forEach((folder) => {
        elms.push(`${folder.name}${folder.description ? `: ${folder.description}` : ''}`);
        const nextElms: any[] = [];

        listElems(folder, nextElms);

        elms.push(nextElms);
      });

      requests.forEach((request) => {
        elms.push(
          link(`#${request.id}`)`${request.name}`,
        );
      });
    };

    listElems(this.collection, elms);

    return C([
      h2`Menu`,
      list(elms),
    ]);
  }
}

export function transform(collection: Collection) {
  const transformer = new Transform(collection);
  return transformer.transform();
}
