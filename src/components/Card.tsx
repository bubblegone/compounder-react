import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => {
    return <div className={clsx('rounded-lg bg-white px-4 py-4 shadow-lg', className)}>{children}</div>;
};

export default Card;
