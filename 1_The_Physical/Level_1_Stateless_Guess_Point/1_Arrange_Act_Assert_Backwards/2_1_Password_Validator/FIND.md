
**Between 5 and 15 characters long**
- success
- jamiE8

- failure
  - jaE8
  - thePhysical1234567

**Contains at least one digit**
- Success
  Khalil8

- Failure
  khalil
  maxwellTheBe

**Contains at least one upper case letter**
- Success
  maXwell1_c

- Failure
  maxwell1_c
  
**Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.**

- https://www.figma.com/file/FXXY61rb2h3hAlard0ZBtU/Untitled?type=whiteboard&node-id=0-1&t=c8kBeMrPXmTPua6c-0
  
  // s
  ```typescript
  {
    result: false,
    errors: [
      'InvalidLength', 'NoDigitIncluded', 'MissingUpperCaseCharacter'
    ]
  }
  ```