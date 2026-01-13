
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (userData: { fullName: string; username: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate and authenticate here.
    // For this prototype, we'll use the provided details or defaults.
    onLogin({
      fullName: isLogin ? (fullName || 'User') : fullName,
      username: username || 'user_123'
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 mb-2">InstaChat</h1>
          <p className="text-zinc-500 text-sm font-medium">
            {isLogin ? "Welcome back to the conversation" : "Join the minimalist chat experience"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {!isLogin && (
            <div className="space-y-1 animate-in fade-in duration-300">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                placeholder="Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">@</span>
              <input
                type="text"
                required
                className="w-full pl-9 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                placeholder="creative_soul"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-zinc-900/10 mt-4"
          >
            {isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="text-center pt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
