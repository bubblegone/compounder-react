import { ReactNode, useEffect, useState } from 'react';
import { calculateCompoundInterests } from '../util/calculator';
import { setFloatStringWrapper, setIntegerStringWrapper } from '../util/setterWrappers';
import Card from './Card';
import { ContributionResultCard, ContributionResultCardProps } from './ContributionResultCard';
import { NumberInput } from './Input';

const InputLine = ({ children, labelText }: { children: ReactNode; labelText: string }) => {
    return (
        <div className="flex justify-between gap-8">
            <label>{labelText}</label>
            {children}
        </div>
    );
};

interface ContributionCardProps {
    initialValue: number;
    setResultValue: (value: number) => void;
}

type ResultCardDataWrapper = (ContributionResultCardProps & { shouldRender: true }) | { shouldRender: false };

export const ContributionCard = ({ initialValue, setResultValue }: ContributionCardProps) => {
    const [monthlyContribution, setMonthlyContribution] = useState<number>();
    const [timeInYears, setTimeInYears] = useState<number>();
    const [interestRate, setInterestRate] = useState<number>();

    const [resultCardData, setResultCardData] = useState<ResultCardDataWrapper>({
        shouldRender: false,
    });

    useEffect(() => {
        const allFieldsFilledLocal =
            monthlyContribution !== undefined && timeInYears !== undefined && interestRate !== undefined;

        if (!allFieldsFilledLocal) {
            setResultValue(initialValue);
            setResultCardData({ shouldRender: false });
        } else {
            let [compoundValueFromInitialAmount, compoundValueFromContributions] = calculateCompoundInterests(
                initialValue,
                monthlyContribution,
                timeInYears,
                interestRate
            );

            if (monthlyContribution == 0) {
                compoundValueFromContributions = 0;
            }

            const compoundSum = compoundValueFromInitialAmount + compoundValueFromContributions;

            setResultValue(compoundSum);
            const totalContributions = monthlyContribution * 12 * timeInYears;
            setResultCardData({
                shouldRender: true,
                initialAmount: initialValue,
                gainsFromInitialAmount: compoundValueFromInitialAmount - initialValue,
                totalContributions: totalContributions,
                gainsFromContributions: compoundValueFromContributions - totalContributions,
            });
        }
    }, [monthlyContribution, timeInYears, interestRate, initialValue]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="flex min-w-[40ch] flex-col gap-4">
                <InputLine labelText="Monthly Contribution:">
                    <NumberInput
                        value={monthlyContribution}
                        setValue={setIntegerStringWrapper(setMonthlyContribution)}
                        placeholder="amount"
                        size={7}
                    ></NumberInput>
                </InputLine>
                <InputLine labelText="Length of Time in Years:">
                    <NumberInput
                        value={timeInYears}
                        setValue={setIntegerStringWrapper(setTimeInYears)}
                        placeholder="amount"
                        size={7}
                    ></NumberInput>
                </InputLine>
                <InputLine labelText="Estimated Interest Rate:">
                    <NumberInput
                        value={interestRate}
                        setValue={setFloatStringWrapper(setInterestRate)}
                        placeholder="amount"
                        size={7}
                    ></NumberInput>
                </InputLine>
            </Card>
            {resultCardData.shouldRender ? (
                <ContributionResultCard
                    initialAmount={resultCardData.initialAmount}
                    totalContributions={resultCardData.totalContributions}
                    gainsFromInitialAmount={resultCardData.gainsFromInitialAmount}
                    gainsFromContributions={resultCardData.gainsFromContributions}
                ></ContributionResultCard>
            ) : (
                <Card>
                    <div className="py-4 text-center">Please fill out all fields</div>
                </Card>
            )}
        </div>
    );
};
