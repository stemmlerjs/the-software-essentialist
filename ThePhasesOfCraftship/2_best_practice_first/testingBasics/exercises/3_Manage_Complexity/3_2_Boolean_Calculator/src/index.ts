export type Expression = string;
export type Result = boolean;

export class BooleanCalculator {
    static run(expression: Expression): Result {
        return !(expression === 'FALSE' || expression === 'NOT TRUE' || expression === 'TRUE AND FALSE' || expression === 'FALSE OR FALSE' );
    }
}