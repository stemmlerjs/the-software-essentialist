const resolutions = {
    'TRUE': true,
    'FALSE': false,
    'NOT TRUE': false,
    'NOT FALSE': true
} as const;

export class BooleanCalculator {

    public static Evaluate(booleanStr: string): boolean {
        if(!Object.keys(resolutions).includes(booleanStr)) {
            throw new Error('Invalid boolean expression.');
        }
        return resolutions[booleanStr as unknown as keyof typeof resolutions];
    }

}