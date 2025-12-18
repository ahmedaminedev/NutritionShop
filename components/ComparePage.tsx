
import React, { useMemo, useEffect } from 'react';
import { useCompare } from './CompareContext';
import { useCart } from './CartContext';
import { XMarkIcon, TrashIcon, ShoppingBagIcon, SparklesIcon, ScaleIcon, InformationCircleIcon } from './IconComponents';
import { Breadcrumb } from './Breadcrumb';

interface ComparePageProps {
    onNavigateHome: () => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigateHome }) => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const { addToCart, openCart } = useCart();

    useEffect(() => {
        document.title = `VERSUS - Analyse Performance IronFuel`;
        window.scrollTo(0,0);
    }, []);

    const allSpecKeys = useMemo(() => {
        const keys = new Set<string>();
        compareList.forEach(product => {
            product.specifications?.forEach(spec => keys.add(spec.name));
        });
        return Array.from(keys).sort();
    }, [compareList]);

    if (compareList.length === 0) {
        return (
            <div className="bg-white dark:bg-[#050505] min-h-screen flex items-center justify-center p-6 font-sans relative transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>
                <div className="text-center relative z-10 max-w-lg">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center mx-auto mb-8 text-gray-400 dark:text-gray-700 transform -rotate-12">
                        <ScaleIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-serif font-black italic text-gray-900 dark:text-white uppercase mb-4 tracking-tighter">AUCUNE ANALYSE ACTIVE</h2>
                    <p className="text-gray-500 dark:text-gray-500 font-mono text-xs uppercase tracking-widest mb-10">Sélectionnez jusqu'à 3 unités pour comparer leurs caractéristiques techniques et choisir l'arme ultime.</p>
                    <button onClick={onNavigateHome} className="bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs py-5 px-12 transform -skew-x-12 hover:bg-brand-neon transition-all shadow-xl">
                        <span className="skew-x-12 inline-block">RETOUR AU QG</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#050505] min-h-screen pb-32 selection:bg-brand-neon selection:text-black font-sans relative transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>

            {/* "VS" Background Watermark - Modern & Impactful */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 text-[40vw] font-black text-black/[0.01] dark:text-white/[0.015] pointer-events-none italic select-none font-serif z-0 leading-none">
                VS
            </div>

            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="mb-12">
                    <Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Performance Versus' }]} />
                </div>
                
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 animate-fadeIn">
                    <div>
                        <span className="text-brand-neon font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Benchmark Technique</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black italic text-gray-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
                            PERFORMANCE <span className="text-brand-neon">VERSUS</span>
                        </h1>
                        <p className="mt-8 text-gray-500 dark:text-gray-500 font-mono text-sm uppercase tracking-widest max-w-xl border-l-2 border-brand-neon pl-6">
                            Analyse comparative des apports nutritionnels et protocoles. Identifiez l'unité adaptée à vos objectifs.
                        </p>
                    </div>
                    <button 
                        onClick={clearCompare} 
                        className="flex items-center gap-3 text-red-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest border border-red-200 dark:border-red-900/30 px-8 py-4 bg-red-50 dark:bg-red-900/5 hover:bg-red-600 hover:border-red-600 transform -skew-x-12 shadow-sm"
                    >
                        <span className="skew-x-12 flex items-center gap-2"><TrashIcon className="w-4 h-4" /> RÉINITIALISER L'ANALYSE</span>
                    </button>
                </header>

                <div className="overflow-x-auto no-scrollbar pb-10">
                    <div className="inline-block min-w-full align-middle">
                        <div className="grid grid-cols-[250px_repeat(3,1fr)] gap-6">
                            
                            {/* --- COL 0: Labels Header --- */}
                            <div className="flex flex-col justify-end pb-8">
                                <div className="bg-gray-100 dark:bg-[#111] p-8 border border-gray-200 dark:border-gray-800 shadow-2xl transform -skew-x-12">
                                    <div className="skew-x-12">
                                        <p className="text-brand-neon font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-brand-neon animate-pulse"></div> Bench Engine
                                        </p>
                                        <h3 className="text-gray-900 dark:text-white font-serif font-black italic uppercase text-2xl tracking-tight">CRITÈRES</h3>
                                    </div>
                                </div>
                            </div>

                            {/* --- PRODUCT HEADERS --- */}
                            {compareList.map((product, idx) => (
                                <div key={product.id} className="relative group animate-fadeInUp" style={{ animationDelay: `${idx * 150}ms` }}>
                                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center text-center relative transition-all duration-500 hover:border-brand-neon group shadow-2xl">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-neon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        
                                        <button 
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute top-4 right-4 p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors z-20"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>

                                        <div className="relative w-48 h-48 mb-8 bg-gray-50 dark:bg-[#050505] p-6 flex items-center justify-center border border-gray-100 dark:border-gray-900 group-hover:border-brand-neon/30 transition-colors">
                                            <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                                            <div className="absolute inset-0 bg-brand-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-3">{product.brand}</p>
                                        <h3 className="font-serif font-black italic text-2xl text-gray-900 dark:text-white uppercase leading-none mb-6 min-h-[4rem] line-clamp-2 tracking-tight group-hover:text-brand-neon transition-colors">{product.name}</h3>
                                        
                                        <div className="text-4xl font-black text-gray-900 dark:text-white font-mono mb-8 tracking-tighter">
                                            {product.price.toFixed(3)} <span className="text-sm text-brand-neon">DT</span>
                                        </div>

                                        <button 
                                            onClick={() => { addToCart(product); openCart(); }}
                                            disabled={product.quantity === 0}
                                            className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[11px] py-5 hover:bg-brand-neon transition-all flex items-center justify-center gap-3 disabled:opacity-30 transform -skew-x-12"
                                        >
                                            <span className="skew-x-12 flex items-center gap-2">
                                                <ShoppingBagIcon className="w-4 h-4" />
                                                {product.quantity === 0 ? 'RUPTURE' : 'DÉPLOYER'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* --- DYNAMIC DATA ROWS --- */}
                            
                            {/* Brand Row */}
                            <div className="col-span-full h-px bg-gray-100 dark:bg-gray-900 my-4"></div>
                            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-400 text-[11px] font-black uppercase tracking-widest flex items-center gap-4">
                                <SparklesIcon className="w-4 h-4 text-brand-neon" /> MANUFACTURIER
                            </div>
                            {compareList.map(p => (
                                <div key={p.id} className="p-6 bg-transparent border-x border-gray-100 dark:border-gray-900 text-center font-black text-gray-700 dark:text-white uppercase text-sm tracking-widest self-center font-serif italic">
                                    {p.brand}
                                </div>
                            ))}

                            {/* Availability Row */}
                            <div className="col-span-full h-px bg-gray-100 dark:bg-gray-900 my-4"></div>
                            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-400 text-[11px] font-black uppercase tracking-widest flex items-center gap-4">
                                <InformationCircleIcon className="w-4 h-4 text-brand-neon" /> ÉTAT UNITÉ
                            </div>
                            {compareList.map(p => (
                                <div key={p.id} className="p-6 bg-transparent border-x border-gray-100 dark:border-gray-900 text-center self-center">
                                    {p.quantity > 0 ? (
                                        <span className="text-brand-neon font-black text-[10px] border-2 border-brand-neon px-5 py-2 uppercase tracking-[0.2em] bg-brand-neon/5">OPÉRATIONNEL</span>
                                    ) : (
                                        <span className="text-red-500 font-black text-[10px] border-2 border-red-500 px-5 py-2 uppercase tracking-[0.2em] bg-red-500/5">INDISPONIBLE</span>
                                    )}
                                </div>
                            ))}

                            {/* Specifications Rows */}
                            {allSpecKeys.map(specKey => (
                                <React.Fragment key={specKey}>
                                    <div className="col-span-full h-px bg-gray-100 dark:bg-gray-900 my-4"></div>
                                    <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-4 italic font-serif">
                                        <div className="w-1 h-4 bg-gray-300 dark:bg-gray-700"></div> {specKey}
                                    </div>
                                    {compareList.map(product => {
                                        const specValue = product.specifications?.find(s => s.name === specKey)?.value || '---';
                                        return (
                                            <div key={product.id} className="p-8 bg-transparent border-x border-gray-100 dark:border-gray-900 text-center text-lg font-mono font-bold text-gray-600 dark:text-gray-300 self-center uppercase tracking-tighter">
                                                {specValue}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="mt-32 flex justify-center animate-fadeIn">
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-12 max-w-5xl w-full relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-neon"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-900 dark:text-white">
                            <ScaleIcon className="w-40 h-40" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="bg-brand-neon text-black px-6 py-1.5 font-black uppercase tracking-[0.3em] text-[10px] transform -skew-x-12 mb-8">VERDICT DES ANALYSTES</span>
                            <p className="text-gray-600 dark:text-gray-400 font-mono text-center text-base leading-loose uppercase tracking-wider max-w-3xl">
                                Nos rapports de comparaison se basent sur les données bio-techniques certifiées par les laboratoires partenaires. 
                                <br/><span className="text-gray-900 dark:text-white">Privilégiez l'unité adaptée à votre métabolisme et votre protocole actuel.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};
