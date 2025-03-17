type ValidKeys = 'currentUser' | 'idToken' | 'authToken';

export interface LocalStorageAPI {
  store(key: ValidKeys, value: any): void;
  retrieve(key: ValidKeys): any;
  remove(key: ValidKeys): void;
}

export class LocalStorageAPIClient implements LocalStorageAPI {
  public store(key: ValidKeys, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public retrieve(key: ValidKeys) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public remove(key: ValidKeys) {
    localStorage.removeItem(key);
  }
}