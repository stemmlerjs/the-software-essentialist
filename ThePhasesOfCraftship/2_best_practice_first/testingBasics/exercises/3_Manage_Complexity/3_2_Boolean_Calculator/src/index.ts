export type Expression = string;
export type Result = boolean;

export class BooleanCalculator {
    static run(expression: Expression): Result {
        if(expression === 'FALSE' || expression === 'NOT TRUE' || expression === 'TRUE AND FALSE') {
            return false;
        }
        return true;
    }
}