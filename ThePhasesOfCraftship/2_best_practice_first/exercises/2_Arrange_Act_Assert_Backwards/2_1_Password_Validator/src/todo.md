# Responsibilities

## Doings

Validates password

## Knowings - Validates means it has to know what is valid or not

Knows that between 5 and 15 characters long IS valid - "password"
Knows that outside 5 and 15 characters long IS invalid - "mom"
Knows that with at least one digit IS valid - "password1",
Knows that without at least one digit IS invalid - "password"
Knows that with at least one upper case letter IS valid - "Password1"
Knows that without at least one upper case letter IS invalid - "password1"

## Input

"password"

## Output

```typescript
{
  result: false;
  errors: [
    {
      type: 'PasswordMustHaveAtLeastOneDigit',
      message: 'The password must have at least 1 digit',
    },
  ];
}
```
