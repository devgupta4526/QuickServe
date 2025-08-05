import { cn } from "../../lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
    <div
        className={cn(
            "relative rounded-xl border bg-white shadow hover:shadow-md transition-shadow",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => (
    <div className={cn("p-4", className)} {...props}>
        {children}
    </div>
);
