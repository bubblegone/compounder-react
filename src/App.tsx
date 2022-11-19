import { useState } from 'react';
import Card from './components/Card';
import { ContributionCard } from './components/ContributionCard';
import { MinusIcon, PlusIcon } from './components/Icons';
import { ClickableWrapper, NumberInput } from './components/Input';
import { setIntegerStringWrapper } from './util/setterWrappers';

interface ContributionCardNodeProps {
    initialValue: number;
    removeNode?: () => void;
}

const ContributionCardNode = ({ initialValue, removeNode }: ContributionCardNodeProps) => {
    const [resultValue, setResultValue] = useState(initialValue);
    const [nextNodeExist, setNextNodeExist] = useState(false);

    return (
        <>
            <ContributionCard initialValue={initialValue} setResultValue={setResultValue}></ContributionCard>
            {nextNodeExist ? (
                <ContributionCardNode
                    initialValue={resultValue}
                    removeNode={() => setNextNodeExist(false)}
                ></ContributionCardNode>
            ) : (
                <div className="flex justify-center gap-4">
                    <ClickableWrapper
                        onClick={() => setNextNodeExist(true)}
                        className="rounded bg-very-dark-green p-1 shadow-lg"
                        ariaLabel="Add another contribution block"
                    >
                        <PlusIcon className="h-8 w-8 text-white"></PlusIcon>
                    </ClickableWrapper>
                    {removeNode && (
                        <ClickableWrapper
                            onClick={removeNode}
                            className="rounded bg-white p-1 shadow-lg"
                            ariaLabel="Remove last contribution block"
                        >
                            <MinusIcon className="h-8 w-8 text-very-dark-green"></MinusIcon>
                        </ClickableWrapper>
                    )}
                </div>
            )}
        </>
    );
};

function App() {
    const [initialInvestment, setInitialInvestment] = useState<number>();

    return (
        <main className="min-h-screen bg-light-blue">
            <h1 className="text-very-dark-xxl py-8 text-center font-raleway text-3xl font-semibold tracking-wide">
                Compound calculator
            </h1>

            <div className="mx-auto flex w-fit flex-col gap-4">
                <Card className="mx-auto flex w-fit justify-between gap-2">
                    <label>Initial Investment:</label>
                    <NumberInput
                        value={initialInvestment}
                        setValue={setIntegerStringWrapper(setInitialInvestment)}
                        placeholder="0"
                        size={6}
                    ></NumberInput>
                </Card>
                <ContributionCardNode initialValue={initialInvestment ?? 0}></ContributionCardNode>
            </div>
        </main>
    );
}

export default App;
