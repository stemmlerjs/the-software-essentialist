const resolutions = {
    'TRUE': true,
    'FALSE': false,
    'NOT TRUE': false,
    'NOT FALSE': true
} as const;

export class BooleanCalculator {

    public static Evaluate(booleanStr: string): boolean {
        return resolutions[booleanStr as unknown as keyof typeof resolutions];
    }

}