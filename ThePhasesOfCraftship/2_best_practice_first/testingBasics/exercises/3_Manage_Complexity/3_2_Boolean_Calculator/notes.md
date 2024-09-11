**Description**: Create a boolean calculator that takes a boolean expression (as a string) and evaluates it to compute the correct output boolean result

## UPFRONT DESIGN

### FIND

#### Terms

- Value: `TRUE`, `FALSE`
- Operator:
    - Unary: `NOT`
    - Binary: `AND`, `OR`
- Expression: 
    - a valid group of Values, Operators and Expressions
    - can be grouped by parenthesis to express precedence
        - `#Value` -> `(#Value)`
        - `NOT #Value/#Expression` -> `(NOT #Value/#Expression)`
        - `#Value/#Expression #BinaryOperator #Value/#Expression` -> `(#Value/#Expression #BinaryOperator #Value/#Expression)`

#### Responsibilities
- evaluate expressions
    - Single values
        > "TRUE" -> true

        > "FALSE" -> false
    - NOT operator
        > "NOT TRUE" -> false

        > "NOT FALSE" -> TRUE
    - AND operator
        > "TRUE AND FALSE" -> false

        > "TRUE AND TRUE" -> true
    - OR operator
        > "TRUE OR FALSE" -> true

        > "FALSE OR FALSE" -> false
    - Parenthesis
        > "(TRUE OR TRUE OR TRUE) AND FALSE" -> false

        > "NOT (TRUE AND TRUE)" -> false
    - Combination of operators w/ precedence
        > NOT > AND > OR

        > "TRUE OR TRUE OR TRUE AND FALSE" -> true  
        "TRUE OR (TRUE OR (TRUE AND FALSE))" -> true

        > "TRUE OR FALSE AND NOT FALSE" -> true  
        "TRUE OR (FALSE AND (NOT (FALSE)))" -> true
- validate expression
    - Expression must start with Expression or NOT
        > (()) -> ok  
        (NOT ()) -> ok  
        (OR ()) -> not ok
        (AND ()) -> not ok
    - Expression must be followed by Binary Operator or nothing
        >() -> ok  
        () OR -> not ok  
        () AND -> not ok
    - Binary Operator must be followed by Expression
        >() OR () -> ok  
        () OR AND () -> not ok
        () AND OR () -> not ok
    - `NOT` Operator must be followed by Expression
        >NOT () -> ok  
        NOT AND -> not ok  
        NOT OR -> not ok
    - Parenthesis
        - Each opening bracket must be closed by a closing bracket.
        - Opening brackets must be closed in the correct order. That means no closing bracket should interrupt the corresponding pair of an opening bracket.
        - Each closing bracket must have an associated opening bracket before it.

### ARCH

Algorithm to evaluate expressions without parenthesis

    1. Evaluate NOTs
    2. Evaluate ANDs
    3. Evaluate ORs

    Input:

    TRUE AND NOT TRUE AND TRUE OR NOT NOT FALSE OR TRUE OR TRUE AND TRUE

    TRUE AND FALSE AND TRUE OR NOT TRUE OR TRUE OR TRUE AND TRUE // Evaluate NOTs
    TRUE AND FALSE AND TRUE OR FALSE OR TRUE OR TRUE AND TRUE // Evaluate NOTs

    FALSE AND TRUE OR FALSE OR TRUE OR TRUE // Evaluate ANDs
    FALSE OR FALSE OR TRUE OR TRUE // Evaluate ANDs

    FALSE OR TRUE // Evaluate ORs
    TRUE // Evaluate ORs