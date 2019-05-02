import { EOL } from 'os';

const toTemplate = (transform: (data: string) => string) =>
  (template: TemplateStringsArray, ...substitutions: any[]) =>
    transform(String.raw(template, ...substitutions));

export const titleN = (n: number) => toTemplate(data => `${'#'.repeat(n)} ${data}${EOL}`);

export const title1 = titleN(1);
export const title2 = titleN(2);
export const title3 = titleN(3);
export const title4 = titleN(4);
export const title5 = titleN(5);
export const title6 = titleN(6);

export const paragraph = toTemplate(data => `${data}${EOL.repeat(2)}`);

export const bold = toTemplate(data => `**${data}**`);
export const italic = toTemplate(data => `*${data}*`);
export const code = toTemplate(data => `\`${data}\``);

export const blockCodeTyped = (type = '') =>
  toTemplate(data => `\`\`\`${type}${EOL}${data}${EOL}\`\`\`${EOL}`);

export const codeBlock = new Proxy(blockCodeTyped(), {
  apply: (target, thisArg, args) => target.apply(thisArg, args),
  get: (t, p) => blockCodeTyped(p as string),
}) as ReturnType<typeof blockCodeTyped> & {
  [type: string]: ReturnType<typeof blockCodeTyped>,
};

export const list = (e: any, tabs: number = 0, symbolList: number | string = '-'): string => {
  const items = [].concat(e);
  const ul = items
    .map((item, i) => {
      const decorator = typeof symbolList === 'number' ? `${i + symbolList}.` : symbolList;

      if (typeof item === 'string') return `${'  '.repeat(tabs)}${decorator} ${item}${EOL}`;
      if (Array.isArray(item)) return list(item, tabs + 1);
    })
    .join('');

  return `${ul}${EOL}`;
};

export const link = (href: string, title?: string) =>
  toTemplate(data => `[${data}](${href}${title ? ` "${title}"` : ''})`);

export const image = (href: string, title?: string) =>
  toTemplate(data => `![${data}](${href}${title ? ` "${title}"` : ''})`);

export const cite = toTemplate(data => `> ${data}`);

export const breakLine = `  ${EOL}`;

export const table = (headers: string[], ...data: string[][]) => {
  const heder = `| ${headers.join(' | ')} |`;

  const separator = Array(headers.length).fill('----').join(' | ');

  return [
    heder,
    `| ${separator} |`,
    data.map(
      (a) => {
        const o = [
          ...a,
          ...Array(headers.length).fill(''),
        ]
          .splice(0, headers.length)
          .join(' | ');

        return `| ${o} |`;
      },
    ).join(EOL),
    EOL,
  ].join(EOL);
};

// Alias

export const br = breakLine;
export const ul = list;
export const h1 = title1;
export const h2 = title2;
export const h3 = title3;
export const h4 = title4;
export const h5 = title5;
export const h6 = title6;
export const p = paragraph;
export const b = bold;
export const i = italic;
