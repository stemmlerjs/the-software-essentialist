type Stats = {
    min: number,
}

export function calculateStats(sequence: number[]):Stats {
    if (!Array.isArray(sequence) || !sequence.every(Number.isInteger)) {
        throw new Error("Sequence must contain only integers.");
    }

    return {
        min: sequence.sort()[0]
    };
}