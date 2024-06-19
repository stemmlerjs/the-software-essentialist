import { Config } from "../config";

export class ApplicationModule {
  constructor(private config: Config) {}

  protected getEnvironment() {
    return this.config.getEnvironment();
  }

  protected getScript() {
    return this.config.getScript();
  }

  get shouldBuildFakeRepository() {
    return (
      this.getScript() === "test:unit" ||
      this.getEnvironment() === "development"
    );
  }
}
