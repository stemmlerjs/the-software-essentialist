import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { NumberUtil } from "@dddforum/shared/src/utils/numberUtil";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

export class ValidatedUserBuilder {
  private props: ValidatedUser;

  constructor() {
    this.props = {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: '',
    };
  }

  public withAllRandomDetails() {
    this.props.id = NumberUtil.generateRandomInteger(100000, 8000000);
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
