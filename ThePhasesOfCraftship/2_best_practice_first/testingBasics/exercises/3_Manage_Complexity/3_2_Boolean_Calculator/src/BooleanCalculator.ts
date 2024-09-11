export class BooleanCalculator {

    public static Evaluate(booleanStr: string): boolean {
        if(booleanStr === 'TRUE') {
            return true;
        }
        return false;
    }

}