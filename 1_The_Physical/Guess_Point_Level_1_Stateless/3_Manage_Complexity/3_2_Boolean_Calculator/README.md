# Boolean Calculator (#booleanCalculator)

> Note: This one is hard.

> Create a boolean calculator that takes a boolean expression (as a string) and evaluates it to compute the correct output boolean result 

Here are more details about what it should be able to do:

1. Single values

> "TRUE" -> true
> "FALSE" -> false

2. NOT operator

> "NOT TRUE" -> false

3. AND operator

> "TRUE AND FALSE" -> false
> "TRUE AND TRUE" -> true

4. OR operator

> "TRUE OR FALSE" -> true
> "FALSE OR FALSE" -> false

5. Combination of operators w/ precedence

It should allow you to provide any combination of the operators, but it should give precedence in this order:

- NOT
- AND
- OR

Here are some examples:

> "TRUE OR TRUE OR TRUE AND FALSE" -> true
> "TRUE OR FALSE AND NOT FALSE" -> true

6. Parenthesis

> "(TRUE OR TRUE OR TRUE) AND FALSE" -> false
> "NOT (TRUE AND TRUE)" -> false

## Getting started

To set up the project, run the following command:

```bash
npm run install
```

## To run the tests in development mode

To run the tests and have them reload when you save, run the following command:

```bash
npm run test:dev
```