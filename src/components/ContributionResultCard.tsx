import Card from './Card';

const formatMoneyNumber = (value: number) => {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
    }).format(value);
};

interface ResultCardLineProps {
    text: string;
    value: number;
}

const ResultCardLine = ({ text, value }: ResultCardLineProps) => {
    return (
        <div className="flex justify-between gap-4 py-2">
            <span>{text}</span>
            <span>{formatMoneyNumber(value)}</span>
        </div>
    );
};

export interface ContributionResultCardProps {
    initialAmount: number;
    gainsFromInitialAmount: number;
    totalContributions: number;
    gainsFromContributions: number;
}

export const ContributionResultCard = ({
    initialAmount,
    gainsFromInitialAmount,
    totalContributions,
    gainsFromContributions,
}: ContributionResultCardProps) => {
    const totalGains = gainsFromInitialAmount + gainsFromContributions;
    const finalAmount = initialAmount + totalContributions + totalGains;

    return (
        <Card className="flex flex-col">
            <ResultCardLine text="Initial amount:" value={initialAmount}></ResultCardLine>
            <ResultCardLine text="Gains from initial amount:" value={gainsFromInitialAmount}></ResultCardLine>
            <ResultCardLine text="Total contributions:" value={totalContributions}></ResultCardLine>
            <ResultCardLine text="Gains from contributions:" value={gainsFromContributions}></ResultCardLine>
            <ResultCardLine text="Total gains:" value={totalGains}></ResultCardLine>
            <ResultCardLine text="Final amount:" value={finalAmount}></ResultCardLine>
        </Card>
    );
};
