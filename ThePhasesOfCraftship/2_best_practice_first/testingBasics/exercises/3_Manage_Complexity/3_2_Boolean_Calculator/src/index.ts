export type Expression = string;
export type Result = boolean;

export class BooleanCalculator {
    static run(expression: Expression): Result {
        const tokens: Expression[] = this.tokenize(expression);
        const { value } = this.parseExpression(tokens);
        return value;
    }

    private static tokenize(expression: Expression): Expression[] {
        return expression
            .replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .trim()
            .split(/\s+/);
    }

    private static parseExpression(tokens: string[]): { value: boolean; rest: string[] } {
        return this.parseOr(tokens);
    }

    private static parseOr(tokens: string[]): { value: boolean; rest: string[] } {
        let { value: left, rest } = this.parseAnd(tokens)
        while (rest[0] === 'OR') {
            const partial = this.parseAnd(rest.slice(1))
            left = left || partial.value
            rest = partial.rest
        }
        return { value: left, rest }
    }

    private static parseAnd(tokens: string[]): { value: boolean; rest: string[] } {
        let { value: left, rest } = this.parseNot(tokens)
        while (rest[0] === 'AND') {
            const partial = this.parseNot(rest.slice(1))
            left = left && partial.value
            rest = partial.rest
        }
        return { value: left, rest }
    }

    private static parseNot(tokens: string[]): { value: boolean; rest: string[] } {
        if (tokens[0] === 'NOT') {
            const partial = this.parseNot(tokens.slice(1))
            return { value: !partial.value, rest: partial.rest }
        }
        return this.parsePrimary(tokens)
    }

    private static parsePrimary(tokens: string[]): { value: boolean; rest: string[] } {
        if (tokens[0] === '(') {
            const partial = this.parseExpression(tokens.slice(1))
            return { value: partial.value, rest: partial.rest.slice(1) }
        }
        if (tokens[0] === 'TRUE') {
            return { value: true, rest: tokens.slice(1) }
        }
        if (tokens[0] === 'FALSE') {
            return { value: false, rest: tokens.slice(1) }
        }
        throw new Error(`Unexpected token: ${tokens[0]}`)
    }
}
