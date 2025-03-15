import { LocalStorageAPI } from "./localStorageAPI";

export class FakeLocalStorage implements LocalStorageAPI {
  private storage: Record<string, string> = {};

  store(key: "currentUser", value: any): void {
    this.storage[key] = JSON.stringify(value);
  }

  retrieve(key: "currentUser"): any {
    const value = this.storage[key];
    return value ? JSON.parse(value) : null;
  }

  remove(key: "currentUser"): void {
    delete this.storage[key];
  }
}