type Stats = {
    min: number,
    max: number
}

export function calculateStats(sequence: number[]): Stats {
    if (!Array.isArray(sequence) || !sequence.every(Number.isInteger)) {
        throw new Error("Sequence must contain only integers.");
    }

    const sortedSequence = sequence.sort((a, b) => a - b);

    return {
        min: sortedSequence[0],
        max: sortedSequence[sortedSequence.length - 1]
    };
}