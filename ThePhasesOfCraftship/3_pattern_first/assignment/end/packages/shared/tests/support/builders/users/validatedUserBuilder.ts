import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";
import { randomUUID } from "node:crypto";

export class ValidatedUserBuilder {
  private props: ValidatedUser;

  constructor() {
    this.props = {
      id: randomUUID(),
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: '',
    };
  }

  public withAllRandomDetails() {
    this.props.id = randomUUID()
    this.withFirstName(TextUtil.createRandomText(10));
    this.withLastName(TextUtil.createRandomText(10));
    this.withEmail(TextUtil.createRandomEmail());
    this.withUsername(TextUtil.createRandomText(10));
    return this;
  }

  public withFirstName(firstName: string) {
    this.props = {
      ...this.props,
      firstName,
    };
    return this;
  }

  public withLastName(lastName: string) {
    this.props = {
      ...this.props,
      lastName,
    };
    return this;
  }

  public withEmail(email: string) {
    this.props = {
      ...this.props,
      email,
    };
    return this;
  }

  public withUsername(username: string) {
    this.props = {
      ...this.props,
      username,
    };
    return this;
  }

  public build() {
    return this.props;
  }
} 
