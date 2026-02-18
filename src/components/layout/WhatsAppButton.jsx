import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '237655772303';

/**
 * WhatsApp Floating Button
 */
const WhatsAppButton = () => {
    const whatsappLink = getWhatsAppLink(
        WHATSAPP_NUMBER,
        'Bonjour, je souhaite des informations sur vos services.'
    );

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-pulse"
            aria-label="Contactez-nous sur WhatsApp"
        >
            <MessageSquare size={32} />
        </a>
    );
};

export default WhatsAppButton;
