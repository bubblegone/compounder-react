import clsx from 'clsx';
import { ReactNode } from 'react';

interface NumberInputProps {
    value?: number;
    setValue: (value: string) => void;
    placeholder?: string;
    size?: number;
}

export const NumberInput = ({ value, setValue, placeholder, size }: NumberInputProps) => {
    return (
        <input
            type={'text'}
            inputMode={typeof value === 'number' ? 'decimal' : 'text'}
            value={value ?? ''}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            size={size}
            className="w-fit border-b px-1 leading-none outline-none"
        ></input>
    );
};

interface ClickableWrapperProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    ariaLabel?: string;
}

export const ClickableWrapper = ({ children, onClick, className, ariaLabel }: ClickableWrapperProps) => {
    return (
        <button onClick={onClick} className={clsx('cursor-pointer', className)} aria-label={ariaLabel}>
            {children}
        </button>
    );
};
