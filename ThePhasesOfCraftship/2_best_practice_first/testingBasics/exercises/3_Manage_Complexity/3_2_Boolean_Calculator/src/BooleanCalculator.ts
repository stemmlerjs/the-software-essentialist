const ResolutionTable = {
    NOT: {
        'NOT TRUE': 'FALSE',
        'NOT FALSE': 'TRUE',
    },
    AND: {
        'TRUE AND TRUE': 'TRUE',
        'TRUE AND FALSE': 'FALSE',
        'FALSE AND TRUE': 'FALSE',
        'FALSE AND FALSE': 'FALSE',
    },
    OR: {
        'TRUE OR TRUE': 'TRUE',
        'TRUE OR FALSE': 'TRUE',
        'FALSE OR TRUE': 'TRUE',
        'FALSE OR FALSE': 'FALSE',
    }
} as const;

export class BooleanCalculator {

    private static ResolveExpressions(booleanStr: string): string {
        booleanStr = booleanStr.slice();
        
        // matches all groups of parentheses that doesn't have nested parentheses
        const regExp = /\([^()]*\)/g;
        let matches = booleanStr.match(regExp);

        while(matches) {
           matches.forEach(match => {
               booleanStr = booleanStr.replace(match, this.ResolveExpressions(match.slice(1, -1)));
           })
           matches = booleanStr.match(regExp);
        }
        
        Object.entries(ResolutionTable).forEach(([type, resolutions]) => {
            let prevLength = 0;
            while (booleanStr.includes(type) && prevLength !== booleanStr.length) {
                prevLength = booleanStr.length;
                Object.entries(resolutions).forEach(([key, value]) => {
                    while(booleanStr.includes(key)) {
                        booleanStr = booleanStr.replace(key, value);
                    }
                });
            }
        });
        return booleanStr;
    }

    public static Evaluate(booleanStr: string): boolean {

        booleanStr = this.ResolveExpressions(booleanStr);

        if(booleanStr === 'TRUE') {
            return true;
        } 
        if(booleanStr === 'FALSE') {
            return false;
        }
    
        throw new Error('Invalid boolean expression.');
    }

}