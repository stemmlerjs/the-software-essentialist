
import { PasswordValidator } from './index'

describe('password validator', () => {
  it('knows that "jamiE8" is between 5 and 15 characters long', () => {
    // Arrange & Act
    let output = PasswordValidator.validate();

    // Assert
    expect(output.result).toBeTruthy();
    expect(output.errors).toHaveLength(0);
  })
})


