
// tslint:disable-next-line:function-name
export function C(bcol: any[] = []) {
  return bcol
    ? Buffer.concat(
      bcol
        .map((v) => {
          if (Buffer.isBuffer(v)) return v;
          if (typeof v === 'string') return Buffer.from(v);
          if (Array.isArray(v)) {
            const b = C(v) as Buffer;
            return b;
          }
        })
        .filter(Boolean) as Buffer[],
    )
    : Buffer.from('');
}
