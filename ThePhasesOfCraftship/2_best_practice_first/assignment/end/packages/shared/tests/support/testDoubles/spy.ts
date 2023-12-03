
type ValidMethodNames<T> = keyof T;

interface Call<T> {
  methodName: ValidMethodNames<T>;
  args: any[];
  context: any; // Additional contextual details about the call
}

export abstract class Spy<T> {
  protected calls: Call<T>[];

  constructor() {
    this.calls = [];
  }

  protected addCall<MethodName extends ValidMethodNames<T>>(methodName: MethodName, args: any[], context?: any) {
    const call: Call<T> = {
      methodName,
      args,
      context,
    };
    this.calls.push(call);
  }

  getCalls(): Call<T>[] {
    return this.calls;
  }

  getTimesMethodCalled<MethodName extends ValidMethodNames<T>>(methodName: MethodName) {
    const calls = this.calls.filter((call) => call.methodName === methodName);
    return calls.length;
  }

  reset () {
    this.calls = [];
  }
}