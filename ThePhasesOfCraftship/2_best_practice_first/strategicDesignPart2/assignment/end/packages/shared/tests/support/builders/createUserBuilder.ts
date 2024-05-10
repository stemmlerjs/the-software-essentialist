import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { TextUtil } from "@dddforum/shared/src/utils/textUtils";


export class CreateUserBuilder {
    private props: CreateUserParams;

    constructor() {
        this.props = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        }
    }

    public withAllRandomDetails() {
        this.withFirstName(TextUtil.createRandomText(10))
        this.withLastName(TextUtil.createRandomText(10))
        this.withEmail(TextUtil.createRandomEmail())
        this.withUsername(TextUtil.createRandomText(10))
        return this;
    }

    private withFirstName(firstName: string) {
        this.props = {
            ...this.props,
            firstName
        }
        return this;
    }

    private withLastName(lastName: string) {
        this.props = {
            ...this.props,
            lastName
        }
        return this;
    }

    private withEmail(email: string) {
        this.props = {
            ...this.props,
            email
        }
        return this;
    }

    private withUsername(username: string) {
        this.props = {
            ...this.props,
            username
        }
        return this;
    }

    public build() {
        return this.props;
    }
}
