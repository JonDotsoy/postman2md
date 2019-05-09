import { C } from '../utils/C';

export class BaseTransform<T = any> {
  constructor(
    readonly collection: T,
  ) { }

  transform(): Buffer {
    return C([
      this.headerSection(),
      this.menuSection(),
      this.authSection(),
      this.variablesSection(),
      this.requestsSection(),
    ]);
  }

  menuSection(): Buffer | undefined {
    return C();
  }

  headerSection(): Buffer | undefined {
    return C();
  }

  authSection(): Buffer | undefined {
    return C();
  }

  variablesSection(): Buffer | undefined {
    return C();
  }

  requestsSection(): Buffer | undefined {
    return C();
  }
}
