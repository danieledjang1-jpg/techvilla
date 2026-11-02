export const BUSINESS = {
  name: 'TECHVILLA',
  tagline: 'Your Trusted Destination for Smart Technology.',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '2348000000000',
  email: 'hello@techvilla.example',
  address: 'Business address to be confirmed'
};
export const money = value => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(value);
export const imageFallback = 'https://images.unsplash.com/photo-151170?auto=format&fit=crop&w=800&q=80';
