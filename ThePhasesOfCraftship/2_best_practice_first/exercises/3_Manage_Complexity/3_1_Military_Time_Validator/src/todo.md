# Responsibilities

## Doings

Validate military time range

## Knowings

Knows that the date should be represented as a string

Knows that the 2 timestamps must be separated by a "-" character "00:00 - 23:59"

Knows that a timestamp must be separated by a ":" character - "00:00"
Knows that a timestamp must have 2 numbers on each side of the separator - "00:00"

Knows that the minutes of a time must be between 0 and 59 - "00:59" | "02:00"
Knows that the hour of a time must be between 0 and 23 - "00:00" | "23:00"
Knows that the minutes of a time that is outside 0 and 59 is invalid - "00:60" | "00:96"
Knows that the hour of a time that is outside 0 and 23 is invalid - "24:00" | "36:00"

## Input

"01:12 - 14:32"

## Output

true
