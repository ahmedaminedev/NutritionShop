import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
    onNavigateToPrivacy?: () => void;
    onNavigateToDataDeletion?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToPrivacy, onNavigateToDataDeletion }) => {
    return (
        <footer className="bg-brand-black text-white pt-32 pb-8 overflow-hidden relative border-t-4 border-brand-neon">
            {/* Background Text Decor */}
            <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
                <span className="text-[25vw] font-black font-serif leading-none whitespace-nowrap text-white italic">
                    IRON FUEL NUTRITION
                </span>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
                    
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Logo />
                        <p className="text-gray-400 text-sm font-mono leading-relaxed max-w-xs uppercase tracking-wider">
                            Forgé pour l'élite athlétique. Nous fournissons les compléments les plus purs pour ceux qui refusent la médiocrité.
                        </p>
                        <div className="flex gap-4">
                            {['FB', 'IG', 'YT', 'TT'].map(social => (
                                <a key={social} href="#" className="w-12 h-12 border-2 border-gray-800 flex items-center justify-center hover:bg-brand-neon hover:text-black hover:border-brand-neon transition-all duration-300 font-black text-xs slant">
                                    <span className="slant-reverse">{social}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-serif font-black italic text-xl mb-10 flex items-center gap-3">
                            <span className="w-2 h-8 bg-brand-neon slant"></span> Navigation
                        </h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                            {['Magasins de Base', 'Catalogue Armurerie', 'The Hub (Blog)', 'Ambassadeurs Elite', 'Liaison HQ'].map(item => (
                                <li key={item}><a href="#" className="hover:text-brand-neon hover:pl-2 transition-all duration-300 block">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-serif font-black italic text-xl mb-10 flex items-center gap-3">
                            <span className="w-2 h-8 bg-brand-neon slant"></span> Support Client
                        </h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <li><a href="#" className="hover:text-brand-neon hover:pl-2 transition-all duration-300 block">Suivi de Déploiement</a></li>
                            <li><a href="#" className="hover:text-brand-neon hover:pl-2 transition-all duration-300 block">Logistique & Retours</a></li>
                            <li><a href="#" className="hover:text-brand-neon hover:pl-2 transition-all duration-300 block">Base de Données FAQ</a></li>
                            <li><a href="#/privacy-policy" onClick={(e) => {e.preventDefault(); onNavigateToPrivacy?.()}} className="hover:text-brand-neon hover:pl-2 transition-all duration-300 block">Confidentialité</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif font-black italic text-xl mb-10 text-brand-neon">
                            JOIN THE SQUAD
                        </h4>
                        <p className="text-xs font-mono text-gray-400 mb-8 uppercase tracking-wider leading-relaxed">Infiltration immédiate : Recevez nos offres privées et protocoles d'entraînement.</p>
                        <form className="flex flex-col gap-0">
                            <input 
                                type="email" 
                                placeholder="IDENTIFIANT EMAIL" 
                                className="bg-white/5 border-2 border-gray-800 text-white px-4 py-4 focus:outline-none focus:border-brand-neon focus:bg-black transition-colors text-xs font-black placeholder-gray-700"
                            />
                            <button className="bg-white text-black font-black uppercase tracking-[0.2em] py-5 mt-2 hover:bg-brand-neon transition-all duration-300 text-xs slant shadow-xl">
                                <span className="slant-reverse block">S'ENRÔLER</span>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em]">
                    <p>&copy; {new Date().getFullYear()} IRONFUEL NUTRITION. NO PAIN NO GAIN.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white transition-colors">VISA</span>
                        <span className="hover:text-white transition-colors">MASTERCARD</span>
                        <span className="hover:text-white transition-colors">CASH ON DELIVERY</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};