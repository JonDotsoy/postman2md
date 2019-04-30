// tslint:disable:max-line-length
import { EOL } from 'os';
import { Auth, Header, HttpsSchemaGetpostmanComJsonCollectionV210 as Col, Information, Item, Items1, Request } from './HttpsSchemaGetpostmanComJsonCollectionV210';

const C = (bcol: any[]) => bcol && Buffer.concat(
  bcol
    .map((v) => {
      if (Buffer.isBuffer(v)) return v;
      if (typeof v === 'string') return Buffer.from(v);
      if (Array.isArray(v)) {
        const b: Buffer = C(v);
        return b;
      }
    })
    .filter(Boolean) as Buffer[],
);

const codeSection = (d: string, type = '') => C([
  '```', type, EOL,
  d, EOL,
  '```', EOL,
]);

const codeJsonSection = (d: any, type = 'json') => codeSection(
  JSON.stringify(d, null, 4),
  type,
);

const x = <T>(v: () => T, o?: () => any) => {
  try {
    return v();
  } catch {
    if (o) {
      return o();
    }
  }
};

const headerSection = (info: Information) => C([
  `# API ${info.name}`,
  EOL,
  info.description,
  EOL,
]);

const renderAuthTypes = (auth: Auth) => {
  switch (auth.type) {
    case 'bearer': {
      return auth.bearer && auth.bearer.map(
        authelm => C([
          `- Header Bearer: \`Bearer ${authelm.value}\``, EOL,
        ]),
      );
    }
  }
};

const authSection = (auth?: null | Auth) => auth && C([
  '## Auth', EOL,
  renderAuthTypes(auth), EOL,
]);

const authSubSection = (auth?: null | Auth) => auth && C([
  '**Auth**', EOL,
  renderAuthTypes(auth), EOL,
]);

const sectionVariablesSection = (variable: Col['variable']) => variable && C([
  '## Variables', EOL,
  '| Variable | Type | Sample value |', EOL,
  '| ---- | ---- | ---- |', EOL,
  variable.map(variable => C([
    `| ${variable.key} | ${variable.type} | ${variable.value} |`, EOL,
  ])), EOL,
]);

const itemsSection = (items: Col['item']) => C([
  '## Items', EOL,
  ...subItemSection(items),
]);

const itemSection = (item: Item, path = '') => {
  const request = item.request as Request;
  const auth = request.auth;
  const header = request.header;
  const body = request.body;
  // const response = request.response as Response[];

  return C([
    `### \`${request.method}\`: ${item.name}`, EOL,
    request.description && [`${request.description}`, EOL, EOL],
    urlSubSection(request), EOL,
    auth && authSubSection(auth),
    headerSubSection(header),
    bodySubSection(body),
    sampleSubSection(item),
  ]);
};

const sampleSubSection = (item: Item) => {
  const request = item.request as Request;
  const method = request.method;
  const headers = request.header;
  const auth = request.auth;
  const body = request.body;

  if (!request.url) return;
  if (!(typeof request.url === 'object')) return;
  if (!request.url.raw) return;

  const uri = request.url.raw;

  const d: string[] = [
    `$ curl -X ${method} ${uri}`,
  ];

  if (headers && Array.isArray(headers) && headers.length) {
    headers.map((header) => {
      d.push(' \\');
      d.push(EOL);
      d.push(`    -H '${header.key}: ${header.value}'`);
    });
  }

  if (auth) {
    switch (auth.type) {
      case 'bearer': {
        auth.bearer && auth.bearer.map(
          (auth1) => {
            d.push(' \\');
            d.push(EOL);
            d.push(`    -H 'Authorization: Bearer ${auth1.value}'`);
          },
        );
        break;
      }
    }
  }

  if (body && body.mode) {
    switch (body.mode) {
      case 'raw': {
        if (!body.raw) break;

        const raw = body.raw as string;

        d.push(' \\');
        d.push(EOL);
        d.push(`    -d '${x(
          () => {
            const obj = JSON.parse(raw);
            return JSON.stringify(obj, null, 4);
          },
          () => raw,
        )}'`);
        break;
      }
    }
  }

  return C([
    '**Sample**', EOL,
    codeSection(d.join(''), 'shell'), EOL,
  ]);
};

const bodySubSection = (body: Request['body']) => {
  if (!body) return;

  const d = () => {
    switch (body.mode) {
      case 'raw': return body.raw && x(
        () => codeJsonSection(JSON.parse(body.raw as string)),
        () => codeSection(body.raw as string),
      );
    }
  };

  const e = d();

  return e && C([
    '**Body**', EOL,
    d(), EOL,
  ]);
};

const headerSubSection = (headers: string | Header[] | undefined) => {
  return headers && Array.isArray(headers) && headers.length && C([
    '**Header**', EOL, EOL,
    '| Header | type | Value | Description |', EOL,
    '| --- | --- | --- | --- |', EOL,
    headers.map(({ key = '', value = '', description = '', type = '' }) => C([
      `| ${key} | ${type} | ${value} | ${description} |`, EOL,
    ])), EOL,
  ]);
};

const subItemSection = (items: Items1[], path = '', bufferCollection: Buffer[] = []) => {
  items.map((item) => {
    if (item.request) {
      bufferCollection.push(itemSection(item as Item, path));
    }

    if (item.item) {
      subItemSection(
        item.item as Items1[],
        path ? `${path}/${item.name}` : item.name,
        bufferCollection,
      );
    }
  });

  return bufferCollection;
};

function urlSubSection(request: Request) {
  if (!request.url) return;
  if (!(typeof request.url === 'object')) return;
  if (!request.url.raw) return;

  const variable = request.url.variable;

  const variableChunk = variable && variable.length && [
    EOL,
    '**Path Variable**', EOL, EOL,
    variable && C([
      '| Key | Value | Description |', EOL,
      '| ---- | ---- | ---- |', EOL,
      variable.map(({ key = '', value = '', description = '' }) => C([
        `| ${key} | ${value} | ${description} |`, EOL,
      ])), EOL,
    ]),
  ];

  return C([
    `\`${request.url.raw}\``, EOL,
    variableChunk,
  ]);
}

export function collectionToMd(data: Col | string | Buffer) {
  const collection: Col = JSON.parse(data.toString());

  return C([
    headerSection(collection.info),
    authSection(collection.auth),
    sectionVariablesSection(collection.variable),
    itemsSection(collection.item),
  ]);
}
