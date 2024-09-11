const resolutions = {
    'TRUE': true,
    'FALSE': false,
    'NOT TRUE': false,
    'NOT FALSE': true,
    'TRUE AND TRUE': true,
    'TRUE AND FALSE': false,
    'FALSE AND TRUE': false,
    'FALSE AND FALSE': false,
} as const;

export class BooleanCalculator {

    public static Evaluate(booleanStr: string): boolean {
        if(!Object.keys(resolutions).includes(booleanStr)) {
            throw new Error('Invalid boolean expression.');
        }
        return resolutions[booleanStr as unknown as keyof typeof resolutions];
    }

}