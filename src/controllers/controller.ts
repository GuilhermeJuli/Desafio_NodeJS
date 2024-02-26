function CalculateMultiplier(risc: string, bet: number, lines: number): number | null {

    console.log(`CalculateMultiplier - risc: ${risc}, lines: ${lines}, bet: ${bet}`);

    let multiplier: number | null = null;

    switch (risc.replace(/['"]+/g, '')) {
        case "low":
            if (lines === 8) {
                multiplier = 1.1;
            } else if (lines === 12) {
                multiplier = 1.2;
            } else if (lines === 16) {
                multiplier = 1.3;
            }
            break;
        case "average":
            if (lines === 8) {
                multiplier = 1.2;
            } else if (lines === 12) {
                multiplier = 1.3;
            } else if (lines === 16) {
                multiplier = 1.4;
            }   
            break;
        case "high":
            if (lines === 8) {
                multiplier = 1.3;
            } else if (lines === 12) {
                multiplier = 1.4;
            } else if (lines === 16) {
                multiplier = 1.5;
            }
            break;
        default:
            console.log("Unexpected 'risc' value:", risc);
            return null;
    }

    if (multiplier === null) {
        console.log("Multiplier is null for risc:", risc, "and lines:", lines);
        return null;
    }

    const result = bet * multiplier;
    console.log("Result for risc:", risc, "and lines:", lines, "is:", result);

    return result;
}

export { CalculateMultiplier };



