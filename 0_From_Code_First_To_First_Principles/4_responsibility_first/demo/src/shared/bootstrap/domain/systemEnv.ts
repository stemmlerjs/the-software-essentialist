
export type SystemEnvType = 'dev' | 'test' | 'prod'

export class SystemEnv {
  private value: SystemEnvType;

  private constructor (value: SystemEnvType) {
    this.value = value;
  }

  getValue () {
    return this.value;
  }

  public static create (value: any): SystemEnv {
    if (Array.isArray(value)) value = value[0];
    if (value === 'dev' || value === 'test' || value === 'prod') return new SystemEnv(value);
    return new SystemEnv('dev');
  }
}