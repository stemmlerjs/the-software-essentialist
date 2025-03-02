

type ValidKeys = 'currentUser';

export class LocalStorage {
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