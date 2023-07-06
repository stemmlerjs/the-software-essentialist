
import { RegistrationFormProps } from "../components/registrationPage/registrationPageComponent";

export class RegistrationForm {
  private props: RegistrationFormProps;
  
  constructor (props: RegistrationFormProps) {
    this.props = props;
  }

  public static create (props: RegistrationFormProps): RegistrationForm | Error {
    
    // Validate basically
    if (!props.email.includes('@')) return new Error('Invalid email');
    if (props.firstName.length < 1 || props.firstName.length > 20) return new Error('Invalid firstName');
    if (props.lastName.length < 1 || props.lastName.length > 20) return new Error('Invalid lastName');
    if (props.userName.length < 1 || props.lastName.length > 20) return new Error('Invalid username');

    return new RegistrationForm(props);
  }

  public toCreateUserDTO () {
    return {
      username: this.props.userName,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email
    }
  }
}