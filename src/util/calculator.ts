const INTEREST_COMPOUND_RATE = 12;

export const calculateCompoundInterests = (
    initialAmount: number,
    monthlyContribution: number,
    timeInYears: number,
    interestRate: number
) => {
    const interestRatePerCompoundPeriod = (interestRate * 0.01) / INTEREST_COMPOUND_RATE;
    const compoundPeriodsCount = INTEREST_COMPOUND_RATE * timeInYears;
    const initialAmountCompoundInterest = initialAmount * (1 + interestRatePerCompoundPeriod) ** compoundPeriodsCount;

    const contributionCompoundInterest =
        (monthlyContribution * ((1 + interestRatePerCompoundPeriod) ** compoundPeriodsCount - 1)) /
        interestRatePerCompoundPeriod;

    return [initialAmountCompoundInterest, contributionCompoundInterest];
};
