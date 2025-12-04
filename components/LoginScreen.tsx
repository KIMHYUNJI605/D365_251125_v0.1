import React, { useState } from 'react';
import { Globe, Lock, User, Building2, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
    onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [dealerId, setDealerId] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('English (US)');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans">
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#3FE0C5] rounded-lg flex items-center justify-center text-slate-900 font-black text-lg shadow-[0_0_20px_rgba(63,224,197,0.4)]">D</div>
                        <span className="text-2xl font-bold tracking-tight">Dealer365</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6 max-w-md">The Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FE0C5] to-blue-400">Automotive Retail</span></h1>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative bg-slate-50/50">
                 <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                        <p className="text-slate-500">Please enter your dealer credentials.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-700 uppercase ml-1">Login ID</label><input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20" required /></div>
                        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-700 uppercase ml-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20" required /></div>
                        <button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg transition-all">{isLoading ? 'Loading...' : 'Sign In'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};