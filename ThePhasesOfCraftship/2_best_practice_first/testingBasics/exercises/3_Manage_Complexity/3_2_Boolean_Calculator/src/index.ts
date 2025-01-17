export type Expression = string;
export type Result = boolean;

export class BooleanCalculator {
    static run(expression: Expression): Result {
        if(expression === 'FALSE') {
            return false;
        }
        return true;
    }
}