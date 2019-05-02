
export const x = <T>(v: () => T, o?: () => any) => {
  try {
    return v();
  } catch {
    if (o) {
      return o();
    }
  }
};
