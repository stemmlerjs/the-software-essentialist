type Stats = {
    min: number,
    max: number,
    count: number,
    average: number
}

export function calculateStats(sequence: number[]): Stats {
    if (!Array.isArray(sequence) || !sequence.every(Number.isInteger)) {
        throw new Error("Sequence must contain only integers.");
    }

    const sortedSequence = sequence.sort((a, b) => a - b);
    const sum = sequence.reduce((acc, num) => acc + num, 0);
    const average = sum / sequence.length;

    return {
        min: sortedSequence[0],
        max: sortedSequence[sortedSequence.length - 1],
        count: sequence.length,
        average: average
    };
}
