
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { PhoneIcon, MailIcon, PlusIcon, MinusIcon, FacebookIcon, TwitterIcon, InstagramIcon, LocationIcon, ClockIcon, PaperAirplaneIcon, SparklesIcon } from './IconComponents';
import type { Store } from '../types';
import { useToast } from './ToastContext';
import { Logo } from './Logo';

interface ContactPageProps {
    onNavigateHome: () => void;
    stores: Store[];
}

const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex w-full items-center justify-between text-left py-6 group transition-all" 
                aria-expanded={isOpen}
            >
                <span className={`text-lg font-serif italic font-black uppercase tracking-tighter transition-colors duration-300 ${isOpen ? 'text-brand-neon' : 'text-gray-900 dark:text-white group-hover:text-gray-400'}`}>
                    {question}
                </span>
                <span className={`flex h-10 w-10 items-center justify-center border-2 transition-all duration-500 ${isOpen ? 'bg-brand-neon border-brand-neon text-black rotate-180' : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'}`}>
                    {isOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
                </span>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-10' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono leading-relaxed pl-6 border-l-2 border-brand-neon/30">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; content: React.ReactNode; label: string }> = ({ icon, title, content, label }) => (
    <div className="relative group p-6 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 hover:border-brand-neon transition-all duration-500 shadow-sm overflow-hidden">
        {/* Neon accent bar */}
        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-brand-neon transition-all duration-500"></div>
        
        <div className="flex items-start gap-5 relative z-10">
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-brand-neon group-hover:text-black group-hover:border-brand-neon transition-all shadow-inner">
                {icon}
            </div>
            <div className="flex-grow">
                <span className="text-[9px] font-black text-brand-neon uppercase tracking-[0.3em] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                </span>
                <h4 className="text-gray-900 dark:text-white font-serif font-black italic uppercase text-lg mb-1 tracking-tight">{title}</h4>
                <div className="text-gray-500 dark:text-gray-400 font-mono text-[11px] leading-relaxed uppercase tracking-wider group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {content}
                </div>
            </div>
        </div>
        
        {/* Corner decorative element */}
        <div className="absolute -bottom-2 -right-2 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            {/* Fix: Check if icon is a valid element before cloning and use 'any' for props to avoid TS error */}
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-12 h-12" }) : icon}
        </div>
    </div>
);

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome, stores }) => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const { addToast } = useToast();

    useEffect(() => {
        document.title = `CONTACT HQ - IronFuel Nutrition`;
        window.scrollTo(0,0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            addToast("Tous les paramètres requis ne sont pas valides.", "warning");
            return;
        }

        setTimeout(() => {
            setFormState({ name: '', email: '', subject: '', message: '' });
            addToast("Transmission envoyée au QG.", "success");
        }, 1000);
    };

    return (
        <div className="bg-gray-50 dark:bg-[#050505] font-sans min-h-screen pb-32 relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>

            <div className="relative h-[450px] lg:h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
                        alt="Contact Hero" 
                        className="w-full h-full object-cover filter grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#050505] via-transparent to-transparent"></div>
                </div>
                
                <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-6 flex flex-col justify-center pb-24">
                    <div className="mb-10"><Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Support HQ' }]} /></div>
                    <div className="animate-fadeIn">
                        <span className="inline-flex items-center gap-3 bg-brand-neon text-black px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-6 transform -skew-x-12">
                            <span className="skew-x-12 inline-block">CONTACT OPÉRATIONNEL</span>
                        </span>
                        <h1 className="text-6xl md:text-9xl font-serif font-black italic text-white uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">
                            TALK TO <span className="text-brand-neon">HQ</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-20">
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* --- FORMULAIRE --- */}
                    <div className="w-full lg:w-[60%] p-8 lg:p-20 relative bg-white dark:bg-transparent">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-neon"></div>
                        <h2 className="text-3xl font-serif font-black italic uppercase text-gray-900 dark:text-white mb-4 tracking-tighter">Transmission Radio</h2>
                        <p className="text-gray-400 dark:text-gray-500 font-mono text-xs uppercase tracking-widest mb-12">Laissez votre message ci-dessous, réponse prioritaire sous 24H.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="group relative">
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formState.name} 
                                        onChange={handleChange} 
                                        className="peer w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-3 text-gray-900 dark:text-white font-mono text-sm focus:border-brand-neon focus:outline-none transition-colors placeholder-transparent" 
                                        placeholder="IDENTIFIANT"
                                        required
                                    />
                                    <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-brand-neon">Identifiant / Nom</label>
                                </div>
                                <div className="group relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formState.email} 
                                        onChange={handleChange} 
                                        className="peer w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-3 text-gray-900 dark:text-white font-mono text-sm focus:border-brand-neon focus:outline-none transition-colors placeholder-transparent" 
                                        placeholder="CANAL EMAIL"
                                        required
                                    />
                                    <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-brand-neon">Canal Email</label>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <select 
                                    name="subject" 
                                    value={formState.subject} 
                                    onChange={handleChange}
                                    className="peer w-full bg-white dark:bg-black border-b-2 border-gray-200 dark:border-gray-800 py-3 text-gray-900 dark:text-white font-mono text-xs focus:border-brand-neon focus:outline-none appearance-none cursor-pointer uppercase"
                                >
                                    <option value="">Sélectionnez un sujet</option>
                                    <option>Conseil Nutrition & Protocoles</option>
                                    <option>Logistique & Livraison</option>
                                    <option>Garantie & Retours</option>
                                    <option>Partenariat Athlète</option>
                                    <option>Urgence Technique</option>
                                </select>
                                <label className="absolute left-0 -top-4 text-[10px] font-black uppercase tracking-widest text-brand-neon">Objet de la Mission</label>
                            </div>

                            <div className="group relative">
                                <textarea 
                                    name="message" 
                                    rows={5} 
                                    value={formState.message} 
                                    onChange={handleChange}
                                    className="peer w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-6 text-gray-900 dark:text-white font-mono text-sm focus:border-brand-neon focus:outline-none transition-colors resize-none placeholder-gray-300 dark:placeholder-gray-700"
                                    placeholder="VOTRE MESSAGE..."
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="group relative inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-[0.3em] py-6 px-12 transform -skew-x-12 hover:bg-brand-neon dark:hover:bg-brand-neon hover:text-black transition-all duration-300 w-full md:w-auto overflow-hidden shadow-2xl"
                            >
                                <span className="relative z-10 flex items-center gap-3 skew-x-12">
                                    Initier l'envoi <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* --- SIDEBAR INFO REFONDUE (LE BRIEFING PANEL) --- */}
                    <div className="w-full lg:w-[40%] bg-gray-50 dark:bg-black p-8 lg:p-12 flex flex-col justify-between relative border-l border-gray-200 dark:border-gray-800">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none hidden lg:block">
                            <Logo />
                        </div>

                        <div className="space-y-12 relative z-10">
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.5em] mb-10 border-l-4 border-brand-neon pl-4">Intel & Contacts</h3>
                                <div className="space-y-4">
                                    <ContactInfoItem 
                                        label="Live Comms"
                                        icon={<PhoneIcon className="w-5 h-5"/>} 
                                        title="Radio Freq" 
                                        content={<a href="tel:+21655263522" className="hover:text-brand-neon transition-colors">+216 55 263 522<br/><span className="text-[9px] opacity-40">Dispo 09h00 - 20h00</span></a>} 
                                    />
                                    <ContactInfoItem 
                                        label="Secured Channel"
                                        icon={<MailIcon className="w-5 h-5"/>} 
                                        title="Signal HQ" 
                                        content={<a href="mailto:hq@ironfuel.tn" className="hover:text-brand-neon transition-colors">hq@ironfuel.tn<br/><span className="text-[9px] opacity-40">Cryptage bout-en-bout</span></a>} 
                                    />
                                    <ContactInfoItem 
                                        label="Deployment Hub"
                                        icon={<LocationIcon className="w-5 h-5"/>} 
                                        title="Localisation" 
                                        content="CENTRE LOGISTIQUE<br/>LAC 2, TUNIS" 
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.5em] mb-6">Social Network</h3>
                                <div className="flex gap-4">
                                    <SocialLink icon={<InstagramIcon className="w-5 h-5"/>} />
                                    <SocialLink icon={<FacebookIcon className="w-5 h-5"/>} />
                                    <SocialLink icon={<TwitterIcon className="w-5 h-5"/>} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Status Monitor Style */}
                        <div className="mt-16">
                             <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 rounded-sm relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-3xl pointer-events-none"></div>
                                 
                                 <div className="flex items-center gap-4 relative z-10">
                                    <div className="relative w-12 h-12 flex items-center justify-center border border-brand-neon/30 rounded-full">
                                        <div className="absolute inset-0 border-2 border-brand-neon rounded-full animate-ping opacity-20"></div>
                                        <div className="w-3 h-3 bg-brand-neon rounded-full shadow-[0_0_15px_#ccff00]"></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-brand-neon uppercase tracking-widest mb-1">Système Actif</p>
                                        <p className="text-[11px] text-gray-600 dark:text-gray-400 font-mono leading-tight uppercase font-bold">Agents de performance en ligne.<br/>Ready to Brief.</p>
                                    </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-brand-neon font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Base de connaissances</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-black italic text-gray-900 dark:text-white uppercase tracking-tighter">Briefing Technique</h2>
                    </div>
                    
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 shadow-2xl rounded-sm">
                        <FAQItem question="Protocoles de Livraison">
                            Toutes les unités sont expédiées sous 24h. Livraison Express en 48h max sur tout le territoire national. Livraison offerte pour tout ordre de mission {">"} 300 DT.
                        </FAQItem>
                        <FAQItem question="Authenticité des Ressources">
                            IronFuel ne transige jamais sur la pureté. Chaque produit est certifié, testé en laboratoire et sourcé directement auprès des manufacturiers officiels.
                        </FAQItem>
                        <FAQItem question="Politique de Repli (Retours)">
                            Vous avez un droit de retrait de 14 jours. Le scellé de sécurité doit être intact. Contactez le support pour obtenir un code d'extraction (bon de retour).
                        </FAQItem>
                        <FAQItem question="Devenir Ambassadeur Elite">
                            Nous recrutons des athlètes déterminés. Envoyez votre dossier de performance (Instagram/Résultats) via le sujet "Partenariat Athlète" pour évaluation par le QG.
                        </FAQItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialLink: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <a href="#" className="w-14 h-14 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-brand-neon hover:text-black hover:border-brand-neon transition-all duration-500 transform -skew-x-12 shadow-sm group">
        <div className="skew-x-12 group-hover:scale-110 transition-transform">{icon}</div>
    </a>
);
