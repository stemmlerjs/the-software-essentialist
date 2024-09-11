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

    public static Evaluate(booleanStr: string): boolean {

        const matches = booleanStr.match(/\([^()]*\)/g);
        if(matches) {
           matches.forEach(match => {
               booleanStr = booleanStr.replace(match, match.slice(1, -1));
           })
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

        if(booleanStr === 'TRUE') {
            return true;
        } 
        if(booleanStr === 'FALSE') {
            return false;
        }
    
        throw new Error('Invalid boolean expression.');
    }

}