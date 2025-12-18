import React, { useMemo } from 'react';
import type { Order, Product, ContactMessage } from '../../types';
import { 
    ShoppingBagIcon, 
    CreditCardIcon, 
    InboxIcon, 
    ArrowUpRightIcon, 
    ArrowDownRightIcon,
    ChartPieIcon
} from '../IconComponents';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
    orders: Order[];
    products: Product[];
    messages: ContactMessage[];
}

const KPICard: React.FC<{ title: string; value: string; trend?: number; icon: React.ReactNode; color: string }> = ({ title, value, trend, icon, color }) => (
    <div className={`bg-white dark:bg-brand-gray border border-gray-200 dark:border-gray-800 p-6 relative overflow-hidden group hover:border-${color} transition-all duration-500 shadow-sm dark:shadow-none`}>
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity text-brand-neon`}>{icon}</div>
        <div className={`w-1 h-8 bg-brand-neon absolute left-0 top-1/2 -translate-y-1/2`}></div>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white font-mono tracking-tighter">{value}</h3>
            {trend !== undefined && (
                <div className={`flex items-center text-[10px] font-bold ${trend >= 0 ? 'text-green-500' : 'text-brand-alert'} mb-1`}>
                    {trend >= 0 ? <ArrowUpRightIcon className="w-3 h-3" /> : <ArrowDownRightIcon className="w-3 h-3" />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
    </div>
);

export const DashboardHomePage: React.FC<DashboardProps> = ({ orders, products, messages }) => {
    const revenue = useMemo(() => orders.filter(o => o.status !== 'Annulée').reduce((sum, o) => sum + o.total, 0), [orders]);
    
    const stats = [
        { title: 'Chiffre d\'Affaires', value: `${revenue.toFixed(0)} DT`, trend: 12, icon: <CreditCardIcon />, color: 'brand-neon' },
        { title: 'Commandes Total', value: orders.length.toString(), trend: 5, icon: <ShoppingBagIcon />, color: 'blue-500' },
        { title: 'Stock Critique', value: products.filter(p => p.quantity < 5).length.toString(), trend: -8, icon: <ChartPieIcon />, color: 'brand-neon' },
        { title: 'Transmissions', value: messages.filter(m => !m.read).length.toString(), trend: 0, icon: <InboxIcon />, color: 'brand-neon' }
    ];

    return (
        <div className="space-y-8 animate-fadeIn p-8 bg-gray-50 dark:bg-[#050505] min-h-screen transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 dark:border-gray-800 pb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter flex items-center gap-4">
                        <span className="w-2 h-10 bg-brand-neon slant"></span>
                        Mission Control
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mt-2">Surveillance des opérations tactiques</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-brand-gray px-4 py-2 border border-gray-200 dark:border-gray-800">
                    <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse shadow-[0_0_10px_#ccff00]"></span>
                    <span className="text-[10px] font-black text-gray-700 dark:text-white uppercase tracking-widest">Système Opérationnel</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <KPICard key={i} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-brand-gray border border-gray-200 dark:border-gray-800 p-8 relative overflow-hidden shadow-sm dark:shadow-none">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase italic tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-neon"></div>
                            Analyse de performance (30 jours)
                        </h3>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{day:'01', val:20}, {day:'05', val:45}, {day:'10', val:30}, {day:'15', val:80}, {day:'20', val:65}, {day:'25', val:95}, {day:'30', val:110}]}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                <XAxis dataKey="day" stroke="#999" fontSize={10} fontStyle="italic" />
                                <YAxis hide />
                                <Tooltip contentStyle={{backgroundColor:'#000', border:'1px solid #ccff00', color:'#fff'}} />
                                <Area type="monotone" dataKey="val" stroke="#ccff00" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-brand-gray border border-gray-200 dark:border-gray-800 p-8 shadow-sm dark:shadow-none">
                    <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase italic tracking-widest mb-6 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-brand-alert"></div>
                         Unités Critiques
                    </h3>
                    <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                        {products.filter(p => p.quantity < 10).map(p => (
                            <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 group hover:border-brand-neon transition-colors">
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-bold text-gray-500 truncate uppercase">{p.name}</p>
                                    <p className="text-[9px] text-gray-400 font-mono">{p.brand}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className={`text-xs font-black ${p.quantity === 0 ? 'text-brand-alert' : 'text-gray-900 dark:text-white'}`}>{p.quantity} UN</p>
                                    <p className="text-[8px] text-gray-400 uppercase font-bold">Stock</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
