export function calculateStats(sequence: number[]) {
    if (!Array.isArray(sequence) || !sequence.every(Number.isInteger)) {
        throw new Error("Sequence must contain only integers.");
    }

    return {};
}