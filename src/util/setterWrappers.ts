export const setIntegerStringWrapper = (setValue: (value: number | undefined) => void) => {
    return (value: string) => {
        if (value === '') {
            setValue(undefined);
            return;
        }

        const num = Number(value);
        if (Number.isInteger(num)) {
            setValue(num);
        }
    };
};

export const setFloatStringWrapper = (setValue: (value: number | undefined) => void) => {
    return (value: string) => {
        if (value === '') {
            setValue(undefined);
            return;
        }

        const num = Number(value);
        setValue(num);
    };
};
