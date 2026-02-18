// Site configuration constants
export const SITE_CONFIG = {
    name: 'DEESSE EVENT',
    description: 'Organisation d\'événements premium à Kribi',
    contact: {
        phone: '+237 655 772 303',
        phoneAlt: '+237 682 374 243',
        email: 'deesseevent237@gmail.com',
        address: 'Kribi, Cameroun',
        hours: 'Lun-Ven: 8h-18h, Sam: 9h-15h',
    },
    social: {
        facebook: '',
        instagram: '',
        linkedin: '',
        tiktok: '',
    },
};

// Event types
export const EVENT_TYPES = {
    WEDDING: 'mariage',
    BIRTHDAY: 'anniversaire',
    CORPORATE: 'corporate',
    BAPTISM: 'baptême',
    FUNERAL: 'funérailles',
    OTHER: 'autre',
};

// Budget ranges in FCFA
export const BUDGET_RANGES = [
    { label: 'Moins de 500K FCFA', value: '0-500k' },
    { label: '500K - 1M FCFA', value: '500k-1M' },
    { label: '1M - 3M FCFA', value: '1M-3M' },
    { label: '3M - 5M FCFA', value: '3M-5M' },
    { label: '5M - 10M FCFA', value: '5M-10M' },
    { label: 'Plus de 10M FCFA', value: '10M+' },
];

// Navigation items
export const NAV_ITEMS = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Réalisations', path: '/portfolio' },
    { label: 'À propos', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
];
