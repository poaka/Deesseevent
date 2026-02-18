import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants = {
    primary: 'bg-gradient-gold text-primary-950 shadow-gold hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-primary-950',
    outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

/**
 * Button Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'outline'|'ghost'} props.variant - Button variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.className - Additional classes
 * @param {...any} props - Additional button props
 */
const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading = false,
    disabled,
    ...props
}, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
            className={cn(
                'font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Chargement...</span>
                </>
            ) : children}
        </motion.button>
    );
});

Button.displayName = 'Button';

export default Button;
