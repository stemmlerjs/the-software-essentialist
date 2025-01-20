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
        let { value: leftValue, rest: restTokens } = this.parseAnd(tokens);
        while (restTokens[0] === 'OR') {
            const nextRest = restTokens.slice(1);
            const { value: rightValue, rest } = this.parseAnd(nextRest);
            leftValue = leftValue || rightValue;
            restTokens = rest;
        }
        return { value: leftValue, rest: restTokens };
    }

    private static parseAnd(tokens: string[]): { value: boolean; rest: string[] } {
        let { value: leftValue, rest: restTokens } = this.parseNot(tokens);
        while (restTokens[0] === 'AND') {
            const nextRest = restTokens.slice(1);
            const { value: rightValue, rest } = this.parseNot(nextRest);
            leftValue = leftValue && rightValue;
            restTokens = rest;
        }
        return { value: leftValue, rest: restTokens };
    }

    private static parseNot(tokens: string[]): { value: boolean; rest: string[] } {
        if (tokens[0] === 'NOT') {
            const nextRest = tokens.slice(1);
            const { value, rest } = this.parseNot(nextRest);
            return { value: !value, rest };
        }
        return this.parsePrimary(tokens);
    }

    private static parsePrimary(tokens: string[]): { value: boolean; rest: string[] } {
        if (tokens[0] === '(') {
            const nextRest = tokens.slice(1);
            const { value, rest } = this.parseExpression(nextRest);
            return { value, rest: rest.slice(1) };
        }
        if (tokens[0] === 'TRUE') {
            return { value: true, rest: tokens.slice(1) };
        }
        if (tokens[0] === 'FALSE') {
            return { value: false, rest: tokens.slice(1) };
        }
        throw new Error(`Unexpected token: ${tokens[0]}`);
    }
}