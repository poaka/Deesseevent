import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Format price in FCFA
 * @param {number} amount - Amount to format
 * @returns {string} Formatted price
 */
export function formatPrice(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
    }).format(amount) + ' FCFA';
}

/**
 * Format date in French locale
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'full')
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'long') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const formats = {
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    };

    return new Intl.DateTimeFormat('fr-FR', formats[format] || formats.long).format(dateObj);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate WhatsApp link
 * @param {string} phoneNumber - Phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppLink(phoneNumber, message = '') {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedNumber}${message ? `?text=${encodedMessage}` : ''}`;
}
